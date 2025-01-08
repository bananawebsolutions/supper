import { ImCross } from "react-icons/im";
import { ProductData } from "../../types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useDispatch } from "react-redux";
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "@/lib/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface Props {
    cart: ProductData[];
    item: ProductData;
}

const CartItem = ({ cart, item }: Props) => {
    const [existingProduct, setExistingProduct] = useState<ProductData | null>(
        null
    );

    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const availabeProduct = cart?.find(
            (product: ProductData) => product?._id === item?._id
        );

        if (availabeProduct) {
            setExistingProduct(availabeProduct);
        }
    }, [cart, item]);

    const handleMinus = () => {
        if ((existingProduct?.quantity as number) > 1) {
            dispatch(decreaseQuantity(item?._id));
            toast.success("Se ha restado una unidad del producto");
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <div className="w-full grid grid-cols-5 mb-4 border py-2">
            <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
                <ImCross
                    onClick={() => {
                        dispatch(removeFromCart(item?._id));
                        toast.success(
                            `${item?.title.substring(0, 12)}... eliminado del carrito`
                        );
                    }}
                    className="text-black hover:text-red-600 cursor-pointer hoverEffect"
                />
                <Link href={`/producto/${item?.slug.current}`}>
                    <Image
                        src={urlFor(item?.image).url()}
                        alt={item?.title}
                        width={200}
                        height={200}
                        className="w-32 object-contain"
                    />
                </Link>
                <h1 className="font-semibold">{`${item?.title.substring(0, 20)}`}</h1>
            </div>
            <div className="flex col-span-5 md:col-span-3 items-center justify-between py-4 md:py-0 px-4 lg:px-0">
                <p className="flex w-1/3 items-center text-lg font-semibold">
                    <FormattedPrice
                        amount={
                            item?.productType !== "p"
                                ? item.kgPrice
                                : item.pPrice
                        }
                    />
                </p>
                <div className="w-1/3 flex items-center gap-6 text-lg">
                    {item?.productType === "p" ? (
                        <>
                            <button
                                onClick={handleMinus}
                                disabled={disabled}
                                className={`w-6 h-6 bg-gray-100 text-sm flex items-center justify-center hover:bg-primaryBlue/10 border-[1px] border-gray-300  
                                ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:border-primaryRed hoverEffect"}
                            `}
                            >
                                <FaMinus />
                            </button>
                            <p className="text-sm font-semibold">
                                {item?.quantity}
                            </p>
                            <button
                                onClick={() => {
                                    dispatch(increaseQuantity(item?._id));
                                    toast.success(
                                        "Se ha agregado una unidad del producto"
                                    );
                                    setDisabled(false);
                                }}
                                className="w-6 h-6 bg-gray-100 text-sm flex items-center justify-center hover:bg-primaryBlue/10 cursor-pointer border-[1px] border-gray-300 hover:border-primaryRed hoverEffect"
                            >
                                <FaPlus />
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold">
                                <span>Maduro: </span>
                                {item?.matureQuantity
                                    ? item.matureQuantity
                                    : 0}{" "}
                                Kg
                            </p>
                            <p className="text-sm font-semibold">
                                <span>Verde: </span>
                                {item?.greenQuantity
                                    ? item.greenQuantity
                                    : 0}{" "}
                                Kg
                            </p>
                        </div>
                    )}
                </div>
                <div className="w-1/3 flex items-center font-bold text-lg">
                    {item?.productType === "p" ? (
                        <FormattedPrice
                            amount={item?.quantity * item?.pPrice}
                        />
                    ) : (
                        <FormattedPrice
                            amount={
                                (item?.matureQuantity
                                    ? item.matureQuantity * item.kgPrice
                                    : 0) +
                                (item?.greenQuantity
                                    ? item.greenQuantity * item.kgPrice
                                    : 0) +
                                (item?.kgQuantity
                                    ? item.kgQuantity * item.kgPrice
                                    : 0)
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
