import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "src/components/FormContainer";
import { useEditList } from "../../api/editList";
import { useGetList } from "../../api/getList";

interface FormFields {
    title: string;
}

const CreateList = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { data: listData } = useGetList({ id: Number(id) });
    const { mutate, isLoading } = useEditList();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            title: "",
        },
    });

    useEffect(() => {
        if (listData) setValue("title", listData.title ?? "");
    }, [listData, setValue]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(
            {
                ...data,
                id: Number(id),
            },
            {
                onSuccess() {
                    toast.success("List edited successfully!", {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });

                    navigate(`/admin/lists`);
                },
            }
        );
    };

    return (
        <FormContainer
            formProps={{
                noValidate: true,
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <Typography variant="h2" mb={3}>
                Edit list
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Stack>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            label="Title"
                            margin="normal"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message ?? ""}
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
                    <span>Edit</span>
                    {isLoading && (
                        <CircularProgress size={24} disableShrink sx={{ color: "white", ml: 3 }} />
                    )}
                </Button>
            </div>
        </FormContainer>
    );
};
export default CreateList;
