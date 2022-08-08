import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../application/admin/deleteUser";
import { useGetUsers } from "../../application/admin/getUsers";
import { UserDTO } from "../../services/dto";

const DeleteUserButton = ({ id }: { id: number }) => {
    const { mutate } = useDeleteUser();
    const deleteUser = () => {
        // mutate(id);
        console.log(id);
    };

    return (
        <Button color="secondary" variant="contained" size="small" onClick={deleteUser}>
            Delete
        </Button>
    );
};

const EditUserButton = ({ id }: { id: number }) => {
    const navigate = useNavigate();

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(`/admin/users/edit/${id}`)}
        >
            Edit
        </Button>
    );
};

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
];

const Users = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [rows, setRows] = useState<GridRowsProp<UserDTO>>([]);
    console.log(rows);

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
