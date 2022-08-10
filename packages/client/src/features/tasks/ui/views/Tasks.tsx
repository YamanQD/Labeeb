import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

import { useGetTaskLists } from "../../api/getTaskLists";
import AddTaskContainer from "../components/AddTaskContainer";
import TaskList from "../components/TaskList";

const Tasks = () => {
    const { t } = useTranslation();
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
        content = <p>{t("tasks.loading_error")}</p>;
    else if (!isQueryEnabled) content = <p>{t("tasks.no_project_selected")}</p>;
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
