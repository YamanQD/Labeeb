import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetProjects } from "src/features/projects/application/getProjects";
import { ProjectDTO } from "src/features/projects/services/dto";
import { useAddTask } from "../../application/addTask";
import { ETaskPriority, taskPriorities } from "../../domain/task";

interface FormFields {
    title: string;
    description: string;
    projectId: number;
    listId: number;
    status: string;
    priority: ETaskPriority;
    deadline: string;
}

/**
 * The modal that's used for adding/viewing/editing tasks
 */
const TaskModal = ({ open = false, closeModal = () => {}, isEditMode = false }) => {
    const { data: projects } = useGetProjects();
    const { mutate, isLoading } = useAddTask();
    const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>();

    const lists = selectedProject?.lists ?? [];
    const statuses = selectedProject?.statuses ?? [];

    // The `?? ""` is useful so that MUI doesn't think my form fields
    // are uncontrolled.
    const defaultProject = selectedProject?.id ?? "";
    const defaultList = lists[0]?.id ?? "";
    const defaultStatus = statuses[0]?.label ?? "";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormFields>();

    useEffect(() => {
        // Update project lists when the user selects a project
        const subscription = watch((data) => {
            const selectedProjectId = Number(data.projectId);
            const selectedProject = projects?.find((project) => project.id == selectedProjectId);

            setSelectedProject(selectedProject);
        });

        /**
         * Setting the select project like this: `const ... = useState(projects?.[0])`
         * will only initialize it once, and not on every re-render.
         */
        setSelectedProject(projects?.[0]);

        return () => subscription.unsubscribe();
    }, [watch, projects]);

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate(
            {
                ...data,
            },
            {
                onSuccess() {
                    closeModal();
                    toast("Task added successfully!", {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                },
            }
        );
    };

    return (
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="lg">
            <DialogTitle>Add a new task</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill the details of the new task</DialogContentText>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    label="Title"
                                    variant="standard"
                                    placeholder="Fix bug #23"
                                    defaultValue={"HENLNLNO"}
                                    error={!!errors.title}
                                    helperText={errors.title?.message ?? ""}
                                    {...register("title", { required: "Task title is required." })}
                                />

                                <TextField
                                    margin="normal"
                                    label="Description"
                                    placeholder="When the user clicks on the ..."
                                    variant="standard"
                                    multiline
                                    rows={4}
                                    {...register("description")}
                                />

                                <TextField
                                    margin="normal"
                                    label="Project"
                                    defaultValue={defaultProject}
                                    select
                                    variant="standard"
                                    {...register("projectId")}
                                >
                                    {projects?.map((project) => (
                                        <MenuItem key={project.id} value={project.id}>
                                            {project.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
                                <TextField
                                    margin="normal"
                                    label="List"
                                    defaultValue={defaultList}
                                    select
                                    variant="standard"
                                    {...register("listId")}
                                >
                                    {lists?.map((list) => (
                                        <MenuItem key={list.id} value={list.id}>
                                            {list.title}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    margin="normal"
                                    label="Status"
                                    defaultValue={defaultStatus}
                                    select
                                    variant="standard"
                                    {...register("status")}
                                >
                                    {statuses.map((status) => (
                                        <MenuItem key={status.id} value={status.label}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    margin="normal"
                                    label="Priority"
                                    defaultValue={taskPriorities[0]?.value}
                                    select
                                    variant="standard"
                                    {...register("priority")}
                                >
                                    {taskPriorities.map((priority) => (
                                        <MenuItem key={priority.value} value={priority.value}>
                                            {priority.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    type="date"
                                    margin="normal"
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                    label="Deadline"
                                    error={!!errors?.deadline}
                                    helperText={errors?.deadline?.message}
                                    {...register("deadline")}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                {isLoading && (
                    <CircularProgress sx={{ mr: 2 }} size={20} disableShrink thickness={3} />
                )}
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModal;
