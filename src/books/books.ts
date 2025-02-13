export interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    publicationYear: 1997,
  },
  {
    id: 2,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    publicationYear: 1998,
  },
  {
    id: 3,
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    publicationYear: 1999,
  },
  {
    id: 4,
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    publicationYear: 2000,
  },
  {
    id: 5,
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling',
    publicationYear: 2003,
  },
  {
    id: 6,
    title: 'Harry Potter and the Half-Blood Prince',
    author: 'J.K. Rowling',
    publicationYear: 2005,
  },
  {
    id: 7,
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    publicationYear: 2007,
  },
];
