import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './books';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            getAllBooks: jest.fn(),
            getBookById: jest.fn(),
            addBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  describe('getAllBooks', () => {
    it('should return an array of books', () => {
      const result: Book[] = [
        {
          id: 1,
          title: 'Test Book',
          author: 'Test Author',
          publicationYear: 2021,
        },
      ];
      jest.spyOn(service, 'getAllBooks').mockImplementation(() => result);

      expect(controller.getAllBooks()).toBe(result);
      expect(service.getAllBooks).toHaveBeenCalled();
    });
  });

  describe('getBookById', () => {
    it('should return a single book when id is provided as path param', () => {
      const result: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2021,
      };
      jest.spyOn(service, 'getBookById').mockImplementation(() => result);

      expect(controller.getBookById('1')).toBe(result);
      expect(service.getBookById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when book is not found', () => {
      jest.spyOn(service, 'getBookById').mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.getBookById('999')).toThrow(NotFoundException);
    });
  });

  describe('getBooksByQuery', () => {
    it('should return a single book when id is provided as query param', () => {
      const result: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        publicationYear: 2021,
      };
      jest.spyOn(service, 'getBookById').mockImplementation(() => result);

      expect(controller.getBooksByQuery('1')).toBe(result);
      expect(service.getBookById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when id is not provided as query param', () => {
      expect(() => controller.getBooksByQuery('')).toThrow(
        new NotFoundException('Book ID must be provided'),
      );
    });

    it('should throw NotFoundException when book is not found', () => {
      jest.spyOn(service, 'getBookById').mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.getBooksByQuery('999')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('addBook', () => {
    it('should add a book and return the added book', () => {
      const newBook: Partial<Book> = {
        title: 'New Book',
        author: 'New Author',
        publicationYear: 2022,
      };
      const result: Book = {
        id: 2,
        title: 'New Book',
        author: 'New Author',
        publicationYear: 2022,
      };
      jest.spyOn(service, 'addBook').mockImplementation(() => result);

      expect(controller.addBook(newBook)).toBe(result);
      expect(service.addBook).toHaveBeenCalledWith(newBook);
    });
  });

  describe('updateBook', () => {
    it('should update a book and return the updated book', () => {
      const updateData: Partial<Book> = {
        title: 'Updated Book',
      };
      const result: Book = {
        id: 1,
        title: 'Updated Book',
        author: 'Test Author',
        publicationYear: 2021,
      };
      jest.spyOn(service, 'updateBook').mockImplementation(() => result);

      expect(controller.updateBook('1', updateData)).toBe(result);
      expect(service.updateBook).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', () => {
      jest.spyOn(service, 'deleteBook').mockImplementation(async () => {});

      expect(controller.deleteBook('1')).toBeUndefined();
      expect(service.deleteBook).toHaveBeenCalledWith('1');
    });
  });
});
