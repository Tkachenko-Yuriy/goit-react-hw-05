import defaultImage from "../../assets/plug_img.jpg";
import css from "./MovieDetail.module.css";
export default function MovieDetail({
  items: {
    poster_path,
    title,
    original_title,
    vote_average,
    vote_count,
    overview,
    genres,
  },
}) {
  const filmGenres = Array.isArray(genres)
    ? genres.map((genre) => genre.name).join(",")
    : "";

  const poster =
    poster_path !== null
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : defaultImage;
  return (
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
      </div>
    </div>
  );
}
