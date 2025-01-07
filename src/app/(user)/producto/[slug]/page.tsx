import Container from "@/components/Container";
import { groq } from "next-sanity";
import { ProductData } from "../../../../../types";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "@/components/ProductCard";
import FormattedPrice from "@/components/FormattedPrice";
import AddToCartButton from "@/components/AddToCartButton";
import MaturitySelect from "@/components/MaturitySelect";

interface Props {
    params: {
        slug: string;
    };
}

const SingleProductPage = async ({ params }: Props) => {
    const { slug } = await Promise.resolve(params);
    const productQuery = groq`*[_type == "product" && slug.current == $slug][0] {
    ...}`;

    const product: ProductData = await client.fetch(productQuery, { slug });
    const bestSellerProductPageQuery = groq`*[_type == "product" && slug.current != $slug && bestseller == true] {...} | order(_createdAt asc)[0...4]`;
    const bestSellerData: ProductData[] = await client.fetch(
        bestSellerProductPageQuery,
        { slug }
    );

    return (
        <Container className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full p-4">
                <div className="h-full xl:col-span-2 bg-gray-100 rounded-2xl border-[1px] border-gray-300/50 max-h-[450px]">
                    <Image
                        src={urlFor(product?.image).url()}
                        alt={product?.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="w-full xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            {product?.title}
                        </h2>
                        <div className="flex items-center gap-3">
                            {product?.rowprice ? (
                                <>
                                    <p className="text-lg font-normal text-gray-500 line-through">
                                        <FormattedPrice
                                            amount={
                                                product?.productType !== "p"
                                                    ? product?.kgPrice
                                                    : product?.pPrice
                                            }
                                        />
                                    </p>
                                    <FormattedPrice
                                        amount={
                                            product?.productType !== "p"
                                                ? product?.kgPrice *
                                                  (1 - product?.rowprice)
                                                : product?.pPrice *
                                                  (1 - product?.rowprice)
                                        }
                                        className="text-lg font-bold text-green-900"
                                    />
                                    {product?.productType !== "p" && (
                                        <span className="text-sm font-medium">
                                            <i>/Kg</i>
                                        </span>
                                    )}
                                    <p>
                                        Ahorraste en este producto{" "}
                                        <span className="bg-green-600 font-semibold text-sm text-white rounded-full px-3 py-1">
                                            {product?.rowprice * 100}%
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <FormattedPrice
                                        amount={
                                            product?.productType !== "p"
                                                ? product?.kgPrice
                                                : product?.pPrice
                                        }
                                        className="text-lg font-bold text-green-900"
                                    />
                                    {product?.productType !== "p" && (
                                        <span className="text-sm font-medium">
                                            <i>/Kg</i>
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                        <p className="text-black/60 text-sm tracking-wide">
                            {product?.description}
                        </p>
                        {product?.productType === "m-kg" ||
                            (product?.productType === "m-kg-p" && (
                                <MaturitySelect item={product} />
                            ))}
                        {product?.productType !== "p" ? null : (
                            <AddToCartButton
                                item={product}
                                className="rounded-full py-3"
                            />
                        )}
                        <p className="font-normal text-sm">
                            <span className="font-base font-medium">
                                Categoría:{" "}
                            </span>
                            {product?.productCategory}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl md:text-2xl py-5 font-medium">
                    Otros productos que podrían interesarte
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {bestSellerData?.map((item) => (
                        <ProductCard key={item?._id} item={item} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default SingleProductPage;
