"use client";
import { twMerge } from "tailwind-merge";
import { ProductData } from "../../types";
import Link from "next/link";

interface Props {
    item: ProductData;
    className?: string;
}

const SeeProductButton = ({ item, className }: Props) => {
    return (
        <Link
            href={`/producto/${item?.slug.current}`}
            className={twMerge(
                "bg-black text-white w-full py-2 border-px border-black font-bold hover:bg-black/60 hover:border-black/60 hoverEffect tracking-wide flex items-center justify-center gap-1",
                className
            )}
        >
            Ver producto
        </Link>
    );
};

export default SeeProductButton;
