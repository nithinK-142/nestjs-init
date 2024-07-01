import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book {
    return this.booksService.getBookById(id);
  }
}
