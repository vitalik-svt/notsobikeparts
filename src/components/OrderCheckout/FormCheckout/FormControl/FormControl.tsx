import { FieldErrors, FieldValues, FieldError, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldErrors<T>;
    type?: string;
    placeholder?: string;
    className?: string;
}

export default function FormControl<T extends FieldValues>({ label, name, errors, register, type = "text", className = "", placeholder }: Props<T>) {
    const inputBase = 'w-full px-3 py-2 rounded border-2 transition-colors';
    const fieldError = errors ? (errors as Record<string, FieldError | undefined>)[name as string] : undefined;

    return (
        <div className="lowercase">
            <label className="block font-medium mb-1">{label}</label>
            <input
                {...register(name)}
                type={type}
                className={`${inputBase} ${fieldError ? 'border-red-500' : ''} ${className}`}
                aria-invalid={!!fieldError}
                placeholder={placeholder?.toLowerCase()}
            />
            {fieldError?.message && <p className="mt-1 text-xs  text-red-500">{fieldError.message}</p>}
        </div>
    );
}
