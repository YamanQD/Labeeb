import { HTTPClient } from "src/lib/http/httpClient";

import { ProjectRepository } from "./projectRepository";
import { ProjectService } from "./projectService";

const httpClient = HTTPClient.getInstance();
const projectsRepository = new ProjectRepository(httpClient);
export const projectsService = new ProjectService(projectsRepository);
