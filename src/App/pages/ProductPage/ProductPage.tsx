import { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

import ProductListStore from 'store/ProductListStore';
import { InfoProducts, Search } from 'components';

import { ProductRow } from './components/ProductRow';

import styles from './ProductPage.module.scss';

const SKELETON_ROWS_COUNT = 3;

const ProductPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [store] = useState(() => new ProductListStore());

  const isInitialLoading = store.isLoading && store.products.length === 0;
  const loadedRowsCount = Math.ceil(store.products.length / store.columnsCount);

  const totalRowCount = isInitialLoading
    ? SKELETON_ROWS_COUNT
    : store.hasMore
      ? loadedRowsCount + 1
      : loadedRowsCount;

  const categoryKeys = store.filters.selectedCategories.map((c) => c.key).join(',');

  const loadMore = useCallback(() => {
    if (!store.isLoading && store.hasMore) {
      void store.fetchNextPage();
    }
  }, [store.isLoading, store.hasMore, store]);

  useEffect(() => {
    const handleResize = () => {
      store.setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [store]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const categories = searchParams.getAll('category');
    void store.init(search, categories);
    return () => store.destroy();
  }, [store]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (store.filters.searchQuery) {
      newParams.set('search', store.filters.searchQuery);
    }
    store.filters.selectedCategories.forEach((c) => {
      newParams.append('category', c.key);
    });
    setSearchParams(newParams, { replace: true });
  }, [store.filters.searchQuery, categoryKeys, setSearchParams]);

  return (
    <div className={styles.productPage}>
      <InfoProducts className={styles.infoProduct} />

      <div className={styles.searchProduct}>
        <Search
          className={styles.search}
          options={store.categories}
          selectedOptions={store.filters.selectedCategories}
          onFilterChange={store.filters.setSelectedCategories}
          searchQuery={store.filters.searchQuery}
          onSearchChange={store.filters.setSearchQuery}
          totalCount={store.total}
        />

        <div className={styles.listWrapper}>
          <Virtuoso
            useWindowScroll
            totalCount={totalRowCount}
            endReached={loadMore}
            itemContent={(index) => <ProductRow index={index} store={store} />}
          />
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
