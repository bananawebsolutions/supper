"use server";

import { client } from "@/sanity/lib/client";
import { ProductData } from "../../../types";
import { groq } from "next-sanity";
import { Slug } from "sanity";

export const getProductData = async ({ slug }: { slug: Slug }) => {
    const productQuery = groq`*[_type == "product" && slug.current == $currentSlug][0] {
        ...}`;
    const currentSlug = slug.current;
    const product: ProductData = await client.fetch(productQuery, {
        currentSlug,
    });
    return product;
};
