import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldErrors<T>;
    placeholder?: string;
}

export default function Textarea<T extends FieldValues>({ label, name, register, errors, placeholder }: Props<T>) {

    const fieldError = errors ? (errors as Record<string, FieldError | undefined>)[name as string] : undefined;
    
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium">{label}</label>
            <textarea
                id={name}
                {...register(name)}
                placeholder={placeholder}
                rows={4}
                className={`border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${fieldError ? 'border-red-500' : ''}`}
            />

            {fieldError?.message && (
                <p className="text-red-500 text-sm mt-1">{fieldError?.message}</p>
            )}
        </div>
    );
}