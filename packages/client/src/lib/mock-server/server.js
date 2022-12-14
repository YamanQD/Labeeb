import { createServer } from "miragejs";
import { factories } from "./factories";
import { models } from "./models";
import { serializers } from "./serializer";
import { getRandomElementFromArray } from "./utils";

export const createAPIMockServer = () => {
    createServer({
        serializers,
        models,
        factories,

        seeds(server) {
            const project = server.create("project", { title: "Satellite Simulator" });

            server.createList("group", 2, { project }).forEach((group) => {
                for (let i = 0; i < 4; i++) {
                    server.create("task", {
                        group,
                        status: getRandomElementFromArray(project.statuses).label,
                    })
                }
            });

            console.log("MIRAGE.JS DATABASE: ", server.db.dump());
        },

        routes() {
            this.get("/projects");
            this.get("/projects/:id/groups", (schema, request) => {
                const projectId = request.params.id;
                const project = schema.projects.find(projectId);

                return project.groups;
            });

            this.get("/projects/:projectId/groups/:groupId", (schema, request) => {
                const { projectId, groupId } = request.params;

                const project = schema.projects.find(projectId);
                const group = project.groups.filter((group) => group.id == groupId);

                return group;
            });

            this.post("/projects/:projectId/groups/:groupId", (schema, request) => {
                const { groupId } = request.params;
                const { status, title, description, priority } = request.requestBody;

                return schema.tasks.create({
                    groupId,
                    status,
                    title,
                    description,
                    priority,
                });
            });
        },
    });
};
