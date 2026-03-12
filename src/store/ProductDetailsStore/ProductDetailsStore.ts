import { makeObservable, observable, action, computed, reaction } from 'mobx';
import type { IReactionDisposer } from 'mobx';

import { strapiService } from 'api/strapi';
import { type FormattedProduct } from 'api/types';

interface ILocalStore {
  destroy(): void;
}

type PrivateFields =
  | '_product'
  | '_relatedProducts'
  | '_isInitialized'
  | '_setData'
  | '_setInitialized';

export default class ProductDetailsStore implements ILocalStore {
  private _product: FormattedProduct | null = null;
  private _relatedProducts: FormattedProduct[] = [];
  private _isInitialized: boolean = false;

  private readonly _reactionDisposer: IReactionDisposer;

  constructor() {
    makeObservable<ProductDetailsStore, PrivateFields>(this, {
      _product: observable.ref,
      _relatedProducts: observable.ref,
      _isInitialized: observable,

      product: computed,
      relatedProducts: computed,
      isInitialized: computed,

      _setData: action.bound,
      _setInitialized: action.bound,
      fetchData: action.bound,
    });

    this._reactionDisposer = reaction(
      () => this._product?.documentId,
      (id) => {
        if (id) console.log(`Product page loaded: ${id}`);
      }
    );
  }

  get product(): FormattedProduct | null {
    return this._product;
  }

  get relatedProducts(): FormattedProduct[] {
    return this._relatedProducts;
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  private _setData(product: FormattedProduct | null, related: FormattedProduct[]): void {
    this._product = product;
    this._relatedProducts = related;
  }

  private _setInitialized(state: boolean): void {
    this._isInitialized = state;
  }

  async fetchData(id: string): Promise<void> {
    try {
      const [targetProduct, allProductsResponse] = await Promise.all([
        strapiService.getOneProduct(id),
        strapiService.getProducts(0, 100),
      ]);

      if (!targetProduct) {
        this._setData(null, []);
        return;
      }

      const productsArray = allProductsResponse?.items || [];

      console.log(`Скачано товаров: ${productsArray.length} из ${allProductsResponse?.total}`);

      let related = productsArray.filter((item) => {
        const itemCat = item.category?.toLowerCase().trim() || '';
        const targetCat = targetProduct.category?.toLowerCase().trim() || '';

        return itemCat === targetCat && item.documentId !== id;
      });

      const finalRelated = related.slice(0, 3);

      this._setData(targetProduct, finalRelated);
    } catch (err) {
      console.error('Failed to fetch product details:', err);
      this._setData(null, []);
    } finally {
      this._setInitialized(true);
    }
  }

  destroy(): void {
    this._reactionDisposer();
  }
}
