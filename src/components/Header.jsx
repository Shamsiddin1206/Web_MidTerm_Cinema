import styles from './Header.module.css'

export default function Header({ currentStep }) {
  const steps = [
    { num: '1', label: 'Film' },
    { num: '2', label: 'Time' },
    { num: '3', label: 'Seats' },
  ]

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            CINE<span className={styles.logoAccent}>X</span>
          </div>
          <div className={styles.cinemaInfo}>
            <span>📍 12 Amir Temur Ave, Tashkent</span>
            <span className={styles.sep}>·</span>
            <span>🕙 Open 9:00 AM – 11:00 PM</span>
            <span className={styles.sep}>·</span>
            <span>📞 +998 71 200 12 34</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <a className={styles.navLink}>Now Showing</a>
          <a className={styles.navLink}>Upcoming</a>
          <a className={styles.navLink}>About</a>
          <button className={styles.navBtn}>Sign In</button>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTag}>Now Booking · Hall Lumière</div>
          <h1 className={styles.heroTitle}>
            Your Night<br />
            <em className={styles.heroEm}>Starts Here.</em>
          </h1>
          <p className={styles.heroSub}>
            Pick a film. Choose your time. Find your seat.
            It takes less than a minute.
          </p>
        </div>

        <div className={styles.heroStrip}>
          {['CINEX TASHKENT', '1 PREMIUM HALL', '96 SEATS', 'DOLBY AUDIO', '4K LASER PROJECTION', 'CINEX TASHKENT', 'PREMIUM EXPERIENCE'].map((item, i) => (
            <span key={i} className={styles.stripItem}>{item}</span>
          ))}
        </div>
      </section>

      <div className={styles.progressWrap}>
        <div className={styles.progress}>
          {steps.map(({ num, label }, i) => {
            const done   = currentStep > i + 1
            const active = currentStep === i + 1
            return (
              <div className={styles.progItem} key={num}>
                <div
                  className={[
                    styles.progNum,
                    done   ? styles.progDone   : '',
                    active ? styles.progActive : '',
                  ].join(' ')}
                >
                  {done ? '✓' : num}
                </div>
                <span className={[styles.progLabel, active ? styles.progLabelActive : ''].join(' ')}>
                  {label}
                </span>
                {i < 2 && <div className={styles.progLine} />}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
