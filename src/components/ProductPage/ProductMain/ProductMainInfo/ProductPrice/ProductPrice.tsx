interface Props {
    price: number;
    currency: string;
    locale: string;
}

export default function ProductPrice({ price, currency, locale }: Props) {
    const formattedPrice = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
    }).format(price);

    return <p className="mb-5 text-2xl">{formattedPrice}</p>;
}