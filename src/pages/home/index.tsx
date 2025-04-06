import useGetMenuService from "../../services/menu/use-get-menu-service.ts";

export default function HomePage() {
    const menu = useGetMenuService({page: 1, limit: 10});

    return (
        <article className="flex gap-4">
            <div className="bg-accent rounded-2xl px-6 py-3">
                <p>Total de itens no Cardápio</p>
                <h2 className="text-3xl">{menu?.data?.totalItems}</h2>
            </div>
        </article>
    )
}
