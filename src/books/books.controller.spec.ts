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
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
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

  describe('getBookById', async () => {
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

  describe('getBooksByQuery', async () => {
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
});
