import { NextResponse } from "next/server";
import { z } from "zod";

const quantitySchema = z.number().min(0).max(200);

export async function POST(request: Request) {
    const { quantity } = await request.json();

    const validationResult = quantitySchema.safeParse(quantity);
    if (!validationResult.success) {
        return NextResponse.json(
            {
                message: "Ha superado el límite de cantidad permitida.",
            },
            { status: 400 }
        );
    }

    return NextResponse.json(
        { message: "Validación exitosa" },
        { status: 200 }
    );
}
