import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsServiceMock } from './mocks/projects-service.mock';
import { Project } from './entities/project.entity';

const projectRepositoryMock = {
  find: jest.fn().mockImplementation(()=> {
    return {};
  })
}

describe('ProjectsService', () => {
  let controller: ProjectsController;
  let service: ProjectsService;
  //const projectsServiceMock = {}
  
  const authUserMock: User = {
    id: 0,
    username: 'aaa',
    password: 'aaa',
    email: 'sf',
    roles: [],
    profile: null,
    processPassword: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    validatePassword: function (password: string): Promise<boolean> {
      throw new Error('Function not implemented.');
    }
  };

  // const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers:[ProjectsService],
    })
    .overrideProvider(ProjectsService).useValue(projectRepositoryMock)
    //.overrideProvider(ProjectsService).useClass(ProjectsServiceMock)
    // .overrideGuard(JwtAuthGuard).useValue(mockJwtAuthGuard)
    .compile();

    // controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
