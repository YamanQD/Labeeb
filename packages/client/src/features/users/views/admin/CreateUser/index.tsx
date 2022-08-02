import { Role } from "@labeeb/core";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { userRoles } from "src/features/users/application";

const PageContainer = styled("div")(
    ({ theme }) => `
		background-color: ${theme.palette.background.paper};
        min-height: 80%;
        padding: ${theme.spacing(3)};
        border-radius: ${theme.spacing(1)};

        display: flex;
        flex-direction: column;
`
);

const FormContainer = styled("form")(
    ({ theme }) => `
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100%;
    `
);

interface FormFields {
    name: string;
    email: string;
    role: Role | string;
    password: string;
}

const CreateUser = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            role: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data);
    };

    useEffect(() => {
        setValue("name", "Hasan");
        setValue("password", "123");
        setValue("email", "a@gmail.com");
        setValue("role", Role.USER);
    }, [setValue]);

    return (
        <PageContainer>
            <FormContainer noValidate onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h2" mb={3}>
                    Create a new user
                </Typography>
                <Grid container>
                    <Grid item xs={5}>
                        <Stack>
                            <TextField
                                variant="outlined"
                                label="Name"
                                margin="normal"
                                {...register("name", { required: "User name is required." })}
                                error={!!errors.name}
                                helperText={errors.name?.message ?? ""}
                            />
                            <TextField
                                variant="outlined"
                                label="Email"
                                margin="normal"
                                type="email"
                                {...register("email", { required: "Email is required." })}
                                error={!!errors.email}
                                helperText={errors.email?.message ?? ""}
                            />

                            <TextField
                                variant="outlined"
                                label="Password"
                                margin="normal"
                                type="password"
                                {...register("password", { required: "Password is required." })}
                                error={!!errors.password}
                                helperText={errors.password?.message ?? ""}
                            />

                            <Controller
                                control={control}
                                name="role"
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        label="Role"
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
                    >
                        Create user
                    </Button>
                </div>
            </FormContainer>
        </PageContainer>
    );
};
export default CreateUser;
