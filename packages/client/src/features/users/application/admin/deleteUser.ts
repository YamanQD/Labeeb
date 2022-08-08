import { useMutation } from "react-query";
import { userService } from "../../services";

export const useDeleteUser = () => {
    const mutation = useMutation((id: number) => {
        return userService.deleteUser(id);
    });

    return mutation;
};
