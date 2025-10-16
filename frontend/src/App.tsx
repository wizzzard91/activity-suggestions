import { useQuery } from '@apollo/client/react';
import './App.css'
import { getBooksQuery } from './api/books.api';
import type { Book, BooksData } from './api/books.api';
import { ContentCardManager } from './components/ContentCardManager';
import { ContentCard } from './components/ContentCard';

function App() {
  const { loading, error, data } = useQuery<BooksData>(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Testing Apollo Client connection to BE</h1>
      <ContentCardManager
        items={data?.books || []}
        renderItem={(book: Book, index: number) => (
          <ContentCard key={index} title={book.title} author={book.author} />
        )}
      />
    </>
  )
}

export default App
