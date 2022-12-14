import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { useDeleteProject } from "../../api/deleteProject";
import { useGetProjects } from "../../api/getProjects";

const DeleteProjectButton = ({ id }: { id: number }) => {
    const { t } = useTranslation();
    const { mutate, isLoading } = useDeleteProject();

    const deleteProject = () => {
        mutate(id, {
            onSuccess() {
                toast.success(t("admin.project.delete_success"), {
                    position: "bottom-left",
                });
            },
        });
    };

    return (
        <Button color="secondary" variant="contained" size="small" onClick={deleteProject}>
            {isLoading ? (
                <CircularProgress disableShrink size={24} sx={{ color: "#fff" }} />
            ) : (
                t("actions.delete")
            )}
        </Button>
    );
};

const EditProjectButton = ({ id }: { id: number }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(`/admin/projects/edit/${id}`)}
        >
            {t("actions.edit")}
        </Button>
    );
};

const Projects = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [rows, setRows] = useState<GridRowsProp>([]);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: "id",
            headerName: t("admin.project.id"),
            width: 150,
            type: "number",
            flex: 0.5,
            align: "left",
            headerAlign: "left",
        },
        { field: "title", headerName: t("admin.project.title"), width: 150, type: "string", flex: 1 },
        {
            field: "edit_delete",
            headerName: "",
            width: 150,
            type: "string",
            flex: 1,
            renderCell: (props) => (
                <div style={{ display: "flex", gap: "15px" }}>
                    <EditProjectButton id={props.row.id} />
                    <DeleteProjectButton id={props.row.id} />
                </div>
            ),
        },
    ], [t, i18n]);

    const { data: projects, isLoading } = useGetProjects();

    useEffect(() => {
        setRows(projects ?? []);
    }, [projects]);

    return (
        <>
            <Box height="80%" bgcolor={"background.paper"}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={isLoading}
                    disableSelectionOnClick
                    rowsPerPageOptions={[]}
                />
            </Box>
            <Fab
                title={t("admin.project.create2")}
                color="primary"
                size="medium"
                sx={{ position: "fixed", bottom: "5%", right: "3%" }}
                onClick={() => navigate("/admin/projects/create")}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

export default Projects;
