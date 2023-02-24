import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { HomeProps } from "@/type/postType";
import { NewsData } from "@/type/postType";
import News from "./news";
import { RandomUser } from "@/type/postType";

// interface WidgetProps {
//   newsData: NewsData["articles"]; // We only need the "articles" array from the NewsData object
// }
interface WidgetProps {
  newsData: NewsData["articles"];
  randomUserData: RandomUser["results"];
}

export default function Widget({ newsData, randomUserData }: WidgetProps) {
  const [articleNum, setArticleNum] = useState<number>(3);
  const [randomUserNum, setRandomUserNum] = useState<number>(3);
  const data = randomUserData.results;

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5 ">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
        <div className="flex items-center p-3 rounded-full bg-red-400 relative">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input
            className="absolute  inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-ray-700 space-y-3 bg-gray-100 rounded-xl pt-2 lg:w-[90%] md:w-[80%] sm:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {newsData.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      <div className="text-gray-700 sticky top-16 space-y-3 bg-gray-100 pt-2 rounded-xl lg:w-[90%] md:w-[80%] sm:w-[75%]  ">
        <h4 className="font-bold text-xl px-4 ">Who to follow</h4>
        {data.slice(0, randomUserNum).map((rUser) => (
          <div
            key={rUser.login.username}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            <img
              className="rounded-full"
              width="40"
              src={rUser.picture.thumbnail}
              alt="user thumbnail images"
            />
            <div className="truncate ml-4">
              <h4 className="font-bold hover:underline  leading-5 text-[14px] truncate">
                {rUser.login.username}
              </h4>
              <h5 className="text-[13px] text-gray-500 truncate">
                {rUser.name.first + " " + rUser.name.last}
              </h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold ">
              Follow
            </button>
          </div>
        ))}
        <button
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400 "
        >
          Show more
        </button>
      </div>
    </div>
  );
}
