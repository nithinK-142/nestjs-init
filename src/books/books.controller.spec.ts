import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './books';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooksService = {
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

  describe('getBookById', () => {
    it('should return a single book', async () => {
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
  });
});
