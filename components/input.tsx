import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        className="rounded-full  h-10 w-10 cursor-pointer hover:brightness-95"
        src="https://pbs.twimg.com/profile_images/1572524799271788544/BOVrbu5t_400x400.jpg"
        alt="user Image"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex ">
            <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95  opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
