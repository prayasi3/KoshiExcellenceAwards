import { Plus } from "lucide-react";
import Button from "./Button";

export default function PageHeader({
    title,
    buttonText,
    onAdd,
}) {
    return (
        <div className="flex justify-between items-center mb-8">

            <div>
                <h2 className="text-3xl font-bold text-[#0B1F3A]">
                    {title}
                </h2>

                <p className="text-gray-500 mt-1">
                    Manage {title.toLowerCase()}
                </p>
            </div>

            <Button onClick={onAdd}>
                <span className="flex items-center gap-2">
                    <Plus size={18} />
                    {buttonText}
                </span>
            </Button>

        </div>
    );
}