import { useState, useEffect, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import MovieDetail from "../../Components/MovieDetail/MovieDetail";
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
          <MovieDetail items={movieDetail} />
          <div>
            {movieDetail.overview && (
              <ul className={css.list}>
                <li>
                  <Link to="cast">Cast</Link>
                </li>
                <li>
                  <Link to="reviews">Reviews</Link>
                </li>
              </ul>
            )}
          </div>
          <Outlet />
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
