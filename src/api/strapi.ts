import axios from 'axios';
import qs from 'qs';
import {
  type FormattedProduct,
  type PagedResponse,
  type StrapiResponse,
  type CategoryAttributes,
  type ProductAttributes,
  type Option,
} from './types';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

const api = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authApi = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getAttrs = <T>(item: any): T => item?.attributes || item;

const getImageUrl = (images: any): string => {
  const imagesData = images?.data || images;
  if (Array.isArray(imagesData) && imagesData.length > 0) {
    const firstImg = getAttrs<any>(imagesData[0]);
    const url = firstImg?.url || '';

    if (url && !url.startsWith('http')) {
      return `${STRAPI_BASE_URL}${url}`;
    }
    return url;
  }
  return '';
};

const formatStrapiProduct = (item: any): FormattedProduct => {
  const attrs = getAttrs<ProductAttributes>(item);
  const categoryAttrs = getAttrs<CategoryAttributes>(attrs.productCategory);

  return {
    id: item.id,
    documentId: item.documentId || item.id.toString(),
    title: attrs.title,
    image: getImageUrl(attrs.images),
    price: attrs.price,
    category: categoryAttrs?.title || 'Без категории',
    description: attrs.description,
    isInStock: attrs.isInStock,
  };
};

const formatStrapiCategory = (item: any): Option => {
  const attrs = getAttrs<CategoryAttributes>(item);
  return {
    key: item.documentId || item.id.toString(),
    value: attrs.title || attrs.name || '',
  };
};

export const strapiService = {
  getProducts: async (
    start: number = 0,
    limit: number = 10,
    search: string = '',
    categoryIds: string[] = []
  ): Promise<PagedResponse<FormattedProduct>> => {
    const filters: any = {};
    if (search) filters.title = { $containsi: search };
    if (categoryIds.length > 0) filters.productCategory = { documentId: { $in: categoryIds } };

    const query = qs.stringify(
      { populate: ['images', 'productCategory'], pagination: { start, limit }, filters },
      { encodeValuesOnly: true }
    );

    const {
      data: { data: items, meta },
    } = await api.get(`/products?${query}`);
    return { items: items.map(formatStrapiProduct), total: meta.pagination.total };
  },

  getOneProduct: async (id: string): Promise<FormattedProduct> => {
    const query = qs.stringify(
      { populate: ['images', 'productCategory'] },
      { encodeValuesOnly: true }
    );
    const {
      data: { data: item },
    } = await api.get(`/products/${id}?${query}`);
    return formatStrapiProduct(item);
  },

  getCategories: async (): Promise<Option[]> => {
    const {
      data: { data: items },
    } = await api.get<StrapiResponse<any[]>>('/product-categories');
    return items.map(formatStrapiCategory);
  },
};
