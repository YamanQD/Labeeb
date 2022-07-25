import { useParams } from "react-router-dom";
import SuspenseLoader from "src/components/SuspenseLoader";
import { useGetTaskLists } from "../../application/getTaskLists";
import AddTaskContainer from "../components/AddTaskContainer";
import TaskList from "../components/TaskList";

const Tasks = () => {
    const { projectId, listId } = useParams();

    // One of these two must be truthy, otherwise the query is disabled
    const isQueryEnabled = !!projectId || !!listId;

    const {
        data: taskLists,
        isLoading,
        isError,
    } = useGetTaskLists({
        projectId,
        listId,
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
            <>
                {taskLists?.map((list) => (
                    // Task list -> Task group (tasks that belong to the same status) -> single task
                    <TaskList key={list.id} {...list} />
                ))}
            </>
        );

    return (
        <div>
            {content}
            <AddTaskContainer disabled={isLoading || !isQueryEnabled} />
        </div>
    );
};

export default Tasks;
