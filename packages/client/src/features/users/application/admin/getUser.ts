import { useQuery } from "react-query";

import { userService } from "../../services";

interface UseGetUserProps {
    id: number | undefined;
    queryOptions?: Object;
}

export const useGetUser = ({ id, queryOptions = {} }: UseGetUserProps) => {
    const fetchUser = async () => {
        if (id) return userService.getUser(id);
    };

    return useQuery(["users", { id }], fetchUser, queryOptions);
};
