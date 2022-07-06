import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { ProjectRepository } from "../infrastructure/projectRepository";
import { ProjectService } from "../services/projectService";

const httpClient = new HTTPClient();
const projectsRepository = new ProjectRepository(httpClient);
export const projectsService = new ProjectService(projectsRepository);
