import { Box } from "@mui/material";
import { useGetAllTaskGroups } from "../../application/getAllTaskGroups";
import TaskList from "../components/TaskList";

const Tasks = () => {
    const { data: groups, isLoading } = useGetAllTaskGroups();

    return (
        <Box sx={{ p: 4 }}>
            {isLoading ? (
                "LOADING MAN PLEASE WAIT"
            ) : (
                <>
                    {groups.map((group) => (
                        <>
                            <h2>{group.title}</h2>
                            {group.lists.map((list) => (
                                <TaskList key={list.id} {...list} />
                            ))}
                        </>
                    ))}
                </>
            )}
        </Box>
    );
};

export default Tasks;
