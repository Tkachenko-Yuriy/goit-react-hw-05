import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import fetchReviewsMovie from "../fetchApi/fetchReviewsMovie";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { moviesId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setLoading(true);
        const response = await fetchReviewsMovie(moviesId);
        setMovieReviews(response.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReviews();
  }, [moviesId]);

  return (
    <>
      {error && <p className="error-message">Помилка: {error}</p>}
      {loading && <p>Loading...</p>}
      {!error && !loading && (
        <ul className={css.list}>
          {movieReviews.map(
            ({
              id,
              author,
              author_details: { avatar_path },
              content,
              created_at,
            }) => (
              <li key={id} className={css.item}>
                <div>
                  {avatar_path ? (
                    <img
                      className={css.authorImage}
                      src={`https://image.tmdb.org/t/p/original/${avatar_path}`}
                      alt={`${author}'s profile`}
                    />
                  ) : (
                    <AiOutlineUser className={css.icon} />
                  )}
                </div>
                <p className={css.author}>{author}</p>
                <p>{content}</p>
                <p>{created_at}</p>
                <p>{}</p>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
