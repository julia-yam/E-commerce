import { makeObservable, observable, action, computed, reaction } from 'mobx';
import type { IReactionDisposer } from 'mobx';
import { strapiService } from 'api/strapi.ts';
import { type FormattedProduct } from 'api/types.ts';

export interface ILocalStore {
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

  get filteredRelatedProducts() {
    if (!this.product) return [];

    return this.relatedProducts.filter((item) => {
      return (
        item.category === this.product?.category && item.documentId !== this.product?.documentId
      );
    });
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

  private _setData(product: FormattedProduct, related: FormattedProduct[]): void {
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
        strapiService.getProducts(),
      ]);

      const productsArray = allProductsResponse.items || [];

      const related = productsArray.filter((item) => item.documentId !== id).slice(0, 3);

      this._setData(targetProduct, related);
    } catch (err) {
      console.error('Failed to fetch product details:', err);
    } finally {
      this._setInitialized(true);
    }
  }

  destroy(): void {
    this._reactionDisposer();
  }
}
