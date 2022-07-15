import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { darken } from "@mui/material"
import { TaskDTO } from "../../services";
import { useStore } from "src/core/infrastructure/store";
import { useCallback } from "react";

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

const Task = ({ title = "default", priority }: TaskDTO) => {
    const toggleTaskModal = useStore((state) => state.toggleTaskModal);
    const openTaskModal = useCallback(() => toggleTaskModal(true), [toggleTaskModal]);

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

                <Grid item xs={2}>
                    Hasan Mothaffar
                </Grid>
            </Grid>
        </TaskContainer>
    );
};

export default Task;
