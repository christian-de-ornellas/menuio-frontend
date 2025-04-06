import {Card, CardContent} from "../components/ui/card"
import {Button} from "../components/ui/button"
import {Input} from "../components/ui/input"
import {MagnifyingGlass} from "react-loader-spinner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "../components/ui/pagination";
import {useStorefrontViewModel} from "../viewModels/use-storefront-view-model";

const StorefrontView = () => {
    const {items, handleSearch, setPage, page, limit, search} = useStorefrontViewModel();

    return (
        <article className="p-6">
            <div className="mb-6 flex items-center justify-between flex-col md:flex-row gap-4">
                <h1 className="text-2xl font-bold">Meu Cardápio</h1>
                <Input
                    className="max-w-sm"
                    placeholder="Buscar produtos..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.isLoading ? <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                /> : items.data?.items.map((item: any) => (
                    <Card key={item._id} className="hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={`${import.meta.env.VITE_PUBLIC}${item.image}`}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <CardContent className="pt-4 w-full">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className=""> {item.description.length > 60
                                ? item.description.slice(0, 60) + '...'
                                : item.description}</p>
                            <Button className="w-full mt-4 bg-green-600 hover:cursor-pointer hover:bg-green-500">Fazer
                                pedido</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination className="py-4">
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
                                const totalPages = Math.ceil((items?.data?.totalItems || 0) / limit);
                                setPage((prev: number) => Math.min(prev + 1, totalPages));
                            }}
                            className={items?.data?.items.length < limit ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </article>
    )
}
export default StorefrontView