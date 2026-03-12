import { makeObservable, observable, action, computed, reaction } from 'mobx';
import type { IReactionDisposer } from 'mobx';

import { type FormattedProduct } from 'api/types';
import { type Option } from 'components/Search/configs';
import ProductListStore from 'store/ProductListStore';

type PrivateFields = '_searchQuery' | '_selectedCategories';

export default class FilterStore {
  private _searchQuery: string = '';
  private _selectedCategories: Option[] = [];
  private readonly _reactionDisposer: IReactionDisposer;
  private _dataStore: ProductListStore;

  constructor(dataStore: ProductListStore) {
    this._dataStore = dataStore;

    makeObservable<FilterStore, PrivateFields>(this, {
      _searchQuery: observable,
      _selectedCategories: observable.ref,

      searchQuery: computed,
      selectedCategories: computed,
      filteredProducts: computed,

      setSearchQuery: action.bound,
      setSearchQueryOnly: action.bound,
      setSelectedCategories: action.bound,
    });

    this._reactionDisposer = reaction(
      () => this._selectedCategories,
      async () => {
        try {
          await this._dataStore.fetchData();
        } catch (error) {
          console.error(error);
        }
      }
    );
  }

  get searchQuery() {
    return this._searchQuery;
  }

  get selectedCategories() {
    return this._selectedCategories;
  }

  get filteredProducts(): FormattedProduct[] {
    return this._dataStore.products;
  }

  async setSearchQuery(value: string): Promise<void> {
    this._searchQuery = value;
    try {
      await this._dataStore.fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  setSearchQueryOnly(value: string): void {
    this._searchQuery = value;
  }

  setSelectedCategories(categories: Option[]): void {
    this._selectedCategories = categories;
  }

  destroy(): void {
    this._reactionDisposer();
  }
}
