import './assets/styles.css';

export const NavigationIconWrapper = ({
  children,
  title,
  onClick,
  selected = false,
}) => {
  return (
    <div
      onClick={onClick}
      title={title}
      className={`flex h-12 w-12 items-center justify-center rounded-lg  text-black hover:bg-gray-300  ${selected ? "bg-gray-100 text-black" : "text-white"}`}
    >
      <div className="transition duration-200 hover:-translate-y-1">{children}</div>
    </div>
  );
};
