import { auth } from "../../../../auth";
import CartContainer from "../../../components/CartContainer";
import Container from "../../../components/Container";

const CartPage = async () => {
    const session = await auth();

    return (
        <Container className="py-10">
            <CartContainer session={session ?? undefined} />
        </Container>
    );
};

export default CartPage;
