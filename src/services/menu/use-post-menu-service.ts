import {useMutation, useQueryClient} from "@tanstack/react-query";
import http from "../../lib/axios/http.ts";

interface CreateMenuItem {
    title: string;
    description: string;
    image: File;
    userId: string;
}

const createMenu = async (data: CreateMenuItem) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("userId", data.userId);

    const response = await http({
        endpoint: "/menu",
        method: "POST",
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
    });


    return response.data;
};

export default function usePostMenuService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMenu,
        onSuccess: async() => {
          await queryClient.invalidateQueries({queryKey: ["menu"]});
        },
    });
}