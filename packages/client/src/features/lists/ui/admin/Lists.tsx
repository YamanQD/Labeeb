import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteList } from "../../api/deleteList";
import { useGetLists } from "../../api/getLists";

const DeleteListButton = ({ id }: { id: number }) => {
    const { mutate, isLoading } = useDeleteList();

    const deleteList = () => {
        mutate(id, {
            onSuccess() {
                toast.success("List deleted successfully!", {
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
                "Delete"
            )}
        </Button>
    );
};

const EditListButton = ({ id }: { id: number }) => {
    const navigate = useNavigate();

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(`/admin/lists/edit/${id}`)}
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

    { field: "title", headerName: "Title", width: 150, type: "string", flex: 1 },
    {
        field: "project",
        headerName: "Project",
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
];

const Lists = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<GridRowsProp>([]);

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
                />
            </Box>
            <Fab
                color="primary"
                size="medium"
                title="Create list"
                sx={{ position: "fixed", bottom: "5%", right: "3%" }}
                onClick={() => navigate("/admin/lists/create")}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

export default Lists;
