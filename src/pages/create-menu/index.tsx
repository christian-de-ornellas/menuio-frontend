import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Label} from "../../components/ui/label";
import {Card, CardContent} from "../../components/ui/card";
import {useReactTable, getCoreRowModel, ColumnDef, flexRender} from "@tanstack/react-table";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../../components/ui/dialog";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "../../components/ui/table";
import useGetMenu from "../../hooks/menu/use-get-menu";
import usePostMenu from "../../hooks/menu/use-post-menu";
import useDeleteMenu from "../../hooks/menu/use-delete-menu";
import {toast} from 'react-toastify';


const menuSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    image: z.instanceof(FileList).refine((files) => files.length === 1, "Selecione uma imagem"),
});

type MenuFormData = z.infer<typeof menuSchema>;

type MenuItem = {
    id?: string;
    title: string;
    description: string;
    image: File;
    userId?: string;
};

const CreateMenuPage = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const menu = useGetMenu()
    const postMenu = usePostMenu();


    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<MenuFormData>({
        resolver: zodResolver(menuSchema),
    });

    const onSubmit = (data: MenuFormData) => {

        const userId = localStorage.getItem("userId");

        if (!userId) return

        postMenu.mutate({
            title: data.title,
            description: data.description,
            image: data.image[0],
            userId
        });

        toast("Item adicionado com sucesso", {type: "success"});

        reset();

        setImagePreview(null);
    };

    const deleteMenu = useDeleteMenu();

    const columns: ColumnDef<MenuItem>[] = [
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
                    onClick={() => deleteMenu.mutate(row.original._id)}
                >
                    Excluir
                </Button>
            ),
        },
    ];


    const table = useReactTable({
        data: menu?.data?.items || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex flex-col gap-6">

            <Dialog>
                <Button asChild className="w-44 cursor-pointer">
                    <DialogTrigger>Adicionar Item</DialogTrigger>
                </Button>
                <DialogContent>
                    <DialogTitle>Adicionar item</DialogTitle>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Título</Label>
                                        <Input id="title" type="text" {...register("title")} />
                                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Descrição</Label>
                                        <Input id="description" type="text" {...register("description")} />
                                        {errors.description &&
                                            <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Imagem</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            {...register("image")}
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                                                }
                                            }}
                                        />
                                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                                        {imagePreview && <img src={imagePreview} alt="Preview"
                                                              className="mt-2 w-32 h-32 object-cover"/>}
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
            {!menu.isLoading ? (<Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>) : <>Carregando...</>}
        </div>
    );
};

export default CreateMenuPage;