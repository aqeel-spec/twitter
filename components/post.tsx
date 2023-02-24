import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";

type Post = {
  id: string | number;
  name: string;
  userName: string;
  userImg: string;
  img: string;
  text: string;
  timestamp: string;
};
type PostProps = {
  post: Post;
};
export default function Post({ post }: PostProps) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 ">
      {/** user Image */}
      <img src={post.userImg} alt="" className="rounded-full h-11 w-11 mr-4" />
      {/** right side  */}
      <div className="lg:w-full sm:w-[90%] pr-20 xl:pr-0 md:w-[75%] ">
        {/** Header */}
        <div className="flex items-center justify-between ">
          {/** post user info */}
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h1 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h1>
            <span className="text-sm sm:text-[15px] ">@{post.userName} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
            </span>
          </div>
          {/** dot icon */}
          <DotsHorizontalIcon className="h-10 p-2 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500" />
        </div>
        {/** post text */}
        <p className="text-gray-800  text-[15px] sm:text-[16px] mb-2 ">
          {post.text}
        </p>
        {/** post Image */}
        <img
          src={post.img}
          alt="nature images"
          className="rounded-2xl lg:mr-2 lg:w-full md:w-auto md:m-0 "
        />
        {/** icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
          <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}