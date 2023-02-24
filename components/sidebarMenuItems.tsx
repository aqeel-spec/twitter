import React from "react";

interface SidebarMenuItemsProps {
  text: string;
  Icon: React.ElementType;
  active?: boolean;
}
export default function SidebarMenuItems({
  text,
  Icon,
  active,
}: SidebarMenuItemsProps) {
  return (
    <>
      <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-xl space-x-3">
        <Icon className="h-7" />
        <span className={`${active && "font-bold"} hidden xl:inline`}>
          {text}
        </span>
      </div>
    </>
  );
}
