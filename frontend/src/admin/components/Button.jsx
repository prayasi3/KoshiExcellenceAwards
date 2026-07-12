export default function Button({
    children,
    onClick,
    type="button",
    variant="primary"
}) {

    const styles = {
        primary:
            "bg-primary-navy text-white hover:bg-secondary-navy",

        secondary:
            "border border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white",

        danger:
            "bg-red-600 text-white hover:bg-red-700",

        success:
            "bg-green-600 text-white hover:bg-green-700",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-semibold transition ${styles[variant]}`}
        >
            {children}
        </button>
    );
}