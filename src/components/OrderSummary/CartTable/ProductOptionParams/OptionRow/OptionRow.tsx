export default function OptionRow({ label, value }: { label?: string; value: string }) {
    return (
        <p className="flex gap-1 justify-between md:justify-start">
            {label && <span className="font-bold">{label}:</span>}
            <span>{value}</span>
        </p>
    );
}