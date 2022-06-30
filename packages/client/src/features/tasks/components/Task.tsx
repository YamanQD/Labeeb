import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "./task.module.css";

const Task = ({ title = "default" }) => {
    return (
        <Paper className={styles.taskContainer}>
            <Grid container>
                <Grid item xs={6} className={styles.taskName}>
                    <Box sx={{ mr: 2 }} className={styles.taskStatus}></Box>
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
        </Paper>
    );
};

export default Task;
