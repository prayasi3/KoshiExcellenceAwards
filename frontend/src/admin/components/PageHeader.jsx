import { Plus } from "lucide-react";
import Button from "./Button";

export default function PageHeader({
    title,
    buttonText,
    onAdd,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
}) {
    const showSearch = onSearchChange !== undefined;

    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
                <h2 className="text-3xl font-bold text-[#0B1F3A]">
                    {title}
                </h2>

                <p className="text-gray-500 mt-1">
                    Manage {title.toLowerCase()}
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {showSearch && (
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] sm:w-72"
                    />
                )}

                <Button onClick={onAdd}>
                    <span className="flex items-center gap-2">
                        <Plus size={18} />
                        {buttonText}
                    </span>
                </Button>
            </div>

        </div>
    );
}