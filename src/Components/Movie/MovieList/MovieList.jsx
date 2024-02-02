import { Link, useLocation } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MoviesList.module.css";

export default function MovieList({ items }) {
  const location = useLocation();
  return (
    <>
      {items.length > 0 && (
        <ul className={css.movieList}>
          {items.map(({ id, poster_path, title }) => (
            <li key={id} className={css.movieItem}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                <MovieCard poster={poster_path} title={title} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
