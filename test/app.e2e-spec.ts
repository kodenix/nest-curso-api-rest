import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CategoriesModule } from '../src/categories/categories.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../src/categories/entities/category.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockCategoryRepository = {
    find: jest.fn(),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CategoriesModule],
    })
    .overrideProvider(getRepositoryToken(Category))
    .useValue(mockCategoryRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200)
  });
});
