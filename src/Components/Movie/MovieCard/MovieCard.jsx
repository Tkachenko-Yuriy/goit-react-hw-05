import defaultImage from "../../../assets/plug_img.jpg";
import css from "./MovieCard.module.css";

export default function MovieCard({ poster, title }) {
  const imageSrc = poster
    ? `https://image.tmdb.org/t/p/w500/${poster}`
    : defaultImage;
  return (
    <>
      <div className={css.thumb}>
        <img
          className={css.moviePoster}
          src={imageSrc}
          alt={title}
          width="240px"
        />
      </div>
      <div className={css.movieDescription}>
        <p className={css.movieTitle}>{title}</p>
      </div>
    </>
  );
}
