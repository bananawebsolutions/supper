import { getBestSellersData } from "../lib/getData";
import { ProductData } from "../../types";
import ProductCard from "./ProductCard";
import Link from "next/link";

const BestSellerProductList = async () => {
    const products: ProductData[] = await getBestSellersData();

    return (
        <div className="flex flex-col gap-5 pt-5 pb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">Productos Más Vendidos</h2>
                <Link
                    href={"/productos"}
                    className="font-medium px-4 text-gray-600  py-2 bg-blue-50 hover:bg-blue-200 rounded-full text-center hoverEffect"
                >
                    Ver Más
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products?.map((item) => (
                    <ProductCard key={item?._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default BestSellerProductList;
