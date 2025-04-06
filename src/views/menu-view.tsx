import {Button} from "../components/ui/button";
import {Input} from "../components/ui/input";
import {Label} from "../components/ui/label";
import {Card, CardContent} from "../components/ui/card";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../components/ui/dialog";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "../components/ui/table";
import {MagnifyingGlass} from "react-loader-spinner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "../components/ui/pagination";
import {useMenuViewModel} from "../viewModels/use-menu-view-model";

const MenuView = () => {
    const {
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
    } = useMenuViewModel()

    return (
        <div className="flex flex-col gap-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            {!getMenu.isLoading ? (<><Table>
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
            </Table>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                size={10}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <span className="px-4 py-2 text-sm">Página {page}</span>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                size={10}
                                onClick={() => {
                                    const totalPages = Math.ceil((getMenu?.data?.totalItems || 0) / limit);
                                    setPage((prev: number) => Math.min(prev + 1, totalPages));
                                }}
                                className={getMenu?.data?.items.length < limit ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination></>) : <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />}
        </div>
    );
};

export default MenuView;