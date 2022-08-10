import { useQuery } from "react-query";
import { PaginatedResponse } from "src/lib/http/IhttpClient";
import { userService } from "../application";
import { UserDTO } from "../types/user.dto";

/**
 * TypeScript conditional types:
 *
 * https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
 * https://stackoverflow.com/questions/66552211/minimal-implementation-of-function-with-conditional-type-return-type-in-typescri
 * https://medium.com/@KevinBGreene/advanced-typescript-the-power-and-limitations-of-conditional-types-and-the-infer-keyword-26011edcdeb8
 */

interface UseGetUsersProps {
    page?: number;

    /**
     * If this is provided, the hook will fetch all users that are assigned
     * to this project
     */
    projectId?: number;
    queryOptions?: Object;
}

type GetUsersResponse<Options> = Options extends { projectId: number }
    ? UserDTO[]
    : PaginatedResponse<UserDTO[]>;

export const useGetUsers = <T extends UseGetUsersProps>({
    page = 1,
    queryOptions = {},
    projectId,
}: T) => {
    const fetchUsers = async () => {
        if (projectId) {
            return userService.getUsersForProject(projectId) as Promise<GetUsersResponse<T>>;
        }

        return userService.getUsers(page) as Promise<GetUsersResponse<T>>;
    };

    return useQuery<GetUsersResponse<T>>(["users", { page }], fetchUsers, queryOptions);
};
