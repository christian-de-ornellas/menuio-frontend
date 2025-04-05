import {Card, CardContent} from "../../components/ui/card"
import {Button} from "../../components/ui/button"
import {Input} from "../../components/ui/input"
import {useState} from "react"
import useGetMenu from "../../hooks/menu/use-get-menu.ts";
import {MagnifyingGlass} from "react-loader-spinner";


export const StorefrontPage = () => {
    const [search, setSearch] = useState("")
    const items = useGetMenu()

    const filteredProducts = items?.data?.items?.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    )

    console.log(items.data)

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between flex-col md:flex-row gap-4">
                <h1 className="text-2xl font-bold">Meu Cardápio</h1>
                <Input
                    className="max-w-sm"
                    placeholder="Buscar produtos..."
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.isLoading ? <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                /> : filteredProducts.map((item: any) => (
                    <Card key={item._id} className="hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={`${import.meta.env.VITE_PUBLIC}${item.image}`}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <CardContent className="pt-4">
                            <h2 className="text-lg font-semibold">{item.title}</h2>

                            <Button className="w-full mt-4">Adicionar ao carrinho</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
