"use client";

import { addToCartKgQuantity } from "../lib/redux/features/cart/cartSlice";
import { ProductData } from "../../types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
    item: ProductData;
}

const AddKgToCartButton = ({ item }: Props) => {
    const dispatch = useDispatch();
    const [kgQuantity, setKgQuantity] = useState<string>("");

    const handleAddToCart = async () => {
        const parsedQuantity = parseFloat(kgQuantity);

        const response = await fetch("/api/kg-input-validation", {
            method: "POST",
            body: JSON.stringify({ quantity: parsedQuantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message);
            return;
        }

        setKgQuantity("");

        dispatch(
            addToCartKgQuantity({ item, kgQuantity: parseFloat(kgQuantity) })
        );

        toast.success(`${item?.title.substring(0, 12)} añadido al carrito`);
    };
    return (
        <>
            <p>Por favor seleccione la cantidad de producto:</p>
            {/* // TODO: Make proper validation with a form */}
            <input
                type="number"
                placeholder="Cantidad en Kilogramos (Kg)"
                value={kgQuantity}
                onChange={(e) => setKgQuantity(e.target.value)}
                className="border-[1px] border-gray-300/50 rounded-md px-2 py-2"
            />
            <button
                onClick={handleAddToCart}
                className="bg-black rounded-full text-white w-full py-3 border-px border-black font-bold hover:bg-black/60 hover:border-black/60 hoverEffect tracking-wide flex items-center justify-center gap-1"
            >
                Agregar al carrito
            </button>
        </>
    );
};

export default AddKgToCartButton;
