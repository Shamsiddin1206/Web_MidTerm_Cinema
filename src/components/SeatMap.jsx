import styles from './SeatMap.module.css'
export default function SeatMap({
  rows,
  seatGrid,
  selectedSeats,
  movieTitle,
  selectedTime,
  totalPrice,
  error,
  showModal,
  confirmed,
  bookedSeats,
  isReady,
  onSeatClick,
  onConfirmClick,
  onFinalConfirm,
  onModalClose,
  onOverlayClick,
}) {
  return (
    <div className={styles.wrapper}>
      <div className="section-label">03 — Pick Your Seats</div>

      <div className={[styles.seatSection, !isReady ? styles.dimmed : ''].join(' ')}>

        <div className={styles.screenWrap}>
          <div className={styles.screenBar} />
          <div className={styles.screenLabel}>SCREEN</div>
        </div>

        {seatGrid ? (
          <div className={styles.seatGrid}>
            {seatGrid.map((row, ri) => (
              <div className={styles.seatRow} key={ri}>
                <div className={styles.rowLabel}>{rows[ri]}</div>

                {row.map((seat, ci) => (
                  <>
                    {ci === 6 && <div className={styles.aisle} key={`aisle-${ri}`} />}
                    <div
                      key={seat.id}
                      className={[styles.seat, styles[`seat_${seat.status}`]].join(' ')}
                      onClick={() => onSeatClick(seat)}
                      title={
                        seat.status === 'available' || seat.status === 'selected'
                          ? seat.id
                          : `${seat.id} — ${seat.status}`
                      }
                    />
                  </>
                ))}

                <div className={styles.rowLabel}>{rows[ri]}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.placeholder}>
            Select a film and showtime above to view the seat map.
          </div>
        )}

        <div className={styles.legend}>
          {[
            { label: 'Available', key: 'available' },
            { label: 'Selected',  key: 'selected'  },
            { label: 'Reserved',  key: 'reserved'  },
            { label: 'Occupied',  key: 'occupied'  },
          ].map(({ label, key }) => (
            <div className={styles.legendItem} key={key}>
              <div className={[styles.legendSeat, styles[`seat_${key}`]].join(' ')} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.summaryBar}>
          <div className={styles.summaryLeft}>
            <div className={styles.summarySeats}>
              {selectedSeats.length > 0
                ? `${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''} · ${selectedSeats.join(', ')}`
                : 'No seats selected'}
            </div>
            <div className={styles.summarySub}>
              {movieTitle && selectedTime
                ? `${movieTitle} · ${selectedTime}`
                : 'Select a film and showtime first'}
            </div>
          </div>
          <div className={styles.summaryRight}>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>Total</span>
              <span className={styles.price}>${totalPrice}</span>
            </div>
            <button
              className={styles.confirmBtn}
              onClick={onConfirmClick}
              disabled={selectedSeats.length === 0 || !isReady}
            >
              Book Seats →
            </button>
          </div>
        </div>

        {error && <div className={styles.errorMsg}>⚠ {error}</div>}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={onOverlayClick}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            {!confirmed ? (
              <>
                <div className={styles.modalIcon}>🎬</div>
                <h2 className={styles.modalTitle}>Confirm Booking</h2>
                <p className={styles.modalSub}>Review your selection before finalizing.</p>

                <div className={styles.modalDetail}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Film</span>
                    <span className={styles.detailVal}>{movieTitle}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Time</span>
                    <span className={styles.detailVal}>{selectedTime}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Seats</span>
                    <span className={styles.detailVal}>{selectedSeats.join(', ')}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Total</span>
                    <span className={[styles.detailVal, styles.detailPrice].join(' ')}>
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button className={styles.btnBack} onClick={onModalClose}>
                    Go Back
                  </button>
                  <button className={styles.btnPay} onClick={onFinalConfirm}>
                    Confirm & Pay →
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h2 className={styles.modalTitle}>You're all set!</h2>
                <p className={styles.modalSub}>
                  Enjoy <strong>{movieTitle}</strong> at <strong>{selectedTime}</strong>.
                </p>
                <p className={styles.modalSub} style={{ marginTop: 6 }}>
                  Seats: <strong>{bookedSeats.join(', ')}</strong>
                </p>
                <button
                  className={styles.btnPay}
                  style={{ marginTop: 28, width: '100%' }}
                  onClick={onModalClose}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
