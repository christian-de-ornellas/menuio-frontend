import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import usePostMenu from "../services/menu/use-post-menu.ts";
import useGetMenu from "../services/menu/use-get-menu.ts";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import useDeleteMenu from "../services/menu/use-delete-menu";
import {Button} from "../components/ui/button.tsx";
import {useReactTable, getCoreRowModel, ColumnDef, flexRender} from "@tanstack/react-table";
import {IMenu} from "../models/menu.ts";


export const useMenuViewModel = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const postMenu = usePostMenu();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);

    const getMenu = useGetMenu({page, limit});
    const deleteMenu = useDeleteMenu();
    const userId = localStorage.getItem("userId");

    const menuSchema = z.object({
        title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
        description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
        image: z.instanceof(FileList).refine((files) => files.length === 1, "Selecione uma imagem"),
    });

    const onSubmit = (data: MenuFormData) => {

        if (!userId) return

        postMenu.mutate({
            title: data.title,
            description: data.description,
            image: data.image[0],
            userId
        });
        setIsDialogOpen(false)
        toast("Item adicionado com sucesso", {type: "success"});
        reset();

        setImagePreview(null);
    };

    type MenuFormData = z.infer<typeof menuSchema>;


    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<MenuFormData>({
        resolver: zodResolver(menuSchema),
    });

    const columns: ColumnDef<IMenu>[] = [
        {accessorKey: "title", header: "Título"},
        {accessorKey: "description", header: "Descrição"},
        {
            accessorKey: "image",
            header: "Imagem",
            cell: ({row}) => (
                <img
                    src={`${import.meta.env.VITE_PUBLIC}${row.original?.image}`}
                    alt="Menu"
                    className="w-16 h-16 object-cover"
                />
            ),
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({row}) => (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                        const confirmed = window.confirm(`Tem certeza que deseja excluir "${row.original.title}"?`);
                        if (confirmed && row.original._id) {
                            deleteMenu.mutate(row.original._id);
                        }
                    }}
                >
                    Excluir
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data: getMenu?.data?.items || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return {
        isDialogOpen,
        setIsDialogOpen,
        handleSubmit,
        onSubmit,
        register,
        errors,
        imagePreview,
        setImagePreview,
        isSubmitting,
        getMenu,
        page,
        setPage,
        table,
        limit,
        flexRender
    };
}