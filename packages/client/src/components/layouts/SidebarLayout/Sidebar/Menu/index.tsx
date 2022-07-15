import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStore } from "src/core/infrastructure/store";
import { useGetProjects } from "src/features/projects/application/getProjects";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarMenuItemsList from "./SidebarMenuItemsList";
import SubMenuWrapper from "./SubMenuWrapper";

const SidebarMenu = () => {
    const { data, isLoading } = useGetProjects();
    const projects = data ?? [];

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
                    {projects.map((project) => {
                        const hasChildren = (project.lists?.length ?? 0) > 0;
                        return (
                            /**
                             * Each project is structured like this:
                             *
                             * Project
                             *  - List
                             *  - List
                             *  - List
                             */
                            <SidebarMenuItemsList key={project.id}>
                                <SubMenuWrapper>
                                    <SidebarMenuItem
                                        title={project.title}
                                        onClick={() =>
                                            setTaskListToView({
                                                projectId: project.id,
                                                listId: undefined,
                                            })
                                        }
                                    >
                                        {hasChildren && (
                                            <SubMenuWrapper>
                                                {project.lists?.map((list) => {
                                                    return (
                                                        <SidebarMenuItem
                                                            key={list.id}
                                                            title={list.title}
                                                            badge={list.tasksCount}
                                                            onClick={() =>
                                                                setTaskListToView({
                                                                    projectId: undefined,
                                                                    listId: list.id,
                                                                })
                                                            }
                                                        />
                                                    );
                                                })}
                                            </SubMenuWrapper>
                                        )}
                                    </SidebarMenuItem>
                                </SubMenuWrapper>
                            </SidebarMenuItemsList>
                        );
                    })}
                </>
            )}
        </Box>
    );
};

export default SidebarMenu;
