import { adminDB } from "../../../../firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { cartItems, email, id, totalAmount, shipping } = await reqBody;

        const orderItem = {
            amount: totalAmount,
            shipping: shipping,
            items: cartItems || [],
        };

        if (cartItems?.length) {
            const userOrderReference = adminDB
                .collection("usersInfo")
                .doc(email)
                .collection("orders")
                .doc(id);

            const userDoc = await userOrderReference.get();
            if (!userDoc?.exists) {
                await userOrderReference.set({ email });
            }
            await userOrderReference.set({ value: orderItem }, { merge: true });

            // Save order items into separate collection
            const packagesCollection = adminDB
                .collection("packages")
                .doc("green-package");
            await packagesCollection.set({ items: orderItem.items });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Order saved successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error,
        });
    }
};
