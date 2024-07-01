import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books';

// Mock the books data
jest.mock('./books', () => ({
  books: [
    { id: 1, title: 'Test Book 1', author: 'Author 1', publicationYear: 2021 },
    { id: 2, title: 'Test Book 2', author: 'Author 2', publicationYear: 2022 },
  ],
}));

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should return an array of books', () => {
      const result = service.getAllBooks();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('author');
      expect(result[0]).toHaveProperty('publicationYear');
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', () => {
      const result = service.getBookById('1');
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Book 1');
    });

    it('should throw NotFoundException for non-existent book id', () => {
      expect(() => {
        service.getBookById('999');
      }).toThrow(NotFoundException);
    });
  });

  describe('addBook', () => {
    it('should add a new book and return the added book', () => {
      const newBook: Partial<Book> = {
        title: 'New Book',
        author: 'New Author',
        publicationYear: 2023,
      };
      const result = service.addBook(newBook);
      expect(result).toBeDefined();
      expect(result.id).toBe(3); // assuming this is the next ID
      expect(result.title).toBe('New Book');
      expect(result.author).toBe('New Author');
      expect(result.publicationYear).toBe(2023);
    });
  });

  describe('updateBook', () => {
    it('should update a book and return the updated book', () => {
      const updateData: Partial<Book> = {
        title: 'Updated Book',
      };
      const result = service.updateBook('1', updateData);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.title).toBe('Updated Book');
      expect(result.author).toBe('Author 1');
      expect(result.publicationYear).toBe(2021);
    });

    it('should throw NotFoundException for non-existent book id', () => {
      const updateData: Partial<Book> = {
        title: 'Updated Book',
      };
      expect(() => {
        service.updateBook('999', updateData);
      }).toThrow(NotFoundException);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book by id', () => {
      service.deleteBook('1');
      expect(() => {
        service.getBookById('1');
      }).toThrow(NotFoundException);
    });

    it('should throw NotFoundException for non-existent book id', () => {
      expect(() => {
        service.deleteBook('999');
      }).toThrow(NotFoundException);
    });
  });
});
