import { useMutation } from "react-query";
import { APIError } from "src/core/infrastructure/interfaces/IHTTPPClient";
import { userService } from "../services";
import { UserCredentialsDTO, UserDTO } from "../services/dto";

export const useLogin = () => {
    const mutation = useMutation<UserDTO, APIError, UserCredentialsDTO>((credentials) => {
        return userService.login(credentials);
    });
    return mutation;
};
