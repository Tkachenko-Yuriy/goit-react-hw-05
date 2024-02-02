import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchTrendingMovie from "../../Components/fetchApi/fetchTrendingMovie";
import MovieList from "../../Components/Movie/MovieList/MovieList";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetchTrendingMovie(page);
        if (page === 1) {
          setTrendingMovies(response.results);
        } else {
          setTrendingMovies((prev) => [...prev, ...response.results]);
        }
        setTotalPages(response.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [page]);

  const shouldRenderGallery = trendingMovies.length > 0 && !error;
  return (
    <>
      {error && <p className="error-message">Error: {error}</p>}
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={trendingMovies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={page < totalPages}
        loader={
          loading && (
            <div className="loader">
              <ThreeDots
                height={80}
                width={80}
                radius={9}
                color="green"
                ariaLabel="three-dots-loading"
              />
            </div>
          )
        }
      >
        {shouldRenderGallery && <MovieList items={trendingMovies} />}
      </InfiniteScroll>
      {shouldRenderGallery && page === totalPages && (
        <p style={{ textAlign: "center" }}>You have seen all movies</p>
      )}
    </>
  );
}
