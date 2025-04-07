import CategoryCard from "../../../components/CategoryCard";
import Container from "../../../components/Container";
import { getCategoriesData } from "../../../lib/getData";
import { Category } from "../../../../types";
import Image from "next/image";

const CategoriesPage = async () => {
    const categories: Category[] = await getCategoriesData();

    return (
        <Container className="py-10">
            <h1 className="text-3xl lg:text-4xl mb-10 font-semibold text-center">
                Categorías
            </h1>
            <CategoryCard categories={categories} />
        </Container>
    );
};

export default CategoriesPage;
