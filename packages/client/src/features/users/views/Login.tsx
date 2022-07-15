import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { APIError } from "src/core/infrastructure/interfaces/IhttpClient";
import { useStore } from "src/core/infrastructure/store";
import { useLogin } from "../application/login";

interface FormFields {
    email: string;
    password: string;
}

const Login = () => {
    const { mutate, error } = useLogin();
    const navigate = useNavigate();

    const user = useStore((state) => state.user);
    const setUserInfo = useStore((state) => state.setUserInfo);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate(
            {
                ...data,
            },
            {
                onSuccess(responseData) {
                    setUserInfo(responseData);
                    navigate("/");
                }
            },
        );
    };

    // Redirect logged in users to /
    if (user) return <Navigate to="/" />
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
                autoFocus
                margin="normal"
                label="Email"
                variant="standard"
                placeholder="ahmad@gmail.com"
                error={!!errors.email}
                helperText={errors.email?.message ?? ""}
                {...register("email", { required: "Please enter your email" })}
            />

            <TextField
                margin="normal"
                label="Password"
                variant="standard"
                {...register("password", {
                    required: "Please enter your password",
                })}
                error={!!errors.email}
                helperText={errors.email?.message ?? ""}
            />

            <p>{error && error.message}</p>

            <Button type="submit" variant="contained">
                Submit
            </Button>
        </form>
    );
};

export default Login;
