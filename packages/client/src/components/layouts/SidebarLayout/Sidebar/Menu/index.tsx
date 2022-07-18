import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStore } from "src/core/infrastructure/store";
import { useGetProjects } from "src/features/projects/application/getProjects";
import ProjectItem from "./ProjectItem";
import ProjectListItem from "./ProjectListItem";

const SidebarMenu = () => {
    const { data: projects, isLoading } = useGetProjects();

    const currentProjectId = useStore((state) => state.currentProjectId);
    const setTaskListToView = useStore((state) => state.setTaskListToView);

    return (
        <Box
            sx={{
                px: 2,
            }}
        >
            <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
                My Projects
            </Typography>
            {isLoading ? (
                "Loading projects..."
            ) : (
                <>
                    {projects?.map((project) => (
                        <Box sx={{ mb: 1 }} key={project.id}>
                            <ProjectItem
                                isActive={project.id === currentProjectId}
                                title={project.title}
                                onClick={() =>
                                    setTaskListToView({
                                        projectId: project.id,
                                        listId: null,
                                    })
                                }
                            >
                                {project.lists?.map((list) => (
                                    <ProjectListItem
                                        key={list.id}
                                        title={list.title}
                                        badge={list.tasksCount}
                                        onClick={() =>
                                            setTaskListToView({
                                                projectId: null,
                                                listId: list.id,
                                            })
                                        }
                                    />
                                ))}
                            </ProjectItem>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    );
};

export default SidebarMenu;
