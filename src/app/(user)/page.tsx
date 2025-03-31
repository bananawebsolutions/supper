import Banner from "../../components/Banner";
import Container from "../../components/Container";
import Features from "../../components/Features";
import BestSellerProductList from "../../components/BestSellerProductList";
import OffersProductList from "../../components/OffersProductList";
import EndBanner from "../../components/EndBanner";
import Popup from "../../components/Popup";

export default function Home() {
    return (
        <Container className="py-10">
            <Popup />
            <Banner />
            <Features />
            <BestSellerProductList />
            <OffersProductList />
            <EndBanner />
        </Container>
    );
}
