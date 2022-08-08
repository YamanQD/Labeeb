import { useMutation } from "react-query";

import { userService } from "../../services";
import { EditUserDTO } from "../../services/dto";

export const useEditUser = () => {
    const mutation = useMutation((editedUser: EditUserDTO) => {
        return userService.editUser(editedUser);
    });

    return mutation;
}