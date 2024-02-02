import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { format } from "date-fns";
import fetchReviewsMovie from "../fetchApi/fetchReviewsMovie";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { moviesId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const response = await fetchReviewsMovie(moviesId);
        setMovieReviews(response.results);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMovieReviews();
  }, [moviesId]);

  return (
    <>
      {error && <p className="error-message">Помилка: {error}</p>}
      {/* {loading && <p>Loading...</p>} */}
      {movieReviews.length > 0 ? (
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
                <p className={css.content}>{content}</p>
                <p>{format(new Date(created_at), "MMMM dd, yyyy")}</p>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className={css.message}>Коментарі до даного фільму відсутні.</p>
      )}
    </>
  );
}
