import Box from "@mui/material/Box";
import SuspenseLoader from "src/components/SuspenseLoader";
import { useStore } from "src/core/infrastructure/store";
import { useGetTaskLists } from "../../application/getTaskGroups";
import AddTaskContainer from "../components/AddTaskContainer";
import TaskList from "../components/TaskList";

const Tasks = () => {
    const currentProjectId = useStore((state) => state.currentProjectId);
    const currentListId = useStore((state) => state.currentListId);

    const isQueryEnabled = !!currentProjectId;

    const {
        data: taskGroups,
        isLoading,
        isError,
    } = useGetTaskLists({
        projectId: currentProjectId,
        listId: currentListId,
        queryOptions: {
            enabled: isQueryEnabled,
        },
    });

    let content;

    if (isLoading) content = <SuspenseLoader />;
    else if (isError)
        content = <p>An error occurred while fetching data. Please refresh your browser.</p>;
    else if (!isQueryEnabled) content = <p>Please select a project from the sidebar.</p>;
    else
        content = (
            <Box sx={{ p: 4 }}>
                <>
                    {taskGroups?.map((group) => (
                        // Task groups contain task lists (open tasks, WIP tasks, .etc)
                        // And task lists are composed of individual tasks
                        <TaskList key={group.id} {...group} />
                    ))}
                </>
            </Box>
        );

    return (
        <div>
            {content}
            <AddTaskContainer disabled={isLoading || !isQueryEnabled} />
        </div>
    );
};

export default Tasks;
