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

// athentication sesssion
import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/**twiter icons as a logo from react icons*/}
      <div className="hoverEffect  p-0 flex hover:bg-blue-100 xl:px-1">
        <Image src={Logo} height={30} width={30} alt="Twitter Logo" />
      </div>
      {/** sideBar menu items  */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItems text="Home" Icon={HomeIcon} active />
        <SidebarMenuItems text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItems text="Notification" Icon={BellIcon} />
            <SidebarMenuItems text="Messages" Icon={InboxIcon} />
            <SidebarMenuItems text="Bookmark" Icon={BookmarkIcon} />
            <SidebarMenuItems text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItems text="Profile" Icon={UserIcon} />
            <SidebarMenuItems text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {/** tweet button  */}
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>
          {/** mini profile  */}
          <div className="hoverEffect  text-gray-700 flex items-center justify-center xl:justify-start mt-auto ">
            {session.user.image && (
              <img
                onClick={() => signOut()}
                className="rounded-full  h-10 w-10 xl:mr-2"
                src={session.user?.image}
                alt="profile image"
              />
            )}
            <div className="leading-5 hidden xl:inline ">
              <h4 className="font-bold">{session.user?.name}</h4>
              <p className="text-gray-500">@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-4 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-blue-400 text-white rounded-full w-36 h-10 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
