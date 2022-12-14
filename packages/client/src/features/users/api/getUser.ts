import { useQuery } from "@tanstack/react-query";
import { userService } from "../application";

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
