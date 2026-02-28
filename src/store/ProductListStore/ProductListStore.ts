import { makeObservable, observable, action, computed, reaction } from 'mobx';
import { strapiService } from 'api/strapi.ts';
import { type FormattedProduct } from 'api/types.ts';
import { type Option } from 'components/Search/configs.ts';
import FilterStore from 'store/FilterStore';

export interface ILocalStore {
  destroy(): void;
}

type PrivateFields =
  | '_products'
  | '_categories'
  | '_isLoading'
  | '_total'
  | '_setInitialData'
  | '_appendProducts'
  | '_setLoading'
  | 'setFiltersFromQueryParams';

export default class ProductListStore implements ILocalStore {
  private _products: FormattedProduct[] = [];
  private _categories: Option[] = [];
  private _total: number = 0;
  private _isLoading: boolean = false;

  public readonly filters: FilterStore;
  private _disposers: (() => void)[] = [];

  constructor() {
    this.filters = new FilterStore(this);

    makeObservable<ProductListStore, PrivateFields>(this, {
      _products: observable.shallow,
      _categories: observable.ref,
      _isLoading: observable,
      _total: observable,

      products: computed,
      categories: computed,
      isLoading: computed,
      hasMore: computed,
      total: computed,

      _setInitialData: action,
      _appendProducts: action,
      _setLoading: action,
      fetchData: action,
      setFiltersFromQueryParams: action,
    });

    const filterReaction = reaction(
      () => ({
        cats: this.filters.selectedCategories,
      }),
      () => {
        void this.fetchData();
      },
      { delay: 300 }
    );
    this._disposers.push(filterReaction);
  }

  get products() {
    return this._products;
  }
  get categories() {
    return this._categories;
  }
  get isLoading() {
    return this._isLoading;
  }
  get hasMore() {
    return this._products.length < this._total;
  }
  get total() {
    return this._total;
  }

  private _setLoading = (state: boolean) => {
    this._isLoading = state;
  };

  private _setInitialData = (items: FormattedProduct[], total: number, categories?: Option[]) => {
    this._products = items;
    this._total = total;
    if (categories) this._categories = categories;
  };

  private _appendProducts = (items: FormattedProduct[], total: number) => {
    this._products = [...this._products, ...items];
    this._total = total;
  };

  fetchData = action(async (): Promise<void> => {
    this._setLoading(true);
    try {
      const [productsResponse, categoriesData] = await Promise.all([
        strapiService.getProducts(
          0,
          9,
          this.filters.searchQuery,
          this.filters.selectedCategories.map((c) => c.key)
        ),
        this._categories.length ? Promise.resolve(this._categories) : strapiService.getCategories(),
      ]);

      this._setInitialData(productsResponse.items, productsResponse.total, categoriesData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      this._setLoading(false);
    }
  });

  async fetchNextPage() {
    if (this._isLoading || !this.hasMore) return;

    this._setLoading(true);
    try {
      const { items, total } = await strapiService.getProducts(
        this._products.length,
        9,
        this.filters.searchQuery,
        this.filters.selectedCategories.map((c) => c.key)
      );

      this._appendProducts(items, total);
    } finally {
      this._setLoading(false);
    }
  }

  setFiltersFromQueryParams(params: { search?: string; categories?: string[]; offset?: number }) {
    if (params.search !== undefined) {
      this.filters.setSearchQueryOnly(params.search);
    }

    if (params.categories && params.categories.length > 0) {
      const selected = this._categories.filter((cat) => params.categories?.includes(cat.key));
      this.filters.setSelectedCategories(selected);
    }
  }

  destroy(): void {
    this.filters.destroy();
    this._disposers.forEach((d) => d());
  }
}
