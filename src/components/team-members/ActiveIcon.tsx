
const ActiveIcon = ({ isActive,children ,position}) => {
  const activeClass = 'bg-green-500';
  const inactiveClass = 'bg-gray-500';

  return (
    <div className="relative h-10 w-10">
        {children}
      <div className={`absolute bottom-0 ${position} mt-2 right-0 h-2 w-2 rounded-full ${isActive ? activeClass : inactiveClass}`} />
    </div>
  );
};

export default ActiveIcon;