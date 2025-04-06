import {useMutation} from "@tanstack/react-query";
import http from "../../lib/axios/http.ts";
import {ILogin} from "../../models/login.ts";

const useLoginService = () => {
    const loginService = useMutation({
        mutationFn: async ({email, password}: ILogin) => {
            return await http({
                method: "POST",
                endpoint: `/login`,
                data: {email, password},
            });
        },
    });

    return {loginService};
};

export default useLoginService;