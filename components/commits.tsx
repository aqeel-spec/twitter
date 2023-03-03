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
  id: any;
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
import { modelState, postIdState } from "../atom/modelAtom";
import { useRouter } from "next/router";
import {
  FirebaseStorage,
  StorageReference,
  deleteObject,
  getStorage,
} from "firebase/storage";
type Commit = {
  commit: string;
  name: string;
  timestamp: any;
  userImg: string;
  username: string;
  userId: string;
};
type CommitProps = {
  commit: Commit;
  commitId: string;
  originalPostId: string;
};
export default function Commits({
  commit,
  commitId,
  originalPostId,
}: CommitProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<DocumentData>([]);
  const [hasLiked, setHasLiked] = useState<DocumentData | boolean>([]);
  // session?.user.uid === post.id;
  const [idsData, setIdsData] = useState<any>([]);
  const [open, setOpen] = useRecoilState(modelState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  // get data from database

  useEffect(() => {
    const unsubsscribe = onSnapshot(
      collection(db, "posts", originalPostId, "commits", commitId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId, commitId]);
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like: any) => like.id === session?.user.uid) !== -1
      ),
    [likes]
  );
  const data = { username: session?.user.username };
  // like commit function
  async function likeCommit() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "commits",
            commitId,
            "likes",
            `${session?.user.uid}`
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "commits",
            commitId,
            "likes",
            `${session?.user.uid}`
          ),
          data
        );
      }
    } else {
      signIn();
    }
  }
  ////////////// DALETE POST /////////////////
  (async () => {
    const docRef = doc(db, "posts", originalPostId);
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
  async function deleteCommit() {
    if (window.confirm("Are U sure you want to delete this commit?")) {
      await deleteDoc(doc(db, "posts", originalPostId, "commits", commitId));
    }
  }
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      {/** user Image */}
      <img
        src={commit.userImg}
        alt=""
        className="rounded-full h-11 w-11 mr-4"
      />
      {/** right side  */}
      <div className="lg:w-full sm:w-[90%] pr-20 xl:pr-0 md:w-[75%] flex-1">
        {/** Header */}
        <div className="flex items-center justify-between ">
          {/** post user info */}
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h1 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {commit.name}
            </h1>
            <span className="text-sm sm:text-[15px] ">
              @{commit.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{commit.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/** dot icon */}
          <DotsHorizontalIcon className="h-10 p-2 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500" />
        </div>
        {/** post text */}
        <p className="text-gray-800  text-[15px] sm:text-[16px] mb-2 ">
          {commit.commit}
        </p>
        {/** icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none ">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(originalPostId);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
          </div>
          {/* {idsData.map((idData: any) => ( */}
          {session?.user.uid === commit.userId && (
            <div className="">
              <TrashIcon
                onClick={deleteCommit}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100"
              />
            </div>
          )}
          {/* ))} */}
          <div className="flex items-center ">
            {hasLiked ? (
              <HeartIcFilled
                onClick={likeCommit}
                className="h-9 w-9 hoverEffect p-2 text-red-500 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likeCommit}
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
