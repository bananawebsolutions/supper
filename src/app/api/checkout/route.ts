import { ProductData } from "../../../../types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const predefinedHours = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
];

export const POST = async (req: NextRequest) => {
    const allowedZipCodes = [
        "52930",
        "52934",
        "52936",
        "52937",
        "52938",
        "52989",
        "54578",
    ];
    const today = new Date().toLocaleDateString("es-MX").split("T")[0];

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing Stripe Secret Key");
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    try {
        const reqBody = await req.json();
        const {
            items,
            email,
            shipping,
            zipCode,
            shippingMethod,
            pickupLocation,
            selectedHour,
            clientId,
        } = await reqBody;

        if (!zipCode && !pickupLocation) {
            return NextResponse.json(
                {
                    error: "Hubo un problema con el proceso de checkout, por favor intenta de nuevo.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            shippingMethod === "domicilio" &&
            !allowedZipCodes.includes(zipCode)
        ) {
            return NextResponse.json(
                {
                    error: "Lo sentimos 😢, el código postal que ha ingresado está fuera de nuestro alcance. Contacta a servicio a cliente para revisar tu caso particular.",
                },
                { status: 400 }
            );
        }

        if (shippingMethod === "domicilio") {
            if (!selectedHour || !clientId) {
                return NextResponse.json(
                    {
                        message:
                            "Se requiere un id de cliente y un horario para la entrega a domicilio.",
                    },
                    { status: 400 }
                );
            }

            if (!predefinedHours.includes(selectedHour)) {
                return NextResponse.json(
                    { message: "Se ha seleccionado una hora inválida." },
                    { status: 400 }
                );
            }
        }

        const quantitySelect = (item: ProductData) => {
            if (item.productType === "p") {
                return {
                    quantity: item.quantity || 0,
                    price:
                        item.pPrice *
                        (item.quantity || 0) *
                        (1 - item?.rowprice || 1),
                };
                // } else if (item.productType === "m-kg-p") {
                //     const totalQuantity =
                //         (item.matureQuantity || 0) +
                //         (item.greenQuantity || 0) +
                //         (item.quantity || 0);
                //     const totalPrice =
                //         (item.kgPrice *
                //             (item.matureQuantity || 0 + item.greenQuantity || 0) +
                //             item.pPrice * (item.quantity || 0)) *
                //         (1 - item?.rowprice || 1);
                //     return {
                //         quantity: totalQuantity,
                //         price: totalPrice,
                //     };
                // } else if (item.productType === "kg-p") {
                //     const totalQuantity =
                //         (item.quantity || 0) + (item.kgQuantity || 0);
                //     const totalPrice =
                //         (item.kgPrice * (item.kgQuantity || 0) +
                //             item.pPrice * (item.quantity || 0)) *
                //         (1 - item?.rowprice || 1);
                //     return {
                //         quantity: totalQuantity,
                //         price: totalPrice,
                //     };
            } else if (item.productType === "100g") {
                return {
                    quantity: item.kgQuantity || 0,
                    price:
                        item.gramsPrice *
                        10 *
                        (item.kgQuantity || 0) *
                        (1 - item?.rowprice || 1),
                };
            } else if (item.productType === "kg") {
                return {
                    quantity: item.kgQuantity || 0,
                    price:
                        item.kgPrice *
                        (item.kgQuantity || 0) *
                        (1 - item?.rowprice || 1),
                };
            } else if (item.productType === "m-kg") {
                const totalQuantity =
                    (item.matureQuantity || 0) + (item.greenQuantity || 0);
                const totalPrice =
                    item.kgPrice * totalQuantity * (1 - item?.rowprice || 1);
                return {
                    quantity: totalQuantity,
                    price: totalPrice,
                };
            } else {
                return { quantity: 0, price: 0 };
            }
        };

        const extractingItems = await items?.map((item: ProductData) => {
            const { quantity, price } = quantitySelect(item);
            return {
                quantity: quantity,
                price_data: {
                    currency: "mxn",
                    unit_amount: Math.round(
                        (price * 100) / (quantity ? quantity : 1)
                    ),
                    product_data: {
                        name: item?.title,
                        description: item?.description,
                    },
                },
            };
        });

        const origin = req.headers.get("origin");

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: extractingItems,
            mode: "payment",
            locale: "es",
            success_url: `${origin}/success/?session_id={CHECKOUT_SESSION_ID}&client_id=${clientId}&shipping_method=${shippingMethod}&selected_hour=${selectedHour}`,
            cancel_url: `${origin}/cancel/?cancelled=true`,
            metadata: {
                email,
                pickupLocation,
                shippingMethod,
                date: today,
                schedule: shippingMethod === "domicilio" ? selectedHour : null,
            },
            shipping_address_collection: {
                allowed_countries: shippingMethod === "domicilio" ? ["MX"] : [],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: Math.round(shipping * 100),
                            currency: "mxn",
                        },
                        display_name: "Costo de envío",
                    },
                },
            ],
        });

        return NextResponse.json({ url: session?.url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};
