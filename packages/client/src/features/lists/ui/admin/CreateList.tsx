import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "src/components/FormContainer";
import { useGetProjects } from "src/features/projects/api/getProjects";
import { useAddList } from "../../api/addList";

interface FormFields {
    title: string;
    projectId: number | string;
}

const CreateList = () => {
    const navigate = useNavigate();
    const { mutate } = useAddList();
    const { data: projects, isFetching } = useGetProjects();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            title: "",
            projectId: "",
        },
    });

    useEffect(() => {
        if (projects) setValue("projectId", projects[0]?.id ?? 1);
    }, [projects, setValue]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(
            {
                ...data,
                projectId: Number(data.projectId),
            },
            {
                onSuccess() {
                    toast.success("List added successfully!", {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });

                    navigate(`/admin/lists`);
                },
            }
        );
    };

    const isLoading = isFetching;

    return (
        <FormContainer
            formProps={{
                noValidate: true,
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <Typography variant="h2" mb={3}>
                Create a new list
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Stack>
                        <TextField
                            variant="outlined"
                            label="Title"
                            margin="normal"
                            {...register("title", { required: "List title is required!" })}
                            error={!!errors.title}
                            helperText={errors.title?.message ?? ""}
                        />
                        <Controller
                            control={control}
                            name="projectId"
                            rules={{
                                required: "Project is required!",
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    label="Project"
                                    margin="normal"
                                    select
                                    {...field}
                                    error={!!errors.projectId}
                                    helperText={errors.projectId?.message ?? ""}
                                >
                                    {projects?.map((project) => (
                                        <MenuItem value={project.id} key={project.id}>
                                            {project.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Stack>
                </Grid>
            </Grid>

            <div style={{ display: "flex", marginTop: "auto" }}>
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ ml: "auto" }}
                    disabled={isLoading}
                >
                    <span>Create</span>
                    {isLoading && (
                        <CircularProgress size={24} disableShrink sx={{ color: "white", ml: 3 }} />
                    )}
                </Button>
            </div>
        </FormContainer>
    );
};
export default CreateList;
