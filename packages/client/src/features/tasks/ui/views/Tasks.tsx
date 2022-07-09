import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/material/styles';
import SuspenseLoader from "src/components/SuspenseLoader";
import { useStore } from "src/core/infrastructure/store";
import { useAddTask } from "../../application/addTask";
import { useGetTaskGroups } from "../../application/getTaskGroups";
import TaskGroup from "../components/TaskGroup";

const AddTaskButton = styled(IconButton) (({ theme }) => `
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.contrastText};
    position: fixed;
    bottom: 3%;
    right: 3%;
    &:hover {
        background-color: ${theme.palette.primary.dark}
    }
`);

const Tasks = () => {
    const currentProjectId = useStore((state) => state.currentProjectId);
    const currentGroupId = useStore((state) => state.currentGroupId);
    const addTaskQuery = useAddTask();

    const {
        data: taskGroups,
        isLoading,
        isError,
    } = useGetTaskGroups({
        projectId: currentProjectId,
        groupId: currentGroupId,
    });

    if (isLoading) return <SuspenseLoader />;
    if (isError) return <p>Hmmmm error</p>;

    return (
        <div>
            <Box sx={{ p: 4 }}>
                <>
                    {taskGroups?.map((group) => (
                        // Task groups contain task lists (open tasks, WIP tasks, .etc)
                        // And task lists are composed of individual tasks
                        <TaskGroup key={group.id} {...group} />
                    ))}
                </>
            </Box>

            <AddTaskButton
                onClick={() =>
                    addTaskQuery.mutate({
                        status: "no",
                        title: "New task",
                        description: "Plz no more tasks",
                        projectId: 1,
                        groupId: 1,
                    })
                }
            >
                <AddIcon />
            </AddTaskButton>
        </div>); };

export default Tasks;