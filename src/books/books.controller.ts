import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
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

  @Get('search')
  getBooksByQuery(@Query('id') id: string): Book {
    if (!id) {
      throw new NotFoundException('Book ID must be provided');
    }
    return this.booksService.getBookById(id);
  }
}
