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
import { ProjectGroupDTO } from "src/features/projects/services/dto";
import { useAddTask } from "../../application/addTask";

interface FormFields {
    title: string;
    description: string;
    status: string;
    projectId: number;
    groupId: number;
}

const AddTaskModal = ({ open = false, closeModal = () => {} }) => {
    const [groups, setGroups] = useState<ProjectGroupDTO[]>([]);

    const { data: projects } = useGetProjects();
    const { mutate, isLoading } = useAddTask();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormFields>();

    useEffect(() => {
        // Update project groups when the user selects a project
        const subscription = watch((data) => {
            const selectedProjectId = data.projectId;
            const selectedProject = projects?.find((project) => project.id == selectedProjectId);

            if (selectedProject) setGroups(selectedProject.groups);
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    const statuses = [
        {
            id: 1,
            label: "TODO",
            value: 0,
        },

        {
            id: 2,
            label: "In Progress",
            value: 1,
        },

        {
            id: 3,
            label: "Done",
            value: 2,
        },
    ];
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
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="md">
            <DialogTitle>Add a new task</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill the details of the new task</DialogContentText>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Stack>
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    label="Title"
                                    variant="standard"
                                    error={!!errors.title}
                                    helperText={errors.title?.message ?? ""}
                                    {...register("title", { required: "Task title is required." })}
                                />
                                <TextField
                                    margin="normal"
                                    label="Description"
                                    variant="standard"
                                    {...register("description")}
                                />

                                <TextField
                                    margin="normal"
                                    label="Status"
                                    defaultValue={0}
                                    select
                                    variant="standard"
                                    {...register("status")}
                                >
                                    {statuses.map((status) => (
                                        <MenuItem key={status.id} value={status.value}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack>
                                <TextField
                                    margin="normal"
                                    label="Project"
                                    defaultValue=""
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

                                <TextField
                                    margin="normal"
                                    label="Group"
                                    defaultValue=""
                                    select
                                    variant="standard"
                                    {...register("groupId")}
                                >
                                    {groups?.map((group) => (
                                        <MenuItem key={group.id} value={group.id}>
                                            {" "}
                                            {group.title}{" "}
                                        </MenuItem>
                                    ))}
                                </TextField>
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

export default AddTaskModal;
