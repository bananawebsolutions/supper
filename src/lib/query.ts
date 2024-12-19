import { groq } from "next-sanity";

const bannerQuery = groq`*[_type == "banner"] {
    ...
}|order(_createdAt asc)`;

const productsQuery = groq`*[_type == "product"] {
    ...
}|order(_createdAt asc)`;

const bestSellerQuery = groq`*[_type == "product" && bestseller == true] {
    ...
}|order(_createdAt asc) [0...4]`;

const offersQuery = groq`*[_type == "product" && rowprice > 0] {
    ...
}|order(_createdAt asc) [0...4]`;

const categoriesQuery = groq`*[_type == "category"] {
...
}|order(_createdAt asc)`;

const packagesQuery = groq`*[_type == "package"] {
...
}`;

export {
    bannerQuery,
    productsQuery,
    bestSellerQuery,
    offersQuery,
    categoriesQuery,
    packagesQuery,
};
