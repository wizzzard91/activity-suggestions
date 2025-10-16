import { gql } from '@apollo/client';

export interface Book {
  title: string;
  author: string;
}

export interface BooksData {
  books: Book[];
}

export const getBooksQuery = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;