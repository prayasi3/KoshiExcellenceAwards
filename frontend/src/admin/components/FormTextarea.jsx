export default function FormTextarea({
    label,
    error,
    rows = 4,
    ...props
}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-2 font-medium">
                    {label}
                </label>
            )}

            <textarea
                rows={rows}
                {...props}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}