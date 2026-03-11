import { useState } from 'react'
import { MOVIES, SHOWTIMES } from '../data/cinema.js'
import styles from './MoviePicker.module.css'

export default function MoviePicker({
  selectedMovie,
  selectedTime,
  onMovieSelect,
  onTimeSelect,
}) {
  const [imgErrors, setImgErrors] = useState({})

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className={styles.wrapper}>

      {/* Movies */}
      <section className={styles.step}>
        <div className="section-label">01 — Choose a Film</div>

        <div className={styles.moviesGrid}>
          {MOVIES.map((movie) => (
            <div
              key={movie.id}
              className={[
                styles.movieCard,
                selectedMovie === movie.id ? styles.movieCardActive : '',
              ].join(' ')}
              onClick={() => onMovieSelect(movie.id)}
            >
              {/* Poster image */}
              <div className={styles.posterWrap}>
                {!imgErrors[movie.id] ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className={styles.posterImg}
                    onError={() => handleImgError(movie.id)}
                  />
                ) : (
                  <div className={styles.posterFallback}>
                    {movie.title[0]}
                  </div>
                )}
                <div className={styles.posterOverlay}>
                  <span className="tag rating">{movie.rating}</span>
                </div>
                {selectedMovie === movie.id && (
                  <div className={styles.posterCheck}>✓</div>
                )}
              </div>

              {/* Movie info */}
              <div className={styles.movieBody}>
                <div className={styles.movieTitle}>{movie.title}</div>
                <div className={styles.movieSub}>
                  {movie.director} · {movie.year}
                </div>
                <div className={styles.movieMeta}>
                  <span className="tag">{movie.genre}</span>
                  <span className="tag">{movie.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* time */}
      <section className={styles.step}>
        <div className="section-label">02 — Pick a Showtime</div>

        <div className={styles.showtimes}>
          {SHOWTIMES.map((time) => (
            <button
              key={time}
              className={[
                styles.timePill,
                selectedTime === time ? styles.timePillActive : '',
              ].join(' ')}
              onClick={() => onTimeSelect(time)}
              disabled={!selectedMovie}
            >
              <span className={styles.timeMain}>{time}</span>
              <span className={styles.timeSub}>Hall Lumière</span>
            </button>
          ))}
        </div>

        {!selectedMovie && (
          <p className={styles.hint}>↑ Select a film first</p>
        )}
      </section>
    </div>
  )
}
