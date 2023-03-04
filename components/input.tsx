"use client";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { ChangeEvent, useRef, useState } from "react";
import { addDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { AdvancedLoader } from "./icons/loaderIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { GoogleProfile } from "next-auth/providers/google";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // emogi popup
  const [showEmoji, setShowEmogi] = useState(false);

  // file picker on post
  const filePickerRef = useRef<HTMLInputElement>(null);
  const filePickerHandle = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  // send post function
  const sendPost = async () => {
    // loader
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user.uid,
      text: input,
      userImg: session?.user.image,
      timeStamp: serverTimestamp(),
      name: session?.user.name,
      username: session?.user.username,
    });
    if (selectedFile) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });

      // console.log("downloadUrl: ", downloadUrl);
    }
    // const imageRef = ref(storage, `posts/${docRef.id}/image`);
    // if (selectedFile) {
    //   await uploadString(imageRef, selectedFile, "data_url").then(async () => {
    //     const downloadUrl = await getDownloadURL(imageRef);
    //   });
    // }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };
  const addImgToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result as string);
    };
    //  reader.onload = (readerEvent) => {
    //    console.log(readerEvent.target?.result);
    //  };
  };
  const addEmoji = (emoji: any) => {
    const sym = emoji.unified.split("-");
    const codeArray = sym.map((code: any) => parseInt(`0x${code}`, 16));
    const emojiString = String.fromCodePoint(...codeArray);
    setInput(input + emojiString);
  };
  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          {session.user.image && (
            <img
              onClick={() => signOut()}
              className="rounded-full  h-10 w-10 cursor-pointer hover:brightness-95"
              src={session?.user.image}
              alt="user Image"
            />
          )}
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows={2}
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {/** Preview image section here */}

            {selectedFile && (
              <div className="relative ">
                {!loading && (
                  <XIcon
                    className={`h-7 border border-white cursor-pointer left-0 ml-[-16px] text-gray-400  absolute  rounded-full  hover:text-red-300 mt-[-15px]`}
                    onClick={() => setSelectedFile(null)}
                  />
                )}
                <div
                  className={`absolute ${
                    !loading && "hidden"
                  } xl:mt-[-165px] mt-[-300px] md:mt-[-180px] sm:mt-[-20px] pl-[38%] xl:pl-[50%] z-50 `}
                >
                  <AdvancedLoader />
                </div>
                <img
                  src={selectedFile}
                  className={`${
                    loading &&
                    " animate-pulse ease-in filter blur-sm backdrop-filter backdrop-opacity-80"
                  }`}
                />
              </div>
            )}
            {!loading && (
              <>
                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex ">
                    <div className="" onClick={filePickerHandle}>
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImgToPost}
                      />
                    </div>
                    {/** Emoji section here */}
                    <div className=" ">
                      <EmojiHappyIcon
                        onClick={() => setShowEmogi(!showEmoji)}
                        className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
                      />
                      <div className="absolute z-50 ">
                        {showEmoji && (
                          <div className="">
                            <Picker
                              size={50}
                              data={data}
                              previewPosition={"none"}
                              skinTonePosition="none"
                              emojiSize={18}
                              emojiButtonSize={28}
                              // maxFrequency={0}
                              maxFrequentRows={4}
                              onEmojiSelect={addEmoji}
                              navPosition={"bottom"}
                              perLine={7}
                              previewEmoji={"point_up"}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-blue-800 disabled:bg-blue-300 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95  opacity-50"
                  >
                    Tweet
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
