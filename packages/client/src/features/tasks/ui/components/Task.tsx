import ErrorIcon from "@mui/icons-material/Error";
import { darken } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "src/lib/store";
import {
    formatDate,
    getDeadlineStatus,
    getDeadlineStyles,
    getPriorityStyles,
    TaskDTO,
} from "../../application";

const TaskContainer = styled(Paper)(
    ({ theme }) => `
        border-radius: 2px;
        padding: ${theme.spacing(1)};
        transition: background-color 0.1s ease-in;
        cursor: pointer;
        &:hover {
            background-color: ${darken(theme.palette.background.default, 0.09)}
        }
    `
);

const TaskStatus = styled("div")(
    ({ theme }) => `
        margin-right: ${theme.spacing(2)};
        background-color: ${theme.palette.secondary.main};
        width: 13px;
        height: 13px;
        border-radius: 3px;
    `
);

const Task = ({ id, title = "default", status, priority, deadline, tags }: TaskDTO) => {
    const { t } = useTranslation();
    const setCurrentTaskId = useStore((state) => state.setCurrentTaskId);
    const toggleTaskModal = useStore((state) => state.toggleTaskModal);

    const openTaskModal = useCallback(() => {
        toggleTaskModal(true);
        setCurrentTaskId(id);
    }, [toggleTaskModal, id, setCurrentTaskId]);

    const formatTaskTags = () => {
        const tagsToDisplay = 3;
        const tagTitles = tags.map((tag) => tag.title);

        let tagString = "";
        for (let i = 0; i < tagTitles.length && i < tagsToDisplay; i++) {
            tagString += tagTitles[i];
            if (tagTitles[i + 1]) tagString += ", ";
        }

        return tagString;
    };

    return (
        <TaskContainer onClick={openTaskModal}>
            <Grid container>
                <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
                    <TaskStatus style={{ backgroundColor: status.color }} />
                    <span>{title}</span>
                </Grid>

                <Grid item xs={2}>
                    {formatTaskTags()}
                </Grid>
                <Grid item xs={2} sx={{...getPriorityStyles(priority)}}>
                    {t(`priority.${priority}`)}
                </Grid>

                <Grid
                    item
                    xs={2}
                    sx={{
                        ...getDeadlineStyles(deadline),
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <span>{deadline ? formatDate(deadline) : ""}</span>
                    {getDeadlineStatus(deadline) === "passed" && (
                        <ErrorIcon titleAccess={t("admin.tasks.deadline_passed")} />
                    )}
                </Grid>
            </Grid>
        </TaskContainer>
    );
};

export default Task;
