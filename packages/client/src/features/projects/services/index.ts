import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { ProjectRepository } from "../infrastructure/projectRepository";
import { ProjectService } from "../services/projectService";

const httpClient = HTTPClient.getInstance();
const projectsRepository = new ProjectRepository(httpClient);
export const projectsService = new ProjectService(projectsRepository);
