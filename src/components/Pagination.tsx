"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    page: number;
    totalProducts: number;
    productsPerPage: number;
}

const Pagination = ({ page, totalProducts, productsPerPage }: Props) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const router = useRouter();

    return (
        <div className="flex items-center justify-center gap-3 py-10">
            <button
                onClick={() => {
                    params.set("page", (page - 1).toString());
                    router.replace(`/productos?${params.toString()}`);
                }}
                disabled={page <= 1}
                className="bg-gray-100 disabled:cursor-not-allowed text-gray-700 px-3 py-2 rounded-full hover:bg-gray-200 hoverEffect flex items-center gap-x-1"
            >
                <FaArrowLeft className="text-lg" />{" "}
                <span className="text-xs">Anterior</span>
            </button>
            <button
                onClick={() => {
                    params.set("page", (page + 1).toString());
                    router.replace(`/productos?${params.toString()}`);
                }}
                className="bg-gray-100 disabled:cursor-not-allowed text-gray-700 px-3 py-2 rounded-full hover:bg-gray-200 hoverEffect flex items-center gap-x-1"
                disabled={page >= totalProducts / productsPerPage}
            >
                <FaArrowRight className="text-lg" />
                <span className="text-xs">Siguiente</span>
            </button>
        </div>
    );
};

export default Pagination;
