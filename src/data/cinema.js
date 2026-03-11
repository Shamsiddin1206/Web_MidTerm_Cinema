export const MOVIES = [
  {
    id: 1,
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    duration: "166 min",
    rating: "PG-13",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    year: 2024,
    director: "Denis Villeneuve",
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: "Drama",
    duration: "180 min",
    rating: "R",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: 2023,
    director: "Christopher Nolan",
  },
  {
    id: 3,
    title: "The Wild Robot",
    genre: "Animation",
    duration: "102 min",
    rating: "PG",
    poster: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    year: 2024,
    director: "Chris Sanders",
  },
];

export const SHOWTIMES = ["10:30 AM", "1:15 PM", "4:00 PM"];

export const ROWS = "ABCDEFGH".split("");
export const COLS = 12;

export const MAX_SEATS      = 6;
export const PRICE_PER_SEAT = 12;

export const ALWAYS_OCCUPIED = new Set([
  "B2", "C8", "C9", "D11", "E4", "F7", "G5",
]);

export const SLOT_RESERVED = {
  "1-10:30 AM": ["A3", "A4", "B7", "D5", "E9"],
  "1-1:15 PM":  ["C1", "C2", "F3", "G2", "H4"],
  "1-4:00 PM":  ["A1", "B5", "D8", "E3", "G9"],
  "2-10:30 AM": ["A5", "A6", "C4", "D7", "F11"],
  "2-1:15 PM":  ["B1", "B3", "E6", "G8", "H5"],
  "2-4:00 PM":  ["A2", "C7", "D1", "F9", "H6"],
  "3-10:30 AM": ["A8", "B9", "D3", "E11", "G1"],
  "3-1:15 PM":  ["A10", "C5", "E8", "F2", "H3"],
  "3-4:00 PM":  ["B6", "C11", "D9", "G4", "H10"],
};

export function buildGrid(movieId, time) {
  const key      = `${movieId}-${time}`;
  const reserved = new Set(SLOT_RESERVED[key] || []);

  return ROWS.map((row) =>
    Array.from({ length: COLS }, (_, i) => {
      const id = `${row}${i + 1}`;
      const status = ALWAYS_OCCUPIED.has(id)
        ? "occupied"
        : reserved.has(id)
        ? "reserved"
        : "available";
      return { id, row, col: i + 1, status };
    })
  );
}
