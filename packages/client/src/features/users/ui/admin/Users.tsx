import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { useDeleteUser } from "../../api/deleteUser";
import { useGetUsers } from "../../api/getUsers";
import { UserDTO } from "../../types/user.dto";

const DeleteUserButton = ({ id }: { id: number }) => {
    const { t } = useTranslation();
    const { mutate, isLoading } = useDeleteUser();

    const deleteUser = () => {
        mutate(id, {
            onSuccess() {
                toast.success(t("users.delete_success"), {
                    position: toast.POSITION.BOTTOM_LEFT,
                    icon: "🚀"
                });
            },
        });
    };

    return (
        <Button color="secondary" variant="contained" size="small" onClick={deleteUser}>
            {isLoading ? (
                <CircularProgress disableShrink size={24} sx={{ color: "#fff" }} />
            ) : (
                t("actions.delete")
            )}
        </Button>
    );
};

const EditUserButton = ({ id }: { id: number }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(`/admin/users/edit/${id}`)}
        >
            {t("actions.edit")}
        </Button>
    );
};

const Users = () => {
    const { t, i18n } = useTranslation();

    const columns: GridColDef[] = useMemo(() => [
            {
                field: "id",
                headerName: t("users.id"),
                width: 150,
                type: "number",
                flex: 0.5,
                align: "left",
                headerAlign: "left",
            },
            { field: "username", headerName: t("users.name"), width: 150, type: "string", flex: 1 },
            { field: "email", headerName: t("users.email"), width: 150, type: "string", flex: 1, sortable: false },
            { field: "role", headerName: t("users.role"), width: 150, type: "string", flex: 1 },
            {
                field: "delete",
                headerName: "",
                width: 150,
                type: "string",
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: (props) => (
                    <div style={{ display: "flex", gap: "15px" }}>
                        <EditUserButton id={props.row.id} />
                        <DeleteUserButton id={props.row.id} />
                    </div>
                ),
            },
        ], [i18n.resolvedLanguage]);

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [rows, setRows] = useState<GridRowsProp<UserDTO>>([]);

    const { data: users, isLoading } = useGetUsers({
        page,
        queryOptions: {
            keepPreviousData: true,
        },
    });

    useEffect(() => {
        if (users?.items) {
            setRows(users.items);
        }
    }, [users]);

    return (
        <>
            <Box height="80%" bgcolor={"background.paper"}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    page={page - 1} // Page indexing starts from 0 in this component
                    onPageChange={(newPage) => setPage(newPage + 1)}
                    pageSize={10}
                    pagination
                    rowCount={users?.meta.totalItems ?? 10}
                    loading={isLoading}
                    paginationMode="server"
                    disableSelectionOnClick
                />
            </Box>
            <Fab
                title="Create user"
                color="primary"
                size="medium"
                sx={{ position: "fixed", bottom: "5%", right: "3%" }}
                onClick={() => navigate("/admin/users/create")}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

export default Users;
