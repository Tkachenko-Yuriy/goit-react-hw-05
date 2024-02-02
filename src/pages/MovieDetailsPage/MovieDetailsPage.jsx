import { useState, useEffect, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import defaultImage from "../../assets/plug_img.jpg";
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

  const {
    poster_path,
    title,
    original_title,
    vote_average,
    vote_count,
    overview,
    genres,
  } = movieDetail;

  const filmGenres = Array.isArray(genres)
    ? genres.map((genre) => genre.name).join(",")
    : "";

  const poster =
    poster_path !== null
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : defaultImage;

  // const backLinkHref = useRef(location.state?.from ?? '/');
  const backLinkHref = location.state?.from ?? "/";

  return (
    <>
    <Link to={backLinkHref} className={css.backLink}>Back</Link>
      {/* <Link className={css.backLink} to={backLinkHref.current}>Back</Link> */}
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
        <div className={css.container}>
          <div className={css.filmPoster}>
            <img
              className={css.film_img}
              src={poster}
              alt={title}
              width="280"
              height="398"
            />
          </div>
          <div className={css.description}>
            <h2 className={css.title}>{title}</h2>
            <div className={css.configuration}>
              <ul className={css.configurationList}>
                <li className={css.configurationIitem}>
                  <p className={css.itemTitle}>Рейтинг :</p>
                  <p className={css.itemTitle}>
                    {vote_average}&#x02F;{vote_count}
                  </p>
                </li>
                <li className={css.configurationIitem}>
                  <p className={css.itemTitle}>Оригінальна назва :</p>
                  <p className={css.originalTitle}>{original_title}</p>
                </li>
                <li className={css.configurationIitem}>
                  <p className={css.itemTitle}>Жанр :</p>
                  <p className={css.itemTitle}>{filmGenres}</p>
                </li>
              </ul>
            </div>
            <h3 className={css.secondTitle}>Опис</h3>
            {overview ? (
              <p className={css.overview}>{overview}</p>
            ) : (
              <p className={css.overview}>
                Нажаль, опис до даного фільму відсутній.
              </p>
            )}
            <div>
              {overview && (
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
          </div>
          <Outlet />
        </div>
      )}
      {!loading && !movieDetail && (
        <div className="no-data-message">
          Дані про цей фільм відсутні. Спробуйте знову або виберіть інший фільм.
        </div>
      )}
    </>
  );
}
