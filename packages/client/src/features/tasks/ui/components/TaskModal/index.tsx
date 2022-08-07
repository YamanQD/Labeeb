import { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useGetProjects } from "src/features/projects/application/getProjects";
import { ProjectDTO } from "src/features/projects/services/dto";
import { useAddTask, useGetTask } from "src/features/tasks/application";
import { useDeleteTask } from "src/features/tasks/application/deleteTask";
import { useEditTask } from "src/features/tasks/application/editTask";
import { ETaskPriority, formatDate, taskPriorities } from "src/features/tasks/domain/task";
import { useStore } from "src/lib/store";
import DeleteTaskButton from "./DeleteTaskButton";

interface FormFields {
    title: string;
    description?: string;
    listId: number | string;
    projectId: number | string;
    status: string;
    tags: string[];
    priority: ETaskPriority;
    deadline: string;
}

const TaskModal = ({ open = false, closeModal = () => {} }) => {
    const { t } = useTranslation();
    const { data: projects } = useGetProjects();
    const { mutateAsync: addTaskMutate, isLoading: isAddTaskLoading } = useAddTask();
    const { mutateAsync: editTaskMutate, isLoading: isEditTaskLoading } = useEditTask();
    const { mutateAsync: deleteTaskMutate, isLoading: isDeleteTaskLoading } = useDeleteTask();

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

    const [selectedProjectInfo, setSelectedProjectInfo] = useState<ProjectDTO | undefined>();
    const lists = selectedProjectInfo?.lists ?? [];
    const statuses = selectedProjectInfo?.statuses ?? [];
    const tags = selectedProjectInfo?.tags ?? [];

    const isLoading =
        isGetTaskLoading || isAddTaskLoading || isDeleteTaskLoading || isEditTaskLoading;
    const isUserViewingATask = taskData != null;

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
            tags: [""],
            priority: ETaskPriority.HIGH,
        },
    });

    const updateListAndStatusFieldsOfProject = useCallback(
        (projectId: number) => {
            const selectedProject = projects?.find((project) => project.id === projectId);

            const lists = selectedProject?.lists ?? [];
            const statuses = selectedProject?.statuses ?? [];
            const tags = selectedProject?.tags ?? [];

            setValue("listId", lists[0]?.id ?? "");
            setValue("status", statuses[0]?.title ?? "");
            setValue("tags", [tags[0]?.title ?? ""]);
            setSelectedProjectInfo(selectedProject);
        },
        [projects, setValue]
    );

    useEffect(() => {
        if (isUserViewingATask) {
            const { title, status, priority, description, projectId, listId, deadline, tags } = taskData;
            setValue("projectId", projectId);
            // It's important to update these fields before assigning their default values.
            updateListAndStatusFieldsOfProject(projectId);

            setValue("title", title);
            setValue("status", status);
            setValue("priority", priority);
            setValue("tags", tags.map((tag) => tag.title));
            setValue("deadline", formatDate(deadline));
            setValue("description", description ?? "");
            setValue("listId", listId);
        } else {
            reset();
        }
    }, [taskData, isUserViewingATask, setValue, updateListAndStatusFieldsOfProject, reset]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const taskData = {
            ...data,
            projectId: +data.projectId, // Convert these two to numbers before sending them
            listId: +data.listId,
        };

        if (taskId) {
            await editTaskMutate({
                id: taskId,
                ...taskData,
            });

            closeModal();
            toast(t("tasks.edit_success"), {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            await addTaskMutate(taskData);
            closeModal();
            toast(t("tasks.add_success"), {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };

    const deleteTask = async () => {
        if (taskId) {
            await deleteTaskMutate(taskId);
            closeModal();
            toast(t("tasks.delete_success"), {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };

    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="xl">
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>{taskId ? `${t("tasks.single_task")} #${taskId}` : t("tasks.add_task")}</span>
                {isUserViewingATask && <DeleteTaskButton onConfirmation={deleteTask} />}
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
                                    placeholder={t("tasks.title_placeholder")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message ?? ""}
                                    {...register("title", { required: t("tasks.title_required") })}
                                />

                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    label={t("tasks.description")}
                                    placeholder={t("tasks.description_placeholder")}
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
                                        required: t("tasks.list_required"),
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
                                    name="tags"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            label="Tags"
                                            select
                                            variant="standard"
                                            SelectProps={{
                                                multiple: true,
                                            }}
                                        >
                                            {tags.map((tag) => (
                                                <MenuItem key={tag.title} value={tag.title}>
                                                    {tag.title}
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
                <Button onClick={closeModal}>{t("actions.cancel")}</Button>
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
