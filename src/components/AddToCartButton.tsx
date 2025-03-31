"use client";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { ProductData } from "../../types";

interface Props {
    item: ProductData;
    className?: string;
}

const AddToCartButton = ({ item, className }: Props) => {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart(item));
        toast.success(`${item?.title.substring(0, 12)} añadido al carrito`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={twMerge(
                "bg-black text-white w-full py-2 border-px border-black font-bold hover:bg-black/60 hover:border-black/60 hoverEffect tracking-wide flex items-center justify-center gap-1",
                className
            )}
        >
            Agregar al carrito
        </button>
    );
};

export default AddToCartButton;
