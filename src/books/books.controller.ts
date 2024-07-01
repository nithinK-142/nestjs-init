import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
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

  @Get('search')
  getBooksByQuery(@Query('id') id: string): Book {
    if (!id) {
      throw new NotFoundException('Book ID must be provided');
    }
    return this.booksService.getBookById(id);
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book {
    return this.booksService.getBookById(id);
  }

  @Post('add-book')
  addBook(@Body() book: Partial<Book>): Book {
    return this.booksService.addBook(book);
  }

  @Put('update-book/:id')
  updateBook(@Param('id') id: string, @Body() updateData: Partial<Book>): Book {
    return this.booksService.updateBook(id, updateData);
  }

  @Delete('delete-book/:id')
  deleteBook(@Param('id') id: string): void {
    this.booksService.deleteBook(id);
  }
}
