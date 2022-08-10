import ErrorIcon from "@mui/icons-material/Error";
import { darken } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { useStore } from "src/lib/store";
import { formatDate, getDeadlineStatus, TaskDTO } from "../../application";

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

const getDeadlineStyles = (deadline: Date): Record<string, string> => {
    const deadlineStatus = getDeadlineStatus(deadline);

    let styles = {};

    switch (deadlineStatus) {
        case "passed":
            styles = {
                color: "#ff0000",
                fontWeight: "bold",
            };
            break;
        case "close":
            styles = {
                color: "orange",
                fontWeight: "bold",
            };
            break;
        case "far":
            styles = {
                color: "#000000",
            };
            break;
    }

    return styles;
};

const Task = ({ id, title = "default", status, priority, deadline }: TaskDTO) => {
    const setCurrentTaskId = useStore((state) => state.setCurrentTaskId);
    const toggleTaskModal = useStore((state) => state.toggleTaskModal);

    const openTaskModal = useCallback(() => {
        toggleTaskModal(true);
        setCurrentTaskId(id);
    }, [toggleTaskModal, id, setCurrentTaskId]);

    return (
        <TaskContainer onClick={openTaskModal}>
            <Grid container>
                <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
                    <TaskStatus />
                    <span>{title}</span>
                </Grid>

                <Grid item xs={2}>
                    Hasan Mothaffar
                </Grid>

                <Grid item xs={2}>
                    {priority}
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
                    <span>{formatDate(deadline)}</span>
                    {getDeadlineStatus(deadline) === "passed" && <ErrorIcon />}
                </Grid>
            </Grid>
        </TaskContainer>
    );
};

export default Task;
