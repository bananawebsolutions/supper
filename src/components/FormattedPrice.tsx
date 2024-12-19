import { twMerge } from "tailwind-merge";

interface Props {
    amount: number;
    className?: string;
}

const FormattedPrice = ({ amount, className }: Props) => {
    const priceFormat = amount.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
    });

    return (
        <span className={twMerge("text-base font-semibold", className)}>
            {priceFormat}
        </span>
    );
};

export default FormattedPrice;
