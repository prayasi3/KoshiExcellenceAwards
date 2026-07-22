import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "border-2 border-[#C9A84C] bg-[#C9A84C] text-[#0B1F3A] hover:bg-transparent hover:text-[#C9A84C]",
  outline:
    "border-2 border-[#C9A84C] bg-transparent text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0B1F3A]",
  navy:
    "border-2 border-[#0B1F3A] bg-[#0B1F3A] text-white hover:bg-[#162D50]",
  ghost:
    "border-2 border-white/40 bg-transparent text-white hover:border-[#C9A84C] hover:text-[#C9A84C]",
};

const SIZES = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-3.5 text-base",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className = "",
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={18} aria-hidden="true" />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={18} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
