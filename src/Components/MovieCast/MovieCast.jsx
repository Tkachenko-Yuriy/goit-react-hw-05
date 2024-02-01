import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import fetchCreditsMovie from "../fetchApi/fetchCreditsMovie";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { moviesId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieCredits() {
      try {
        setLoading(true);
        const response = await fetchCreditsMovie(moviesId);
        setMovieCast(response.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCredits();
  }, [moviesId]);

  const shortAcrorsList = movieCast.slice(0, 10);

  return (
    <>
      {error && <p className="error-message">Помилка: {error}</p>}
      {loading && <p>Loading...</p>}
      {!error && !loading && (
        <ul className={css.castList}>
          {shortAcrorsList.map(({ cast_id, character, name, profile_path }) => (
            <li key={cast_id} className={css.castItem}>
              <div>
                {profile_path ? (
                  <img
                    className={css.castImage}
                    src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                    alt={`${name}'s profile`}
                  />
                ) : (
                  <AiOutlineUser className={css.icon} />
                )}
              </div>
              <div className={css.description}>
                <p className={css.name}>{name}</p>
                <p className={css.text}>in the role</p>
                <p className={css.character}>{character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
