import { Role } from "@labeeb/core";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "src/components/FormContainer";
import { userRoles } from "src/features/users/api";
import { useRegister } from "src/features/users/api/register";

interface FormFields {
    username: string;
    email: string;
    role: Role;
    password: string;
}

const CreateUser = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { mutate, isLoading } = useRegister();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            username: "",
            email: "",
            role: Role.EMPLOYEE,
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(data, {
            onSuccess() {
                toast.success(t("users.add_success"), {
                    position: toast.POSITION.BOTTOM_LEFT,
                    icon: "🚀"
                });

                navigate("/admin/users");
            },
        });
    };

    return (
        <FormContainer formProps={{
            noValidate: true, 
            onSubmit: handleSubmit(onSubmit)
        }}>
            <Typography variant="h2" mb={3}>
                {t("users.add")}
            </Typography>
            <Grid container>
                <Grid item xs={5}>
                    <Stack>
                        <TextField
                            variant="outlined"
                            label={t("users.name")}
                            margin="normal"
                            {...register("username", { required: t("users.name_required") })}
                            error={!!errors.username}
                            helperText={errors.username?.message ?? ""}
                        />
                        <TextField
                            variant="outlined"
                            label={t("users.email")}
                            margin="normal"
                            type="email"
                            {...register("email", { required: t("users.email_required") })}
                            error={!!errors.email}
                            helperText={errors.email?.message ?? ""}
                        />

                        <TextField
                            variant="outlined"
                            label={t("users.password")}
                            margin="normal"
                            type="password"
                            {...register("password", { required: t("users.password_required")})}
                            error={!!errors.password}
                            helperText={errors.password?.message ?? ""}
                        />

                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    label={t("users.role")}
                                    margin="normal"
                                    select
                                    error={!!errors.role}
                                    helperText={errors.role?.message ?? ""}
                                    {...field}
                                >
                                    {userRoles.map((role) => (
                                        <MenuItem value={role.title} key={role.id}>
                                            {role.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        ></Controller>
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
                    <span>{t("actions.create")}</span>
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            disableShrink
                            sx={{ color: "white", ml: 3 }}
                        />
                    )}
                </Button>
            </div>
        </FormContainer>
    );
};
export default CreateUser;
