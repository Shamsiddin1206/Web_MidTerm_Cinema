import { useState, useMemo } from 'react'
import { MOVIES, ROWS, buildGrid, MAX_SEATS, PRICE_PER_SEAT } from './data/cinema.js'

import Header      from './components/Header.jsx'
import MoviePicker from './components/MoviePicker.jsx'
import SeatMap     from './components/SeatMap.jsx'

export default function App() {

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedTime,  setSelectedTime]  = useState(null)

  const [selectedSeats,   setSelectedSeats]   = useState([])
  const [confirmedBySlot, setConfirmedBySlot] = useState({})
  const [error,           setError]           = useState('')

  const [showModal, setShowModal] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const slotKey     = selectedMovie && selectedTime ? `${selectedMovie}-${selectedTime}` : null
  const currentStep = !selectedMovie ? 1 : !selectedTime ? 2 : 3
  const movie       = MOVIES.find((m) => m.id === selectedMovie) || null
  const totalPrice  = selectedSeats.length * PRICE_PER_SEAT

  const seatGrid = useMemo(() => {
    if (!selectedMovie || !selectedTime) return null
    const base          = buildGrid(selectedMovie, selectedTime)
    const slotConfirmed = confirmedBySlot[slotKey] || new Set()

    return base.map((row) =>
      row.map((seat) => {
        if (slotConfirmed.has(seat.id))        return { ...seat, status: 'reserved' }
        if (selectedSeats.includes(seat.id))   return { ...seat, status: 'selected' }
        return seat
      })
    )
  }, [selectedMovie, selectedTime, selectedSeats, confirmedBySlot, slotKey])

  const handleMovieSelect = (id) => {
    setSelectedMovie(id)
    setSelectedTime(null)   
    setSelectedSeats([])
    setError('')
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setSelectedSeats([])    
    setError('')
  }

  const handleSeatClick = (seat) => {
    if (seat.status === 'reserved' || seat.status === 'occupied') return
    setError('')

    if (seat.status === 'selected') {
      setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))
    } else {
      if (selectedSeats.length >= MAX_SEATS) {
        setError(`Max ${MAX_SEATS} seats per booking.`)
        return
      }
      setSelectedSeats((prev) => [...prev, seat.id])
    }
  }

  const handleConfirmClick = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat.')
      return
    }
    setError('')
    setShowModal(true)
  }

  const handleFinalConfirm = () => {
    setConfirmedBySlot((prev) => {
      const existing = prev[slotKey] ? new Set(prev[slotKey]) : new Set()
      selectedSeats.forEach((s) => existing.add(s))
      return { ...prev, [slotKey]: existing }
    })
    setSelectedSeats([])
    setConfirmed(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setConfirmed(false)
    setError('')
  }

  const bookedSeats = slotKey && confirmedBySlot[slotKey]
    ? [...confirmedBySlot[slotKey]]
    : []

  return (
    <>
      {/* Davronbek */}
      <Header currentStep={currentStep} />

      {/* Og'abek */}
      <MoviePicker
        selectedMovie={selectedMovie}
        selectedTime={selectedTime}
        onMovieSelect={handleMovieSelect}
        onTimeSelect={handleTimeSelect}
      />

      {/* Ismoil */}
      <SeatMap
        rows={ROWS}
        seatGrid={seatGrid}
        selectedSeats={selectedSeats}
        movieTitle={movie?.title || ''}
        selectedTime={selectedTime}
        totalPrice={totalPrice}
        error={error}
        showModal={showModal}
        confirmed={confirmed}
        bookedSeats={bookedSeats}
        onSeatClick={handleSeatClick}
        onConfirmClick={handleConfirmClick}
        onFinalConfirm={handleFinalConfirm}
        onModalClose={handleModalClose}
        onOverlayClick={() => !confirmed && setShowModal(false)}
        isReady={!!selectedMovie && !!selectedTime}
      />
    </>
  )
}
