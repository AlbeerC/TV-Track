import ResultList from '../ResultsList'

function SerieList({ loadMore, items }) {
    return <ResultList loadMore={loadMore} items={items} itemType="series" />
}

export default SerieList
