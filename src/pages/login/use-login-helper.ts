import { useMutation } from "@tanstack/react-query";
import http from "../../lib/axios/http.ts";
import { ILoginType } from "./login-types.ts";

const useLoginHelper = () => {
    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: ILoginType) => {
            return await http({
                method: "POST",
                endpoint: `/login`,
                data: { email, password },
            });
        },
    });

    return { loginMutation };
};

export default useLoginHelper;