import { useMutation } from "react-query";

import { userService } from "../application";
import { EditUserDTO } from "../types/user.dto";

export const useEditUser = () => {
    const mutation = useMutation((editedUser: EditUserDTO) => {
        return userService.editUser(editedUser);
    });

    return mutation;
}