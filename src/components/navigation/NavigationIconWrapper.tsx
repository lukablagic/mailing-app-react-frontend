export const NavigationIconWrapper = ({ children, title ,onClick}) => {
  return (
    <div
      onClick={onClick}
      title={title}
      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-black hover:bg-gray-300 "
    >
      {children}
    </div>
  );
};
