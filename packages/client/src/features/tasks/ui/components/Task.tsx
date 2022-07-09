import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { darken } from "@mui/material"

const TaskContainer = styled(Paper)(
    ({ theme }) => `
        border-radius: 2px;
        padding: ${theme.spacing(1)};
        transition: background-color 0.1s ease-in;
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

const Task = ({ title = "default" }) => {
    return (
        <TaskContainer>
            <Grid container>
                <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
                    <TaskStatus />
                    <span>{title}</span>
                </Grid>

                <Grid item xs={2}>
                    Hasan Mothaffar
                </Grid>

                <Grid item xs={2}>
                    Hasan Mothaffar
                </Grid>

                <Grid item xs={2}>
                    Hasan Mothaffar
                </Grid>
            </Grid>
        </TaskContainer>
    );
};

export default Task;
