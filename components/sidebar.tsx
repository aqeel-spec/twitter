import React from "react";
import SidebarMenuItems from "./sidebarMenuItems";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Logo from "../public/twitter_logo.svg";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      {/**twiter icons as a logo from react icons*/}
      <div className="hoverEffect  p-0 flex hover:bg-blue-100 xl:px-1">
        <Image src={Logo} height={30} width={30} alt="Twitter Logo" />
      </div>
      {/** sideBar menu items  */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItems text="Home" Icon={HomeIcon} active />
        <SidebarMenuItems text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItems text="Notification" Icon={BellIcon} />
        <SidebarMenuItems text="Messages" Icon={InboxIcon} />
        <SidebarMenuItems text="Bookmark" Icon={BookmarkIcon} />
        <SidebarMenuItems text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItems text="Profile" Icon={UserIcon} />
        <SidebarMenuItems text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      {/** tweet button  */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>
      {/** mini profile  */}
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          className="rounded-full  h-10 w-10 xl:mr-2"
          src="https://pbs.twimg.com/profile_images/1572524799271788544/BOVrbu5t_400x400.jpg"
          alt="profile image"
        />
        <div className="leading-5 hidden xl:inline ">
          <h4 className="font-bold">Aqeel Shahzad</h4>
          <p className="text-gray-500">@AqeelSh1215</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
}
