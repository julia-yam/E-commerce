import { type Option } from 'components/Search/configs.ts';

export type ProductAttributes = {
  title: string;
  price: number;
  description: string;
  isInStock: boolean;
  productCategory: any;
  images: any;
};

export type CategoryAttributes = {
  title?: string;
  name?: string;
};

export type FormattedProduct = {
  id: number | string;
  documentId: string;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  isInStock: boolean;
};

export type PagedResponse<T> = {
  items: T[];
  total: number;
};

export type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
};

export { type Option };
