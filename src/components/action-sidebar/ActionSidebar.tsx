import React from "react";
import ActiveIcon from "./ActiveIcon";

export const ActionSidebar = () => {
  const teamMembers = [
    { name: "John Doe", role: "Developer" },
    { name: "Jane Smith", role: "Designer" },
    { name: "Bob Johnson", role: "Product Manager" },
    { name: "Alice Williams", role: "Developer" },
    // Add more team members as needed
  ];

  return (
    <div className="my-4  grid grid-rows-1">
      <div className=" flex flex-col items-center justify-center gap-4">
        <div className="vertical-center flex flex flex-col items-center items-center justify-center gap-4 text-center">
          {teamMembers.map((member, index) => (
            <ActiveIcon isActive={true} position={"right"}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold hover:bg-blue-700">
                {member.name[0]}
              </div>
            </ActiveIcon>
          ))}
        </div>
      </div>
    </div>
  );
};
