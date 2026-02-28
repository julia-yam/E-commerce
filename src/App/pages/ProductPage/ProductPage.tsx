import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer, Observer } from 'mobx-react-lite';
import { List, InfiniteLoader, AutoSizer, WindowScroller, type Index } from 'react-virtualized';

import 'react-virtualized/styles.css';
import { Card, Button, InfoProducts, Search, Loader } from 'components';
import ProductListStore from '../../../store/ProductListStore';
import styles from './ProductPage.module.scss';

const ProductPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [store] = useState(() => new ProductListStore());
  const { filters } = store;

  const getColumnsCount = useCallback(() => {
    return window.innerWidth < 1024 ? 2 : 3;
  }, []);

  const [columnsCount, setColumnsCount] = useState(getColumnsCount());

  useEffect(() => {
    const handleResize = () => {
      const newCount = getColumnsCount();
      if (newCount !== columnsCount) {
        setColumnsCount(newCount);
      }
    };
    window.addEventListener('resize', handleResize);

    const init = async () => {
      try {
        const search = searchParams.get('search') || '';
        const categories = searchParams.getAll('category');

        if (store.setFiltersFromQueryParams) {
          store.setFiltersFromQueryParams({ search, categories });
        }

        await store.fetchData();
      } catch (error) {
        console.error(error);
      }
    };

    void init();

    return () => {
      window.removeEventListener('resize', handleResize);
      store.destroy();
    };
  }, [getColumnsCount, columnsCount, store, searchParams]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (filters.searchQuery) newParams.set('search', filters.searchQuery);
    filters.selectedCategories.forEach((c) => newParams.append('category', c.key));
    setSearchParams(newParams, { replace: true });
  }, [filters.searchQuery, filters.selectedCategories, setSearchParams]);

  const loadedRowsCount = Math.ceil(store.products.length / columnsCount);
  const totalRowCount = store.hasMore ? loadedRowsCount + 1 : loadedRowsCount;

  const isRowLoaded = ({ index }: Index) => index < loadedRowsCount;

  const loadMoreRows = () => {
    if (store.isLoading || !store.hasMore) return Promise.resolve();
    return store.fetchNextPage();
  };

  const rowRenderer = ({ index, key, style }: any) => {
    const isMobile = window.innerWidth < 768;

    return (
      <div key={key} style={style} className={styles.rowWrapper}>
        <Observer>
          {() => {
            if (!isRowLoaded({ index })) {
              return (
                <div className={styles.loaderRow}>{store.isLoading && <Loader size="l" />}</div>
              );
            }

            const startIndex = index * columnsCount;
            const rowItems = store.products.slice(startIndex, startIndex + columnsCount);

            return (
              <div className={styles.gridRow}>
                {rowItems.map((product) => (
                  <Card
                    key={product.documentId}
                    image={product.image}
                    title={product.title}
                    subtitle={product.description}
                    captionSlot={product.category}
                    contentSlot={`$${product.price}`}
                    onClick={() => navigate(`/product-card/${product.documentId}`)}
                    actionSlot={
                      <Button disabled={!product.isInStock}>
                        {product.isInStock
                          ? isMobile
                            ? 'Add'
                            : 'Add To Cart'
                          : isMobile
                            ? 'Not'
                            : 'Not Available'}
                      </Button>
                    }
                  />
                ))}
              </div>
            );
          }}
        </Observer>
      </div>
    );
  };

  const currentRowHeight = useMemo(() => {
    if (columnsCount === 2) return window.innerWidth < 768 ? 540 : 660;
    return 730;
  }, [columnsCount]);

  return (
    <div className={styles.productPage}>
      <InfoProducts className={styles.infoProduct} />

      <div className={styles.searchProduct}>
        <Search
          className={styles.search}
          options={store.categories}
          selectedOptions={filters.selectedCategories}
          onFilterChange={filters.setSelectedCategories}
          searchQuery={filters.searchQuery}
          onSearchChange={filters.setSearchQuery}
          totalCount={store.total}
        />

        <div className={styles.listWrapper}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={totalRowCount}
            threshold={1}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        key={`list-${columnsCount}`}
                        autoHeight
                        ref={registerChild}
                        onRowsRendered={onRowsRendered}
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}
                        width={width}
                        rowCount={totalRowCount}
                        rowHeight={currentRowHeight}
                        rowRenderer={rowRenderer}
                        style={{ outline: 'none' }}
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
