import { client } from "../sanity/lib/client";
import {
    bannerQuery,
    bestSellerQuery,
    categoriesQuery,
    offersQuery,
    packagesQuery,
    productsQuery,
} from "./query";

export const revalidate = 0;

const getBannersData = async () => {
    const bannersData = await client.fetch(bannerQuery);
    return bannersData;
};

const getProductsData = async () => {
    const productsData = await client.fetch(productsQuery);
    return productsData;
};

const getBestSellersData = async () => {
    const bestSellersData = await client.fetch(bestSellerQuery);
    return bestSellersData;
};

const getOffersData = async () => {
    const offersData = await client.fetch(offersQuery);
    return offersData;
};

const getCategoriesData = async () => {
    const categoriesData = await client.fetch(categoriesQuery);
    return categoriesData;
};

const getPackagesData = async () => {
    const packagesData = await client.fetch(packagesQuery);
    return packagesData;
};

export {
    getBannersData,
    getProductsData,
    getBestSellersData,
    getOffersData,
    getCategoriesData,
    getPackagesData,
};
