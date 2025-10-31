export default function InputError({ errorMessage }: { errorMessage: string }) {
    return (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
    );
}
