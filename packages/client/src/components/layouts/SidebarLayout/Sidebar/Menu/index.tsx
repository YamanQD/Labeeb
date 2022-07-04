import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStore } from "src/core/infrastructure/store";
import { useGetProjects } from "src/features/projects/application/getProjects";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarMenuItemsList from "./SidebarMenuItemsList";
import SubMenuWrapper from "./SubMenuWrapper";

const SidebarMenu = () => {
    const { data, isLoading, isError } = useGetProjects();
    const projects = data ?? [];

    const setTaskGroupToView = useStore((state) => state.setTaskGroupToView);

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
                        const hasChildren = (project.groups?.length ?? 0) > 0;
                        return (
                            /**
                             * Each project is structured like this:
                             *
                             * Project
                             *  - Group
                             *  - Group
                             *  - Group
                             */
                            <SidebarMenuItemsList key={project.title}>
                                <SubMenuWrapper>
                                    <SidebarMenuItem
                                        title={project.title}
                                        badge={"N"}
                                        onClick={() =>
                                            setTaskGroupToView({
                                                projectId: project.id,
                                                groupId: undefined,
                                            })
                                        }
                                    >
                                        {hasChildren && (
                                            <SubMenuWrapper>
                                                {project.groups?.map((group) => {
                                                    return (
                                                        <SidebarMenuItem
                                                            key={group.title}
                                                            title={group.title}
                                                            badge={group.tasksCount}
                                                            onClick={() =>
                                                                setTaskGroupToView({
                                                                    projectId: project.id,
                                                                    groupId: group.id,
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
