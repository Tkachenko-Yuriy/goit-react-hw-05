import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import SearchBox from "../../Components/SearchBox/SearchBox";
import MovieList from "../../Components/Movie/MovieList/MovieList";
import fetchMovie from "../../Components/fetchApi/fetchMovie";
import css from "./Movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const moviesName = searchParams.get("name") ?? "";

  useEffect(() => {
    async function fetchSearchMovies() {
      try {
        setLoading(true);
        const response = await fetchMovie(moviesName, page);
        if (response.results === 0) {
          toast.error("Nothing was found for your request.");
          return;
        }
        if (page === 1) {
          setMovies(response.results);
        } else {
          setMovies((prev) => [...prev, ...response.results]);
        }
        setTotalPages(response.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (page === 1) {
      setMovies([]);
    }
    fetchSearchMovies();
  }, [moviesName, page]);

  const updateQueryString = (name) => {
    const nextParams = name !== "" ? { name } : {};
    setSearchParams(nextParams);
  };

  const shouldRenderGallery = movies.length > 0 && !error;

  return (
    <div className={css.movieContainer}>
      <SearchBox value={moviesName} onChange={updateQueryString} />

      <>
        {error && <p className="error-message">Error: {error}</p>}
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={movies.length}
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
          {shouldRenderGallery && <MovieList items={movies} />}
        </InfiniteScroll>
        {shouldRenderGallery && page === totalPages && (
          <p style={{ textAlign: "center" }}>You have seen all movies</p>
        )}
      </>
    </div>
  );
}
