import { Box } from "@mui/material";
import TaskList from "../components/TaskList";
import { useGetTaskLists } from "../api/getTaskLists";

const Tasks = () => {
    const { data, isLoading } = useGetTaskLists();

    return (
        <Box sx={{ p: 4 }}>
            {isLoading ? (
                "LOADING MAN PLEASE WAIT"
            ) : (
                <>
                    {data.map((list) => (
                        <TaskList key={list.id} {...list} />
                    ))}
                </>
            )}
        </Box>
    );
};

export default Tasks;
