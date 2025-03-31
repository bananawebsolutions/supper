import { ProductData } from "../../../../../types";
import { client } from "../../../../sanity/lib/client";
import { groq } from "next-sanity";
import Pagination from "../../../../components/Pagination";
import Container from "../../../../components/Container";
import ProductList from "../../../../components/ProductList";
import SidebarExpanded from "../../../../components/SidebarExpanded";

interface Props {
    searchParams: Promise<{
        categoria?: string;
        marca?: string;
        ofertas?: string;
        masVendido?: string;
        search?: string;
        page?: string;
    }>;
}

const ShopPage = async ({ searchParams }: Props) => {
    const { categoria, marca, ofertas, masVendido, search, page } =
        await searchParams;

    const PRODUCTS_PER_PAGE = 9;
    const pageNumber = page ? parseInt(page) : 1;
    const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;

    const productFilter = `_type == "product"`;
    const categoryFilter = categoria
        ? `&& productCategory == "${categoria}"`
        : "";
    const brandFilter = marca ? `&& brand == "${marca}"` : "";
    const bestSellerFilter = masVendido ? `&& bestseller == ${masVendido}` : "";
    const offersFilter = ofertas ? `&& rowprice > 0` : "";
    const searchFilter = search ? `&& title match "${search}"` : "";

    const filter = `*[${productFilter}${categoryFilter}${brandFilter}${bestSellerFilter}${offersFilter}${searchFilter}]`;
    const countFilter = `count(*[${productFilter}${categoryFilter}${brandFilter}${bestSellerFilter}${offersFilter}${searchFilter}])`;

    const products = await client.fetch<ProductData[]>(
        groq`${filter} {
            ...
        }|order(_createdAt asc) [${start}...${end}]`
    );
    const totalProducts = await client.fetch(groq`${countFilter}`);

    return (
        <Container>
            <div className="lg:grid grid-cols-3">
                <div className="col-span-1">
                    <SidebarExpanded />
                </div>
                <div className="lg:col-span-2 py-5 lg:py-10">
                    {products?.length > 0 ? (
                        <>
                            <ProductList products={products} />
                            <Pagination
                                page={pageNumber}
                                totalProducts={totalProducts}
                                productsPerPage={PRODUCTS_PER_PAGE}
                            />
                        </>
                    ) : (
                        <div>
                            <p>No se han encontrado productos.</p>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ShopPage;
