const books = [
  { id: "1", name: "Book 1", publicationYear: 2021 },
  { id: "2", name: "Book 2", publicationYear: 2022 },
  { id: "3", name: "Book 3", publicationYear: 2023 },
];

const authors = [
  { id: "1", name: "Author 1" },
  { id: "2", name: "Author 2" },
];

const bookAuthorships = [
  { bookId: "1", authorId: "1" },
  { bookId: "2", authorId: "2" },
  { bookId: "3", authorId: "1" },
  { bookId: "3", authorId: "2" },
];

module.exports = {
  getAllBooks: () => books,
  getBookById: (id) => books.find((book) => book.id === id),
  addBook: (book) => books.push(book),

  getAllAuthors: () => authors,
  getAuthorById: (id) => authors.find((author) => author.id === id),
  addAuthor: (author) => books.push(author),

  getAuthorshipsByBookId: (bookId) =>
    bookAuthorships.filter((auth) => auth.bookId === bookId),
  getAuthorshipsByAuthorId: (authorId) =>
    bookAuthorships.filter((auth) => auth.authorId === authorId),
  addAuthorship: (authorship) => bookAuthorships.push(authorship),
};
