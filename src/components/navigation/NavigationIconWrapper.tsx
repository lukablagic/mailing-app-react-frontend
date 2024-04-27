import { Tooltip } from '../tooltip/Tooltip';
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
      className={`flex h-12 w-12 items-center justify-center rounded-lg  text-black hover:bg-gray-300  ${selected ? "bg-gray-100 text-black" : "text-white"}`}
    >
      <Tooltip text={title}>
        <div className="transition duration-200 hover:-translate-y-1">{children}</div>
      </Tooltip>
    </div>
  );
};
