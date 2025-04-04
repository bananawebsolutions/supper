"use server";

import { adminDB } from "../../../firebaseAdmin";

export const getPackagesData = async (packageId: string) => {
    try {
        const packagesCollectionRef = adminDB
            .collection("packages")
            .doc(packageId);
        const packagesQuerySnapshot = await packagesCollectionRef.get();

        if (!packagesQuerySnapshot.exists) {
            throw new Error("Package not found");
        }

        const packageData = packagesQuerySnapshot.data();
        return packageData;
    } catch (error) {
        console.error("Error fetching package data:", error);
        throw new Error("Failed to fetch package data");
    }
};
