import Container from "@/components/Container";
import PackageCard from "@/components/PackageCard";
import { getPackagesData } from "@/lib/getData";
import { Package } from "@/types";

const PackagesPage = async () => {
    const packages: Package[] = await getPackagesData();
    return (
        <Container className="py-10 min-h-[70vh]">
            <h1 className="text-3xl lg:text-4xl mb-10 font-semibold text-center">
                Paquetes
            </h1>
            <PackageCard packages={packages} />
        </Container>
    );
};

export default PackagesPage;
