import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import { PostTest, PostType } from "@/type/postType";
import firebase from "firebase/app";
import "firebase/firestore";
import Moment from "react-moment";
import { HeartIcon as HeartIcFilled } from "@heroicons/react/solid";

interface PostProps {
  post: PostTest;
}

import {
  DocumentData,
  DocumentReference,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { useSession, signIn } from "next-auth/react";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Post({ post }: PostProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<DocumentData>([]);
  const [hasLiked, setHasLiked] = useState<DocumentData>([]);

  // get liked data
  useEffect(() => {
    const unsubsscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);
  const data = { username: session?.user.username };
  // like post function
  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(
          doc(db, "posts", post.id, "likes", session?.user.uid),
          data
        );
      }
    } else {
      signIn();
    }
  }
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
            <span className="text-sm sm:text-[15px] ">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post.timeStamp?.toDate()}</Moment>
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
          src={post.image}
          alt="nature images"
          className="rounded-2xl lg:mr-2 lg:w-full md:w-auto md:m-0 "
        />
        {/** icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
          <div className="flex items-center ">
            {hasLiked ? (
              <HeartIcFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-500 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm`}>
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
// interface Post {
//   id: string;
//   image: string;
//   name: string;
//   text: string;
//   timeStamp: firebase.firestore.Timestamp | undefined;
//   userImg: string;
//   username: string;
// }

// interface FirebasePostData {
//   id: string;
//   image: string;
//   name: string;
//   text: string;
//   timeStamp: {
//     seconds: number;
//     nanoseconds: number;
//   };
//   userImg: string;
//   username: string;
// }
