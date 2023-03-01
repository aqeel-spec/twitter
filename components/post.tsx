"use client";
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
  getDocs,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useSession, signIn } from "next-auth/react";
import { db, storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRecoilState } from "recoil";
import { modelState } from "../atom/modelAtom";
import {
  FirebaseStorage,
  StorageReference,
  deleteObject,
  getStorage,
} from "firebase/storage";

export default function Post({ post }: PostProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<DocumentData>([]);
  const [hasLiked, setHasLiked] = useState<DocumentData>([]);
  // session?.user.uid === post.id;
  const [idsData, setIdsData] = useState<any>([]);
  const [open, setOpen] = useRecoilState(modelState);
  // get data from database

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
  ////////////// DALETE POST /////////////////
  (async () => {
    const docRef = doc(db, "posts", post.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const idData = docSnap.data();
      setIdsData(idData);
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })();
  // delete post for admin
  async function deletePost() {
    if (window.confirm("Are U sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", post.id));
      //  *** ___ if image exists then delete it ___ ***
      // if (post.image) {
      //   // const storage2: FirebaseStorage = getStorage();
      //   await deleteObject(ref(storage, `posts/${post.id}/image`));
      //   console.log("image id :", post.id);
      //   //await deleteObject(ref(storage2, `posts/${post.id}/image`));
      // }
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
        {post.image && (
          <img
            src={post.image}
            alt="nature images"
            className="rounded-2xl lg:mr-2 lg:w-full md:w-auto md:m-0 "
          />
        )}
        {/** icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon
            onClick={() => setOpen(!open)}
            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
          />
          {/* {idsData.map((idData: any) => ( */}
          {session?.user.uid === idsData.id && (
            <div className="">
              <TrashIcon
                onClick={deletePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100"
              />
            </div>
          )}
          {/* ))} */}
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
