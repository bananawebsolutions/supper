import { defineField, defineType } from "sanity";

export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Keep the title relative to the product",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        // defineField({
        //     name: "category",
        //     title: "Category",
        //     type: "array",
        //     of: [{ type: "reference", to: [{ type: "category" }] }],
        //     validation: (rule) => rule.required(),
        // }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "productCategory",
            title: "Product Category",
            type: "string",
            description: "Select the category",
            options: {
                list: [
                    { title: "Frutas y Verduras", value: "frutas-y-verduras" },
                    {
                        title: "Alimentos procesados y envasados ",
                        value: "alimentos-procesados-y-envasados",
                    },
                    {
                        title: "Granos y básicos de cocina ",
                        value: "granos-y-basicos-de-cocina",
                    },
                    { title: "Endulzantes", value: "endulzantes" },
                    {
                        title: "Bebidas",
                        value: "bebidas",
                    },
                    {
                        title: "Higiene y limpieza",
                        value: "higiene-y-limipieza",
                    },
                    {
                        title: "Paquetes",
                        value: "paquetes",
                    },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "productType",
            title: "Product Type",
            type: "string",
            description: "Select the type of product",
            options: {
                list: [
                    { title: "Fruit", value: "fruit" },
                    { title: "Vegetable", value: "vegetable" },
                    { title: "Other", value: "other" },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "brand",
            title: "Brand",
            type: "string",
            options: {
                list: [
                    { title: "Genérico", value: "generico" },
                    { title: "Mr. Lucky", value: "mrlucky" },
                    { title: "Variado", value: "variado" },
                ],
            },
            hidden: ({ parent }) => parent?.productType !== "other",
        }),
        defineField({
            name: "matureQuantity",
            type: "number",
            title: "Mature Quantity (Kg)",
            hidden: ({ parent }) => parent?.productType === "other",
        }),
        defineField({
            name: "greenQuantity",
            title: "Green Quantity (Kg)",
            type: "number",
            hidden: ({ parent }) => parent?.productType === "other",
        }),
        defineField({
            name: "rowprice",
            title: "Row Price",
            type: "number",
            validation: (rule) => rule.min(1),
        }),
        defineField({
            name: "isnew",
            title: "New Arrival",
            type: "boolean",
        }),
        defineField({
            name: "bestseller",
            title: "Best Seller",
            type: "boolean",
        }),
        defineField({
            name: "seasonal",
            title: "Seasonal",
            type: "boolean",
            hidden: ({ parent }) => parent?.productType === "other",
        }),
        defineField({
            name: "quantity",
            title: "Quantity",
            type: "number",
            hidden: ({ parent }) => parent?.productType !== "other",
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
            position: "position",
        },
    },
});
