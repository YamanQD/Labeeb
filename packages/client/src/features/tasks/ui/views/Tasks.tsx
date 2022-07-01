import { Box } from "@mui/material";
import { useGetAllTaskGroups } from "../../application/getAllTaskGroups";
import TaskGroup from "../components/TaskGroup";

const Tasks = () => {
    const { data: taskGroups, isLoading } = useGetAllTaskGroups();

    return (
        <Box sx={{ p: 4 }}>
            {isLoading ? (
                "LOADING MAN PLEASE WAIT"
            ) : (
                <>
                    {taskGroups.map((group) => (
                        // Task groups contain task lists (open tasks, WIP tasks, .etc)
                        // And task lists are composed of individual tasks
                        <TaskGroup key={group.id} {...group} />
                    ))}
                </>
            )}
        </Box>
    );
};

export default Tasks;
