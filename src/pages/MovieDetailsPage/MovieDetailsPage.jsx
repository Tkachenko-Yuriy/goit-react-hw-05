import { useState, useEffect, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import MovieDetails from "../../Components/Movie/MovieDetails/MovieDetails";
import fetchMovieDetail from "../../Components/fetchApi/fetchMovieDetail";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetchMovieDetail(moviesId);
        setMovieDetail(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [moviesId]);

  const backLinkHref = useRef(location.state?.from ?? "/");

  return (
    <>
      <Link className={css.backLink} to={backLinkHref.current}>
        Back
      </Link>
      {error && <p className="error-message">Error: {error}</p>}
      {loading && (
        <div className="loader">
          <ThreeDots
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
      {!loading && movieDetail && (
        <>
          <MovieDetails items={movieDetail} />

          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
      {!loading && !movieDetail && (
        <div className="no-data-message">
          Дані про цей фільм відсутні. Спробуйте знову або виберіть інший фільм.
        </div>
      )}
    </>
  );
}
