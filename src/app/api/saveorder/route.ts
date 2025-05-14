import { adminDB } from "../../../../firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { cartItems, email, id, totalAmount, shipping, phoneNumber } =
            await reqBody;

        const orderItem = {
            amount: totalAmount,
            shipping: shipping,
            items: cartItems || [],
            phoneNumber: phoneNumber || null, // save phone number
        };

        if (cartItems?.length) {
            const userOrderReference = adminDB
                .collection("usersInfo")
                .doc(email)
                .collection("orders")
                .doc(id);

            // Add phoneNumber to the user's document if it doesn't already exist
            const userDocRef = adminDB.collection("usersInfo").doc(email);
            const userDocSnapshot = await userDocRef.get();
            if (
                !userDocSnapshot.exists ||
                !userDocSnapshot.data()?.phoneNumber
            ) {
                await userDocRef.set({ phoneNumber }, { merge: true });
            }

            const userDoc = await userOrderReference.get();
            if (!userDoc?.exists) {
                await userOrderReference.set({ email });
            }
            await userOrderReference.set({ value: orderItem }, { merge: true });

            // Save order items into separate collection
            // const packagesCollection = adminDB
            //     .collection("packages")
            //     .doc("green-package");
            // await packagesCollection.set({ items: orderItem.items });
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
