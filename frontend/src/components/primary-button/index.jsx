
const Button = ({
  onclick,
  fill,
  width,
  round,
  outlined,
  outlineColor,
  title,
  backgroundColor
}) => {
  const baseStyles = "h-12 cursor-pointer text-center text-base inline-block px-4 py-2";
  const widthStyle = width ? `w-[${width}]` : "w-full";
  const backgroundStyle = backgroundColor
      ? `bg-[${backgroundColor}] text-white`
      : "bg-[#1B473B] text-white"
  const borderStyle = outlined
    ? `border border-[${outlineColor || '#2E4D55'}]`
    : "border-none";
  const roundStyle = "rounded-lg";

  return (
    <button
      onClick={onclick}
      className={`${baseStyles} ${widthStyle} ${backgroundStyle} ${borderStyle} ${roundStyle}`}
    >
      {title}
    </button>
  );
};

export default Button;
