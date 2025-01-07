import Link from "next/link";
import { ProductData } from "../../types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import FormattedPrice from "./FormattedPrice";
import AddToCartButton from "./AddToCartButton";
import SeeProductButton from "./SeeProductButton";
import { Badge } from "./ui";

const ProductCard = ({ item }: { item: ProductData }) => {
    return (
        <div className="border-[1px] border-gray-300/50 rounded-2xl relative group overflow-hidden">
            {item?.seasonal && (
                <div className="absolute left-2 top-2">
                    <Badge>Temporada</Badge>
                </div>
            )}
            <Link href={`/producto/${item?.slug.current}`}>
                <Image
                    src={urlFor(item?.image).url()}
                    alt={item?.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="w-full h-72 object-contain p-2 group-hover:scale-105 hoverEffect"
                />
            </Link>
            <div className="px-6 flex flex-col items-center gap-2">
                {item?.brand ? (
                    <p className="uppercase text-xs font-medium text-primaryRed mt-4">
                        {item.brand}
                    </p>
                ) : (
                    <p className="uppercase text-xs font-medium text-primaryRed mt-4">
                        natural
                    </p>
                )}
                <h2 className="text-base font-semibold text-black line-clamp-1">
                    {item?.title}
                </h2>
                <p className="text-center text-sm line-clamp-2 min-h-10">
                    {item?.description}
                </p>
                <div className="flex items-center gap-2 mb-5">
                    {item?.rowprice ? (
                        <>
                            <FormattedPrice
                                amount={item?.kgPrice}
                                className="text-black/60 line-through"
                            />
                            <FormattedPrice
                                amount={item?.rowprice}
                                className="text-green-900 font-bold"
                            />
                        </>
                    ) : (
                        <FormattedPrice
                            amount={item?.kgPrice}
                            className="text-green-900 font-bold"
                        />
                    )}
                    {item?.productType !== "p" && (
                        <span className="text-sm font-medium">
                            <i>/Kg</i>
                        </span>
                    )}
                </div>
            </div>
            {item?.productType !== "p" ? (
                <SeeProductButton item={item} />
            ) : (
                <AddToCartButton item={item} />
            )}
        </div>
    );
};

export default ProductCard;
