import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteList } from "../../api/deleteList";
import { useGetLists } from "../../api/getLists";

const DeleteListButton = ({ id }: { id: number }) => {
    const { t } = useTranslation();
    const { mutate, isLoading } = useDeleteList();

    const deleteList = () => {
        mutate(id, {
            onSuccess() {
                toast.success(t("admin.list.delete_success"), {
                    position: toast.POSITION.BOTTOM_LEFT,
                    icon: "🚀",
                });
            },
        });
    };

    return (
        <Button color="secondary" variant="contained" size="small" onClick={deleteList}>
            {isLoading ? (
                <CircularProgress disableShrink size={24} sx={{ color: "#fff" }} />
            ) : (
                t("actions.delete")
            )}
        </Button>
    );
};

const EditListButton = ({ id }: { id: number }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(`/admin/lists/edit/${id}`)}
        >
            {t("actions.edit")}
        </Button>
    );
};

const Lists = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [rows, setRows] = useState<GridRowsProp>([]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "id",
                headerName: t("admin.list.id"),
                width: 150,
                type: "number",
                flex: 0.5,
                align: "left",
                headerAlign: "left",
            },

            {
                field: "title",
                headerName: t("admin.list.title"),
                width: 150,
                type: "string",
                flex: 1,
            },
            {
                field: "project",
                headerName: t("admin.list.project"),
                width: 150,
                type: "string",
                flex: 1,
                valueGetter: (params) => params.row.project.title,
            },
            {
                field: "edit_delete",
                headerName: "",
                width: 150,
                type: "string",
                flex: 1,
                renderCell: (props) => (
                    <div style={{ display: "flex", gap: "15px" }}>
                        <EditListButton id={props.row.id} />
                        <DeleteListButton id={props.row.id} />
                    </div>
                ),
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ],
        [t, i18n.language]
    );

    const { data: lists, isLoading } = useGetLists();

    useEffect(() => {
        if (lists) setRows(lists);
    }, [lists]);

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
                color="primary"
                size="medium"
                title={t("admin.list.create")}
                sx={{ position: "fixed", bottom: "5%", right: "3%" }}
                onClick={() => navigate("/admin/lists/create")}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

export default Lists;
