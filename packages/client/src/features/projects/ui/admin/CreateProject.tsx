import AutoComplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "src/components/FormContainer";
import { useGetUsers } from "src/features/users/api/getUsers";
import { useAddProject } from "../../api/addProject";

interface FormFields {
    title: string;
    description?: string;
    tags: string[];
    statuses: {
        title: string;
        color: string;
    }[];
    userIds: number[];
    finalStatus: string;
}

const CreateProject = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: users, isFetching } = useGetUsers();
    const { mutate, isLoading: isAddProjectLoading } = useAddProject();

    const isLoading = isFetching || isAddProjectLoading;

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
        watch,
    } = useForm<FormFields>({
        defaultValues: {
            title: "",
            description: "",
            tags: [],
            userIds: [],
            statuses: [{ title: "", color: "#ff0000" }],
            finalStatus: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "statuses",
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(data, {
            onSuccess() {
                toast.success("Project added successfully!", {
                    position: "bottom-left",
                });

                navigate("/admin/projects");
            },
        });
    };

    // Important for radio buttons to re-render with updated values
    watch("finalStatus");

    return (
        <FormContainer
            formProps={{
                noValidate: true,
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <Typography variant="h2" mb={3}>
                Create a new project
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Stack>
                        <TextField
                            variant="outlined"
                            label="Title"
                            margin="normal"
                            {...register("title", { required: "Project title is required!" })}
                            error={!!errors.title}
                            helperText={errors.title?.message ?? ""}
                        />
                        <TextField
                            variant="outlined"
                            label="Description"
                            multiline
                            rows={4}
                            margin="normal"
                            type="email"
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message ?? ""}
                        />

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mt={2}
                            mb={4}
                            pt={2}
                            borderTop={1}
                            borderColor="silver"
                        >
                            <Typography variant="h3" component="h3">
                                Statuses
                            </Typography>

                            <Button
                                size="small"
                                variant="contained"
                                onClick={() =>
                                    append({
                                        title: "",
                                        color: "#aaffdd",
                                    })
                                }
                            >
                                +
                            </Button>
                        </Box>

                        {fields.map((status, index) => (
                            <Box
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                                key={status.id}
                            >
                                <TextField
                                    label="Label"
                                    placeholder="Todo"
                                    defaultValue={status.title}
                                    fullWidth
                                    {...register(`statuses.${index}.title` as const)}
                                />

                                <TextField
                                    label="Color"
                                    placeholder="#aaddff"
                                    defaultValue={status.color}
                                    fullWidth
                                    type="color"
                                    {...register(`statuses.${index}.color` as const)}
                                />

                                <FormControlLabel
                                    label="Final"
                                    control={
                                        <Radio
                                            value={index}
                                            {...register("finalStatus")}
                                            onChange={() => {
                                                console.log(index);
                                                setValue("finalStatus", index.toString());
                                            }}
                                            checked={getValues("finalStatus") == index.toString()}
                                        />
                                    }
                                />

                                <Button size="small" color="error" onClick={() => remove(index)}>
                                    X
                                </Button>
                            </Box>
                        ))}
                    </Stack>
                </Grid>

                <Grid item xs={5}>
                    <Controller
                        control={control}
                        name="userIds"
                        render={({ field }) => (
                            <TextField
                                margin="normal"
                                label="Project Users"
                                select
                                variant="outlined"
                                fullWidth
                                SelectProps={{
                                    multiple: true,
                                }}
                                {...field}
                            >
                                {(users ?? []).map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.username} - {user.role}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    <Controller
                        control={control}
                        name="tags"
                        render={({ field }) => (
                            <AutoComplete
                                multiple
                                options={["Frontend", "Backend", "Bug", "Improvement", "Docs"]}
                                freeSolo={true}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Frontend"
                                        variant="outlined"
                                        margin="normal"
                                    />
                                )}
                                {...field}
                                // The default onChange method is this: (e) => setValue("tags", e.target.value)
                                // But it doesn't work because the tags field is an array, not a single string.
                                // Therefore we have to override this method
                                onChange={(e, data) => setValue("tags", data)}
                            />
                        )}
                    />
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
                    <span>{t("actions.create")}</span>
                    {isLoading && (
                        <CircularProgress size={24} disableShrink sx={{ color: "white", ml: 3 }} />
                    )}
                </Button>
            </div>
        </FormContainer>
    );
};
export default CreateProject;
