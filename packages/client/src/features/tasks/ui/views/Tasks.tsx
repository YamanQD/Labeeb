import Box from "@mui/material/Box";
import SuspenseLoader from "src/components/SuspenseLoader";
import { useStore } from "src/core/infrastructure/store";
import { useGetTaskLists } from "../../application/getTaskLists";
import AddTaskContainer from "../components/AddTaskContainer";
import TaskList from "../components/TaskList";

const Tasks = () => {
    const currentProjectId = useStore((state) => state.currentProjectId);
    const currentListId = useStore((state) => state.currentListId);

    // One of these two must be truthy, otherwise the query is disabled
    const isQueryEnabled = (!!currentProjectId || !!currentListId);

    const {
        data: taskLists,
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
                    {taskLists?.map((list) => (
                        // Task list -> Task group (tasks that belong to the same status) -> single task
                        <TaskList key={list.id} {...list} />
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
