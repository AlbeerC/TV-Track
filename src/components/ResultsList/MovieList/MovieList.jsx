import ResultList from '../ResultsList'

function MovieList({ loadMore, items }) {
    return <ResultList loadMore={loadMore} items={items} itemType="movies" />
}

export default MovieList