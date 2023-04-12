const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { readFileSync } = require("fs");

const mockDb = require("./mock-db");

const typeDefs = readFileSync(require.resolve("./schema.graphql")).toString(
  "utf-8"
);

const resolvers = {
  Query: {
    authors: () => mockDb.getAllAuthors(),
    author: (parent, args) => mockDb.getAuthorById(args.id),
    books: () => mockDb.getAllBooks(),
    book: (parent, args) => mockDb.getBookById(args.id),
  },
  Mutation: {
    addAuthor: (parent, args) => mockDb.addAuthor(args.input),
    addBook: async (parent, args) => {
      const book = mockDb.addBook({
        id: args.input.id,
        publicationYear: args.input.publicationYear,
        coverImageUrl: args.coverImageUrl,
      });

      await Promise.all(
        args.input.authorsIds.map((authorId) =>
          mockDb.addAuthorship({ bookId: args.input.id, authorId })
        )
      );

      return book;
    },
  },
  Author: {
    books: async (parent) => {
      const authorships = await mockDb.getAuthorshipsByAuthorId(parent.id);

      return authorships.map((auth) => mockDb.getBookById(auth.bookId));
    },
  },
  Book: {
    authors: async (parent) => {
      const authorships = await mockDb.getAuthorshipsByBookId(parent.id);

      return authorships.map((auth) => mockDb.getAuthorById(auth.authorId));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
