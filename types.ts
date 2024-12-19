import { ImageAsset, Slug } from "sanity";

export interface BannerData {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    image: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
    title: string;
    subtitle: string;
    price: number;
    description: string;
}

export interface Category {
    _id: string;
    slug: Slug;
    title: string;
    _updatedAt: string;
    _createdAt: string;
    _type: string;
    image: ImageAsset;
    _rev: string;
    description: string;
}

export interface Package {
    _id: string;
    _updatedAt: string;
    _createdAt: string;
    _type: string;
    _rev: string;
    name: string;
    slug: Slug;
    price: number;
    description: string;
    included: string[];
    image: ImageAsset;
}

interface SelectedAmount {
    maturityLevel: string;
    quantity: number;
}

export interface ProductData {
    title: string;
    productType: "fruit" | "vegetable" | "other";
    productCategory: string;
    selectedAmounts: SelectedAmount[];
    image: ImageAsset;
    quantity: number;
    matureQuantity: number;
    mediumQuantity: number;
    greenQuantity: number;
    price: number;
    slug: Slug;
    _createdAt: string;
    description: string;
    _updatedAt: string;
    brand: string;
    _type: "product";
    _id: string;
    bestseller: boolean;
    seasonal: boolean;
    rowprice: number;
}

export interface UserInfo {
    id: string;
    name: string;
    email: string;
}

export interface StoreState {
    cart: {
        cartItems: ProductData[];
        userInfo: UserInfo | null;
    };
}
