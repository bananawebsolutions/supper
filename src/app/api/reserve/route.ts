import { adminDB } from "../../../../firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { clientId, selectedHour } = await reqBody;

        // Proceed with reservation logic for the requested hour
        const hourDocRef = adminDB.collection("hours").doc(selectedHour);

        // Update the hour document with the new reservation
        await hourDocRef.update({
            reservations: FieldValue.arrayUnion({ clientId }),
        });

        return NextResponse.json(
            { message: "Reservación exitosa." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: error,
            },
            { status: 500 }
        );
    }
};
