import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getRandomElementFromArray } from "src/lib/mock-server/utils";
import { Role } from "@labeeb/core";

let id = 0;

const createUser = () => {
    return {
        id: id++,
        name: getRandomElementFromArray(["Ahmad", "Samir", "Hasan", "Yaman", "Snow"]),
        email: "a@gmail.com",
        role: id % 2 ? Role.ADMIN : Role.USER,
        projects: "many",
    };
};

const rows: GridRowsProp = [createUser(), createUser(), createUser(), createUser(), createUser()];

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150, type: "number", flex: 0.5 },
    { field: "name", headerName: "Name", width: 150, type: "string", flex: 1 },
    { field: "email", headerName: "Email", width: 150, type: "string", flex: 1, sortable: false },
    { field: "role", headerName: "Role", width: 150, type: "string", flex: 1 },
    {
        field: "projects",
        headerName: "Projects",
        width: 150,
        type: "string",
        flex: 1,
        sortable: false,
    },
];

const Users = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box height="80%" bgcolor={"background.paper"}>
                <DataGrid rows={rows} columns={columns} />
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
