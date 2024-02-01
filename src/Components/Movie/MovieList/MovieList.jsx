import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

import css from "./MoviesList.module.css";

export default function MovieList({ items }) {
  return (
    <>
      {items.length > 0 && (
        <ul className={css.movieList}>
          {items.map(({ id, poster_path, title }) => (
            <li key={id} className={css.movieItem}>
              <Link to={`/trending/${id}`}>
                <MovieCard poster={poster_path} title={title} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
