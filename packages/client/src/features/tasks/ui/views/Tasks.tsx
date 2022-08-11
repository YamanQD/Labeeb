import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SuspenseLoader from "src/components/SuspenseLoader";
import { ThemeContext } from "src/theme/ThemeProvider";
import { useGetTaskLists } from "../../api/getTaskLists";
import AddTaskContainer from "../components/AddTaskContainer";
import TaskList from "../components/TaskList";

const Tasks = () => {
    const { t } = useTranslation();
    const { direction } = useContext(ThemeContext);
    const { projectId, listId } = useParams();

    // One of these two must be truthy, otherwise the query is disabled
    const isQueryEnabled = !!projectId || !!listId;

    const {
        data: taskLists,
        isLoading,
        isError,
        isSuccess,
    } = useGetTaskLists({
        projectId,
        listId,
        queryOptions: {
            enabled: isQueryEnabled,
        },
    });

    console.log(isSuccess);

    let content;

    if (!isQueryEnabled)
        content = (
            <Stack>
                <Typography variant="h2" component="h2" mb={10}>
                    {t("tasks.no_project_selected")}
                </Typography>
                <img
                    alt=""
                    src="/images/projects/select_a_project.svg"
                    style={{
                        width: "50%",
                        margin: "0 auto",
                        transform: direction === "rtl" ? "rotateY(180deg)" : "",
                    }}
                />
            </Stack>
        );
    else if (isLoading) content = <SuspenseLoader />;
    else if (isError) content = <p>{t("tasks.loading_error")}</p>;
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
