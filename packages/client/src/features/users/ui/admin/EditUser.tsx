import { Role } from "@labeeb/core";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "src/components/FormContainer";
import { userRoles } from "src/features/users/api";
import { useEditUser } from "../../api/editUser";
import { useGetUser } from "../../api/getUser";

interface FormFields {
    username: string;
    email: string;
    role: Role;
    oldPassword?: string;
    newPassword?: string;
}

const EditUser = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { userId } = useParams();
    const { data: user, isLoading: isGetUserLoading } = useGetUser({ id: Number(userId) });
    const { mutate, isLoading: isEditUserLoading } = useEditUser();

    const isLoading = isGetUserLoading || isEditUserLoading;

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        getValues,
    } = useForm<FormFields>({
        defaultValues: {
            username: "",
            email: "",
            role: Role.EMPLOYEE,
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(
            {
                ...data,
                id: Number(userId),
            },
            {
                onSuccess() {
                    toast.success(t("users.edit_success"), {
                        position: toast.POSITION.BOTTOM_LEFT,
                        icon: "🚀"
                    });
                    navigate("/admin/users");
                },
            }
        );
    };

    useEffect(() => {
        if (user) {
            setValue("email", user.email);
            setValue("username", user.username);
            setValue("role", user.role);
        }
    }, [user, setValue]);

    return (
        <FormContainer
            formProps={{
                noValidate: true,
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <Typography variant="h2" mb={3}>
                {t("users.edit", { id: user?.id ?? "null" })}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label={t("users.email")}
                            margin="normal"
                            type="email"
                            {...register("email", { required: t("users.email_required") })}
                            error={!!errors.email}
                            helperText={errors.email?.message ?? ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            variant="outlined"
                            label={t("users.password_old")}
                            margin="normal"
                            type="password"
                            {...register("oldPassword", {
                                validate: (value) =>
                                    value !== getValues().newPassword ||
                                    t("users.password_unchanged"),
                            })}
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword?.message ?? ""}
                        />

                        <TextField
                            variant="outlined"
                            label={t("users.password_new")}
                            margin="normal"
                            type="password"
                            {...register("newPassword", {
                                validate: (value) =>
                                    value !== getValues().oldPassword ||
                                    t("users.password_unchanged"),
                            })}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message ?? ""}
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
                    <span>{t("actions.edit")}</span>
                    {isLoading && (
                        <CircularProgress size={24} disableShrink sx={{ color: "white", ml: 3 }} />
                    )}
                </Button>
            </div>
        </FormContainer>
    );
};
export default EditUser;
