import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "./task.module.css";

const Task = ({ title = "default" }) => {
    return (
        <Paper className={styles.taskContainer}>
            <Grid container>
                <Grid item xs={6} className={styles.taskName}>
                    <div className={styles.taskStatus}></div>
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
