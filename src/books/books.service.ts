import { Injectable, NotFoundException } from '@nestjs/common';
import { books, Book } from './books';

@Injectable()
export class BooksService {
  getAllBooks(): Book[] {
    return books;
  }

  getBookById(id: string): Book {
    const book = books.find((book) => book.id === parseInt(id));
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  addBook(book: Partial<Book>): Book {
    const newId = books[books.length - 1].id + 1;
    const newBook: Book = {
      id: newId,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
    };
    books.push(newBook);
    return newBook;
  }

  updateBook(id: string, updateData: Partial<Book>): Book {
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = { ...books[bookIndex], ...updateData };
    books[bookIndex] = updatedBook;
    return updatedBook;
  }

  deleteBook(id: string): void {
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));
    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }
    books.splice(bookIndex, 1);
  }
}
