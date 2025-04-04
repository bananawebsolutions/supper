import { defineField, defineType } from "sanity";

export default defineType({
    name: "package",
    title: "Package",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Package Name",
            type: "string",
        }),
        defineField({
            name: "dbId",
            title: "Database Document ID",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
        }),
        defineField({
            name: "description",
            title: "Package Description",
            type: "string",
        }),
        defineField({
            name: "included",
            title: "Included",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
});
