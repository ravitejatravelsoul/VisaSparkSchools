/**
 * Shared bookstore dataset used by every SQL exercise in the Git, APIs & SQL
 * track, so learners build on one consistent schema instead of a new one
 * per lesson. Executed fresh before every run/attempt for determinism.
 */
export const BOOKSTORE_SEED_SQL = `
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  genre TEXT NOT NULL,
  price REAL NOT NULL,
  published_year INTEGER NOT NULL,
  in_stock INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  book_id INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors (id, name, country) VALUES
  (1, 'Ada Lovelace', 'UK'),
  (2, 'Grace Hopper', 'USA'),
  (3, 'Haruki Murakami', 'Japan'),
  (4, 'Chimamanda Ngozi Adichie', 'Nigeria'),
  (5, 'Yuval Noah Harari', 'Israel');

INSERT INTO books (id, title, author_id, genre, price, published_year, in_stock) VALUES
  (1, 'Notes on Engines', 1, 'Nonfiction', 18.50, 1843, 4),
  (2, 'Compiling the Future', 2, 'Nonfiction', 22.00, 1959, 0),
  (3, 'Norwegian Wood', 3, 'Fiction', 14.99, 1987, 12),
  (4, 'Kafka on the Shore', 3, 'Fiction', 16.50, 2002, 5),
  (5, 'Americanah', 4, 'Fiction', 15.00, 2013, 8),
  (6, 'Half of a Yellow Sun', 4, 'Fiction', 13.75, 2006, 0),
  (7, 'Sapiens', 5, 'Nonfiction', 20.00, 2011, 15),
  (8, 'Homo Deus', 5, 'Nonfiction', 21.50, 2016, 3),
  (9, '1Q84', 3, 'Fiction', 19.99, 2009, 6),
  (10, 'Dear Ijeawele', 4, 'Nonfiction', 10.00, 2017, 9);

INSERT INTO orders (id, book_id, customer_name, quantity, order_date) VALUES
  (1, 3, 'Priya', 2, '2026-01-05'),
  (2, 7, 'Marcus', 1, '2026-01-06'),
  (3, 3, 'Elena', 1, '2026-01-08'),
  (4, 5, 'Priya', 1, '2026-01-10'),
  (5, 9, 'Sam', 3, '2026-01-11'),
  (6, 7, 'Elena', 2, '2026-01-14'),
  (7, 1, 'Marcus', 1, '2026-01-15'),
  (8, 4, 'Sam', 1, '2026-01-18');
`;
