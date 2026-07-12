export default function EmptyState({
    title,
    description,
    buttonText,
    onClick,
}) {
    return (
        <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-[#0B1F3A]">
                {title}
            </h3>

            <p className="text-gray-500 mt-2">
                {description}
            </p>

            <button
                onClick={onClick}
                className="mt-5 bg-[#C9A84C] text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
            >
                {buttonText}
            </button>
        </div>
    );
}