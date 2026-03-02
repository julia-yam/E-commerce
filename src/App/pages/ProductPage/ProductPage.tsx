import 'react-virtualized/styles.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { List, InfiniteLoader, AutoSizer, WindowScroller } from 'react-virtualized';

import { InfoProducts, Search } from 'components';
import ProductListStore from 'store/ProductListStore';
import { ProductRow } from './components/ProductRow';
import styles from './ProductPage.module.scss';

const SKELETON_ROWS_COUNT = 4;

const ProductPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [store] = useState(() => new ProductListStore());

  useEffect(() => {
    const handleResize = () => store.setWindowWidth(window.innerWidth);
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
  }, [store.filters.searchQuery, store.filters.selectedCategories, setSearchParams]);

  const isInitialLoading = store.isLoading && store.products.length === 0;

  const loadedRowsCount = Math.ceil(store.products.length / store.columnsCount);

  const totalRowCount = isInitialLoading
    ? SKELETON_ROWS_COUNT
    : store.hasMore
      ? loadedRowsCount + 1
      : loadedRowsCount;

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
          <InfiniteLoader
            isRowLoaded={({ index }) => !isInitialLoading && index < loadedRowsCount}
            loadMoreRows={() => store.fetchNextPage()}
            rowCount={totalRowCount}
            threshold={1}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        key={`list-${store.columnsCount}`}
                        autoHeight
                        ref={registerChild}
                        onRowsRendered={onRowsRendered}
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}
                        width={width}
                        rowCount={totalRowCount}
                        rowHeight={store.rowHeight}
                        rowRenderer={({ key, ...rest }) => (
                          <ProductRow key={key} {...rest} store={store} />
                        )}
                        className={styles.virtualizedList}
                      />
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
