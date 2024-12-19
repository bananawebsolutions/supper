import { type SchemaTypeDefinition } from "sanity";
import banner from "../schemas/banner";
import products from "../schemas/products";
import category from "../schemas/category";
import packages from "../schemas/packages";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [banner, products, category, packages],
};
