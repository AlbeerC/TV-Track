import ResultList from '../ResultsList'

function TrendingList({ loadMore, items }) {
    return <ResultList loadMore={loadMore} items={items} itemType="trendings" />
}

export default TrendingList
