"use server";

import { adminDB } from "@/firebaseAdmin";

interface Reservation {
    clientId: string;
}

interface HourData {
    reservations?: Reservation[];
    lastReset?: string;
}

interface Props {
    clientId: string;
    selectedHour: string;
}

export const getReservationsData = async ({
    clientId,
    selectedHour,
}: Props) => {
    const today = new Date().toLocaleDateString("es-MX").split("T")[0]; // Get current date as YYYY-MM-DD

    try {
        // Reset all hours if it's a new day
        const hoursCollectionRef = adminDB.collection("hours");
        const hoursQuerySnapshot = await hoursCollectionRef.get();

        for (const docSnap of hoursQuerySnapshot.docs) {
            const hourData = docSnap.data() as HourData;
            if (hourData.lastReset !== today) {
                await docSnap.ref.update({
                    reservations: [],
                    lastReset: today, // Reset total orders
                });
            }
        }

        // Proceed with reservation logic for the requested hour
        const hourDocRef = adminDB.collection("hours").doc(selectedHour);
        const hourDocSnap = await hourDocRef.get();

        // If the document does not exist, initialize it
        if (!hourDocSnap.exists) {
            await hourDocRef.set({
                reservations: [],
                lastReset: today,
            });
        }

        const hourData = (await hourDocRef.get()).data() as HourData;
        const reservations = hourData.reservations || [];

        // Check if the client has already reserved this hour
        const clientHasReserved = reservations.some(
            (reservation) => reservation.clientId === clientId
        );

        return {
            selectedHour,
            reservations,
            clientHasReserved,
        };
    } catch (error) {
        console.error(error);
        throw new Error(
            "Ocurrió un error al obtener los datos de las reservaciones."
        );
    }
};
