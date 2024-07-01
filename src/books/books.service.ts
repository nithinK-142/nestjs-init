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
}
