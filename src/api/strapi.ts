import axios from 'axios';
import qs from 'qs';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'.trim();

export interface FormattedProduct {
    id: number;
    documentId: string;
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
    isInStock: boolean;
}

const api = axios.create({
    baseURL: STRAPI_API_URL,
    headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export const strapiService = {
    getProducts: async (): Promise<FormattedProduct[]> => {
        const query = qs.stringify(
            { populate: ['images', 'productCategory'] },
            { encodeValuesOnly: true }
        );

        const response = await api.get(`/products?${query}`);

        return response.data.data.map((item: any) => {
            const attrs = item.attributes || item;

            let imageUrl = attrs.images?.[0]?.url || attrs.images?.data?.[0]?.attributes?.url;

            if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = `${STRAPI_BASE_URL}${imageUrl}`;
            }

            return {
                id: item.id,
                documentId: item.documentId,
                title: attrs.title,
                image: imageUrl,
                price: attrs.price,
                category: attrs.productCategory.title,
                description: attrs.description,
                isInStock: attrs.isInStock,
            };
        });
    },

    getOneProduct: async (id: string): Promise<FormattedProduct> => {
        // Для получения одного товара Strapi обычно использует /products/:id
        // Но нам все равно нужно добавить populate, чтобы увидеть картинки
        const query = qs.stringify(
            { populate: ['images', 'productCategory'] },
            { encodeValuesOnly: true }
        );

        const response = await api.get(`/products/${id}?${query}`);
        const data = response.data.data;
        const attrs = data.attributes || data;
        const imageUrl = attrs.images?.[0]?.url || attrs.images?.data?.[0]?.attributes?.url;

        return {
            id: data.id,
            documentId: data.documentId || data.id.toString(),
            title: attrs.title,
            description: attrs.description,
            price: attrs.price,
            isInStock: attrs.isInStock,
            image: imageUrl,
            category: attrs.productCategory.title,
        };
    }
};