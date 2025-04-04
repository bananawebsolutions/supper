import { ImCross } from "react-icons/im";
import { ProductData } from "../../types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity/lib/image";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../lib/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import AddQtyToCartButton from "./AddQtyToCartButton";

interface Props {
    cart: ProductData[];
    item: ProductData;
}

const CartItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    return (
        <div className="w-full grid grid-cols-5 mb-4 border border-gray-200 py-2">
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
                    {item?.productType === "m-kg" && (
                        <FormattedPrice
                            amount={item?.kgPrice - (item?.rowprice || 0)}
                        />
                    )}
                    {item?.productType === "p" && (
                        <FormattedPrice
                            amount={item?.pPrice - (item?.rowprice || 0)}
                        />
                    )}
                    {item?.productType === "kg" && (
                        <FormattedPrice
                            amount={item?.kgPrice - (item?.rowprice || 0)}
                        />
                    )}
                    {item?.productType === "100g" && (
                        <FormattedPrice
                            amount={item?.gramsPrice - (item?.rowprice || 0)}
                        />
                    )}
                </p>
                <div className="w-1/3 flex items-center gap-6 text-lg">
                    {item?.productType === "p" && (
                        <>
                            <AddQtyToCartButton item={item} />
                            {/* <button
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
                            </button> */}
                        </>
                    )}
                    {item?.productType === "m-kg" && (
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
                    {item?.productType === "100g" && (
                        <p className="text-sm font-semibold">
                            {item?.kgQuantity} Kg
                        </p>
                    )}
                    {item?.productType === "kg" && (
                        <p className="text-sm font-semibold">
                            {item?.kgQuantity} kg
                        </p>
                    )}
                </div>
                <div className="w-1/3 flex items-center font-bold text-lg">
                    {item?.productType === "p" && (
                        <FormattedPrice
                            amount={
                                item?.quantity *
                                (item?.pPrice - (item?.rowprice || 0))
                            }
                        />
                    )}
                    {item?.productType === "m-kg" && (
                        <FormattedPrice
                            amount={
                                (item?.matureQuantity
                                    ? item.matureQuantity *
                                      (item.kgPrice - (item?.rowprice || 0))
                                    : 0) +
                                (item?.greenQuantity
                                    ? item.greenQuantity *
                                      (item.kgPrice - (item?.rowprice || 0))
                                    : 0)
                            }
                        />
                    )}
                    {item?.productType === "kg" && (
                        <FormattedPrice
                            amount={
                                item?.kgQuantity
                                    ? item.kgQuantity *
                                      (item.kgPrice - (item?.rowprice || 0))
                                    : 0
                            }
                        />
                    )}
                    {item?.productType === "100g" && (
                        <FormattedPrice
                            amount={
                                item?.kgQuantity
                                    ? item.kgQuantity *
                                      (item.gramsPrice * 10 -
                                          (item?.rowprice * 10 || 0))
                                    : 0
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
