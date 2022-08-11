import { HTTPClient } from "src/lib/http/httpClient";
import { ListRepository } from "./listRepository";
import { ListService } from "./listService";

const httpClient = HTTPClient.getInstance();
const listRepository = new ListRepository(httpClient);
export const listService = new ListService(listRepository);
