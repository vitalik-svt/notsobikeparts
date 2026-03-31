import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

import FormControlWrapper from "../FormControlWrapper/FormControlWrapper";
import InputError from "../InputError/InputError";
import InputLabel from "../InputLabel/InputLabel";

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
        <FormControlWrapper>
            <InputLabel label={label} />
            <textarea
                id={name}
                {...register(name)}
                placeholder={placeholder?.toLowerCase()}
                rows={4}
                className={`border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ${fieldError ? `border-red-500` : ``}`}
            />

            {fieldError?.message && (
                <InputError errorMessage={fieldError?.message} />
            )}
        </FormControlWrapper>
    );
}