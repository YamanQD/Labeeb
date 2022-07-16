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
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetProjects } from "src/features/projects/application/getProjects";
import { ProjectDTO } from "src/features/projects/services/dto";
import { useAddTask } from "src/features/tasks/application";
import { ETaskPriority, taskPriorities } from "src/features/tasks/domain/task";

interface FormFields {
    title: string;
    description: string;
    listId: number | string;
    projectId: number | string;
    status: string;
    priority: ETaskPriority;
    deadline: string;
}

/**
 * The modal that's used for adding/viewing/editing tasks
 */
const TaskModal = ({ open = false, closeModal = () => {} }) => {
    const { data: projects } = useGetProjects();
    const { mutate, isLoading } = useAddTask();
    const [selectedProjectInfo, setSelectedProjectInfo] = useState<ProjectDTO | undefined>();

    const lists = selectedProjectInfo?.lists ?? [];
    const statuses = selectedProjectInfo?.statuses ?? [];

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            deadline: "",
            description: "",
            title: "",
            projectId: "",
            listId: "",
            status: "",
            priority: ETaskPriority.HIGH,
        },
    });

    const onProjectChange = (projectId: number) => {
        const selectedProject = projects?.find((project) => project.id === projectId);

        const lists = selectedProject?.lists ?? [];
        const statuses = selectedProject?.statuses ?? [];

        const defaultList = lists[0]?.id ?? "";
        const defaultStatus = statuses[0]?.label ?? "";

        setValue("listId", defaultList);
        setValue("status", defaultStatus);
        setSelectedProjectInfo(selectedProject);
    };

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate(
            {
                projectId: +data.projectId,
                listId: +data.listId,
                priority: data.priority,
                status: data.status,
                title: data.title,
                description: data.description,
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

                                <Controller
                                    control={control}
                                    name="projectId"
                                    render={({ field }) => (
                                        <TextField
                                            margin="normal"
                                            label="Project"
                                            select
                                            variant="standard"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                onProjectChange(+e.target.value);
                                            }}
                                        >
                                            {projects?.map((project) => (
                                                <MenuItem key={project.id} value={project.id}>
                                                    {project.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
                                <Controller
                                    control={control}
                                    name="listId"
                                    render={({ field }) => (
                                        <TextField
                                            margin="normal"
                                            label="List"
                                            select
                                            variant="standard"
                                            {...field}
                                        >
                                            {lists?.map((list) => (
                                                <MenuItem key={list.id} value={list.id}>
                                                    {list.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <TextField
                                            margin="normal"
                                            label="Status"
                                            select
                                            variant="standard"
                                            {...field}
                                        >
                                            {statuses.map((status) => (
                                                <MenuItem key={status.id} value={status.label}>
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="priority"
                                    render={({ field }) => (
                                        <TextField
                                            margin="normal"
                                            label="Priority"
                                            select
                                            variant="standard"
                                            {...field}
                                        >
                                            {taskPriorities.map((priority) => (
                                                <MenuItem
                                                    key={priority.value}
                                                    value={priority.value}
                                                >
                                                    {priority.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="deadline"
                                    render={({ field }) => (
                                        <TextField
                                            type="date"
                                            margin="normal"
                                            variant="standard"
                                            InputLabelProps={{ shrink: true }}
                                            label="Deadline"
                                            error={!!errors?.deadline}
                                            helperText={errors?.deadline?.message}
                                            {...field}
                                        />
                                    )}
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
