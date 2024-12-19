import { ProductData } from "../../types";
import ProductCard from "./ProductCard";

interface Props {
    products: ProductData[];
}

const ProductList = ({ products }: Props) => {
    return (
        <>
            {products ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products?.map((item) => (
                        <ProductCard key={item?._id} item={item} />
                    ))}
                </div>
            ) : (
                <div>
                    <p>No se encontraron productos</p>
                </div>
            )}
        </>
    );
};

export default ProductList;
