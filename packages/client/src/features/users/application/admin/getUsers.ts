import { useQuery } from "react-query";

import { userService } from "../../services";

interface UseGetUsersProps {
    page?: number;
    queryOptions?: Object;
}

export const useGetUsers = ({ page = 1, queryOptions = {} }: UseGetUsersProps = {}) => {
    const fetchUsers = async () => {
        return userService.getUsers(page);
    };

    return useQuery(["users", { page }], fetchUsers, queryOptions);
};
