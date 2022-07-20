import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjects } from "src/features/projects/application/getProjects";
import MenuItem from "./MenuItem";
import MenuItemChild from "./MenuItemChild";

const SidebarMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { projectId, listId } = useParams();
    const { data: projects, isLoading } = useGetProjects();

    return (
        <Box
            sx={{
                px: 2,
            }}
        >
            <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
                {t("sidebar.projects", { ns: "app" })}
            </Typography>
            {isLoading ? (
                "Loading projects..."
            ) : (
                <>
                    {projects?.map((project) => (
                        <Box sx={{ mb: 1 }} key={project.id}>
                            <MenuItem
                                id={project.id}
                                title={project.title}
                                onClick={() => navigate(`/projects/${project.id}`)}
                                isActive={Number(projectId) === project.id}
                            >
                                {project.lists?.map((list) => (
                                    <MenuItemChild
                                        key={list.id}
                                        id={list.id}
                                        title={list.title}
                                        badge={list.tasksCount}
                                        isActive={Number(listId) === list.id}
                                        onClick={() =>
                                            navigate(`/projects/${project.id}/lists/${list.id}`)
                                        }
                                    />
                                ))}
                            </MenuItem>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    );
};

export default SidebarMenu;
