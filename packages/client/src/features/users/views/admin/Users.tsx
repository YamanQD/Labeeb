import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../../application/admin/getUsers";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 150,
        type: "number",
        flex: 0.5,
        align: "left",
        headerAlign: "left",
    },
    { field: "username", headerName: "Name", width: 150, type: "string", flex: 1 },
    { field: "email", headerName: "Email", width: 150, type: "string", flex: 1, sortable: false },
    { field: "role", headerName: "Role", width: 150, type: "string", flex: 1 },
];

const Users = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState<GridRowsProp>([]);

    const { data, isLoading } = useGetUsers({ page });

    useEffect(() => {
        if (data) setRows(data.items);
    }, [data]);

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
                    rowCount={data?.meta.totalItems ?? 0}
                    loading={isLoading}
                    paginationMode="server"
                />
            </Box>
            <Fab
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
