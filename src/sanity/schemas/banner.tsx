import { defineField, defineType } from "sanity";

export default defineType({
    type: "document",
    name: "banner",
    title: "Banner",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
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
            description: "Banner image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
            preview: {
                select: {
                    imageUrl: "asset.url",
                    title: "caption",
                },
            },
        }),
    ],
});
