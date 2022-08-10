import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MenuItem from "../../Sidebar/MenuItem";
import MenuItemChild from "../../Sidebar/MenuItemChild";

import { useGetProjects } from "src/features/projects/api/getProjects";

const ClientSidebarMenu = () => {
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
                {t("sidebar.projects")}
            </Typography>
            {isLoading ? (
                t("sidebar.loading")
            ) : (
                <>
                    {projects?.map((project) => (
                        <Box sx={{ mb: 1 }} key={project.id}>
                            <MenuItem
                                title={project.title}
                                onClick={() => navigate(`/projects/${project.id}`)}
                                isActive={Number(projectId) === project.id}
                            >
                                {project.lists?.map((list) => (
                                    <MenuItemChild
                                        key={list.id}
                                        id={list.id}
                                        title={list.title}
                                        badge={list.taskCount || ""}
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

export default ClientSidebarMenu;
