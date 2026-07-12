export default function StatusBadge({ status }) {

    const styles = {

        active:
            "bg-green-100 text-green-700",

        inactive:
            "bg-red-100 text-red-700",

        upcoming:
            "bg-yellow-100 text-yellow-700",

        completed:
            "bg-blue-100 text-blue-700",

    };

    return (

        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>

    );

}