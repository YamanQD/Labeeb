import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useStore } from "src/core/infrastructure/store";
import { useGetProjects } from "src/features/projects/application/getProjects";
import { ProjectDTO } from "src/features/projects/services/dto";
import { useAddTask, useGetTask } from "src/features/tasks/application";
import { useDeleteTask } from "src/features/tasks/application/deleteTask";
import { useEditTask } from "src/features/tasks/application/editTask";
import { ETaskPriority, taskPriorities } from "src/features/tasks/domain/task";

interface FormFields {
    title: string;
    description?: string;
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
    const { t } = useTranslation();
    const { data: projects } = useGetProjects();
    const { mutate: addTaskMutate, isLoading: isAddTaskLoading } = useAddTask();
    const { mutate: editTaskMutate, isLoading: isEditTaskLoading } = useEditTask();
    const { mutate: deleteTaskMutate, isLoading: isDeleteTaskLoading } = useDeleteTask();

    const taskId = useStore((state) => state.currentTaskId);

    /**
     * Before fetching task data, we have to wait for the projects list to be loaded
     * because I want to set: projectId form field = taskId.projectId
     * 
     * When the projects list is empty, even if I set it this way the title of the project
     * won't appear in the form because there are no option elements.
     */
    const { data: taskData, isLoading: isGetTaskLoading } = useGetTask({
        id: taskId ?? 1,
        queryOptions: {
            enabled: !!taskId && !!projects,
        },
    });
    const isUserViewingATask = taskData != null;

    const [selectedProjectInfo, setSelectedProjectInfo] = useState<ProjectDTO | undefined>();

    const lists = selectedProjectInfo?.lists ?? [];
    const statuses = selectedProjectInfo?.statuses ?? [];
    const isLoading =
        isGetTaskLoading || isAddTaskLoading || isDeleteTaskLoading || isEditTaskLoading;

    const {
        register,
        handleSubmit,
        setValue,
        reset,
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

    const updateListAndStatusFieldsOfProject = useCallback(
        (projectId: number) => {
            const selectedProject = projects?.find((project) => project.id === projectId);

            const lists = selectedProject?.lists ?? [];
            const statuses = selectedProject?.statuses ?? [];

            setValue("listId", lists[0]?.id ?? "");
            setValue("status", statuses[0]?.title ?? "");
            setSelectedProjectInfo(selectedProject);
        },
        [projects, setValue]
    );

    useEffect(() => {
        if (isUserViewingATask) {
            const { title, status, priority, description, projectId, listId } = taskData;
            setValue("projectId", projectId);
            // It's important to udpate these fields before assigning their default values.
            updateListAndStatusFieldsOfProject(projectId);

            setValue("title", title);
            setValue("status", status);
            setValue("priority", priority);
            setValue("description", description ?? "");
            setValue("listId", listId);
        } else {
            reset();
        }
    }, [taskData, isUserViewingATask, setValue, updateListAndStatusFieldsOfProject, reset]);

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        const taskData = {
            projectId: +data.projectId,
            listId: +data.listId,
            priority: data.priority,
            status: data.status,
            title: data.title,
            description: data.description,
        };

        if (taskId) {
            editTaskMutate(
                {
                    id: taskId,
                    ...taskData,
                },
                {
                    onSuccess() {
                        closeModal();
                        toast("Task edited successfully!", {
                            position: toast.POSITION.BOTTOM_LEFT,
                        });
                    },
                }
            );
        } else {
            addTaskMutate(taskData, {
                onSuccess() {
                    closeModal();
                    toast("Task added successfully!", {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                },
            });
        }
    };

    const onDeleteTask = () => {
        if (taskId) {
            deleteTaskMutate(taskId, {
                onSuccess() {
                    closeModal();
                    toast("Task deleted successfully!", {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                },
            });
        }
    };

    return (
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="lg">
            <DialogTitle>
                <span>{taskId ? `${t("tasks.single_task")} #${taskId}` : t("tasks.add_task")}</span>
                <IconButton color="error" onClick={onDeleteTask} title={t("tasks.delete_task")}>
                    <DeleteIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    autoFocus
                                    margin="normal"
                                    label={t("tasks.title")}
                                    variant="standard"
                                    placeholder="Fix bug #23"
                                    error={!!errors.title}
                                    helperText={errors.title?.message ?? ""}
                                    {...register("title", { required: "Task title is required." })}
                                />

                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    label={t("tasks.description")}
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
                                            label={t("tasks.project")}
                                            select
                                            variant="standard"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateListAndStatusFieldsOfProject(+e.target.value);
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
                            <Stack style={{ justifyContent: "space-between", height: "100%" }}>
                                <Controller
                                    control={control}
                                    name="listId"
                                    rules={{
                                        required: "Project list is required",
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            margin="normal"
                                            label={t("tasks.list")}
                                            select
                                            variant="standard"
                                            error={!!errors.listId}
                                            helperText={errors.listId?.message}
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
                                            label={t("tasks.status")}
                                            select
                                            variant="standard"
                                            {...field}
                                        >
                                            {statuses?.map((status, index) => (
                                                <MenuItem key={index} value={status.title}>
                                                    {status.title}
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
                                            label={t("tasks.priority")}
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
                                            label={t("tasks.deadline")}
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
                <Button onClick={closeModal}>{t("actions.cancel", { ns: "common" })}</Button>
                <Button onClick={handleSubmit(onSubmit)}>
                    {taskId
                        ? t("actions.edit", { ns: "common" })
                        : t("actions.add", { ns: "common" })}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModal;
