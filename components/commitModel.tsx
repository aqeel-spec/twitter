import React from "react";

import { useRecoilState } from "recoil";
import { modelState, postIdState } from "@/atom/modelAtom";
import Model from "react-modal";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  DocumentData,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CommitModel() {
  const [open, setOpen] = useRecoilState(modelState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState<DocumentData>({});
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);
  // send commit to db
  async function sendCommit() {
    await addDoc(collection(db, "posts", postId, "commits"), {
      commit: input,
      name: session?.user.name,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
      username: session?.user.username,
      userId: session?.user.uid,
    });
    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  }

  return (
    <div>
      {open && (
        <Model
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-gray-200 border-2 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-9 h-9 flex items-center justify-center"
              >
                <XIcon className="h-[22px] text-gray-700" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] left-8 top-11 absolute bg-gray-300" />
              <img
                src={post?.data()?.userImg}
                alt=""
                className="rounded-full h-11 w-11 mr-4"
              />
              <div className="flex space-x-1 whitespace-nowrap items-center">
                <h1 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                  {post?.data()?.name}
                </h1>
                <span className="text-sm sm:text-[15px] ">
                  @{post?.data()?.username} -{" "}
                </span>
                <span className="text-sm sm:text-[15px] hover:underline">
                  <Moment fromNow>{post?.data()?.timeStamp?.toDate()}</Moment>
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>
            <div className="flex  p-3 space-x-3">
              <img
                className="rounded-full  h-10 w-10 cursor-pointer hover:brightness-95"
                src={session?.user?.image}
                alt="user Image"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                {/** Preview image section here */}

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex ">
                    <div className="">
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                          type="file"
                          hidden
                          ref={filePickerRef}
                          onChange={addImgToPost}
                        /> */}
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendCommit}
                    disabled={!input.trim()}
                    className="bg-blue-800 disabled:bg-blue-300 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95  opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Model>
      )}
    </div>
  );
}
