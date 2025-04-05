import {useMutation, useQueryClient} from "@tanstack/react-query";
import http from "../../lib/axios/http.ts";
import {toast} from "react-toastify";

const useDeleteMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await http({
                endpoint: `/menu/${id}`,
                method: "DELETE",
            });
            return response.data;
        },
        onSuccess: async () => {

            await queryClient.invalidateQueries({queryKey: ["menu"]});
            toast("Item removido com sucesso!", {type: "success"})
        },
        onError: err => {
            console.error(err);
            toast("Ops: não conseguimos remover o item!", {type: "error"})
        }
    });
};

export default useDeleteMenu;
