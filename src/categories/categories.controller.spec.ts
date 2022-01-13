import { CategoriesService } from './categories.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { v4 as uuidv4 } from 'uuid';
import { CategoriesModule } from './categories.module';
import { Repository } from 'typeorm';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesServiceMock } from './mocks/categories-service.mock';

const MOCK_DATA: Category[] = [
  { id: uuidv4(), name: 'Primera' },
  { id: uuidv4(), name: 'Segunda' },
  { id: uuidv4(), name: 'Tercera' }
];

describe('CategoriesController', () => {

  const createCategoryDto: CreateCategoryDto = { name: 'categoria_test' };
  const createCategoryServiceValue = jest.fn().mockReturnValue({
    id: uuidv4(),
    ...createCategoryDto,
  })


  let controller: CategoriesController;
  let service: CategoriesService;

  let mockCategoriesService = {
    create: createCategoryServiceValue,
    /*create: jest.fn((dto) => {
      return {
        id: uuidv4(),
        ...dto
      }
    }),*/
  };

  

  // let repository: Repository<Category>;
  /*
  const mockCategoriesRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(category => Promise.resolve({ id: uuidv4(), ...category })),
    find: jest.fn().mockImplementation(() => Promise.resolve(MOCK_DATA)),
  }
  */

  beforeEach(async () => {
    
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     CategoriesService,
    //     {
    //       provide: getRepositoryToken(Category),
    //       useValue: mockCategoriesRepository,
    //     }
    //   ],
    // })
    // .compile();
  
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useClass: CategoriesServiceMock,
        }
      ],
    })
    .overrideProvider(CategoriesService)
    //.useValue(mockCategoriesService)
    .useClass(CategoriesServiceMock)
    .compile();
    
    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new category record and return that', async () => {
    
    expect(await controller.create(createCategoryDto)).toEqual({
      id: expect.any(String),
      ...createCategoryDto,
    });

    // expect(mockCategoriesService.create).toHaveBeenCalledWith(createCategoryDto);

    
    // Espiando, Otra forma de verificar si el servicio a sido llamado Nota: antes hay que hacer la llamada desde el controlador
    const spyServiceCreate = jest.spyOn(service, 'create');
    controller.create(createCategoryDto);
    expect(spyServiceCreate).toHaveBeenCalledWith(createCategoryDto);
    expect(spyServiceCreate).toHaveBeenCalledTimes(1);
    
  });
  
  /*
  test('should return array with same Category elements', async () => {
    expect(await service.findAll()).toEqual(MOCK_DATA);
    expect(await (await service.findAll())).toBeInstanceOf(Array);
    expect(await (await service.findAll()).length).toEqual(MOCK_DATA.length);
  });
  */

});
