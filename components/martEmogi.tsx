// // // @ts-nocheck
// // import React, { useEffect, useRef } from "react";
// // import { Picker } from "emoji-mart";

// // export default function EmojiPicker(props) {
// //   const ref = useRef(null);
// //   const instance = useRef(null);

// //   if (instance.current) {
// //     instance.current.update(props);
// //   }

// //   useEffect(() => {
// //     instance.current = new Picker({ ...props, ref });

// //     return () => {
// //       instance.current = null;
// //     };
// //   }, []);

// //   return React.createElement("div", { ref });
// // }
// // import data from "@emoji-mart/data";
// // import Picker from "@emoji-mart/react";
// // import { useState } from "react";

// // export default function Emogi() {
// //   const [emogi, setEmogi] = useState(null);
// //   console.log("emogidATA", emogi);
// //   //   let counter = 0;
// //   //   console.log("couter", counter);

// //   return (
// //     <>
// //       <Picker data={data} onEmojiSelect={setEmogi} />
// //       <div className="">
// //         <div className="">{emogi.native}</div>
// //         <div className="">{emogi.name}</div>
// //       </div>
// //     </>
// //   );
// // }
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { useState } from "react";

// export default function Emoji() {
//   const [show, setShow] = useState(false);
//   const [text, setText] = useState("");
//   // const addEmoji = (e: { unified: string }) => {
//   //   const sym = e.unified.split("_");
//   //   const codeArray: any[] = [];
//   //   sym.forEach((ele: string) => codeArray.push("0x" + ele));
//   //   let emoji = String.fromCodePoint(...codeArray);
//   //   setValue(value + emoji);
//   // };
//   // console.log(value);
//   const addEmoji = (emoji: any) => {
//     const sym = emoji.unified.split("-");
//     const codeArray = sym.map((code: any) => parseInt(`0x${code}`, 16));
//     const emojiString = String.fromCodePoint(...codeArray);
//     setText(text + emojiString);
//   };

//   return (
//     <>
//       <div className="">
//         <textarea
//           placeholder="wite your text"
//           cols={30}
//           rows={2}
//           onChange={(e) => setText(e.target.value)}
//         ></textarea>
//         <span onClick={() => setShow(!show)}>Open</span>

//         {show && (
//           <Picker
//             data={data}
//             emojiSize={20}
//             emojiButtonSize={28}
//             maxFrequency={0}
//             onEmojiSelect={addEmoji}
//           />
//         )}
//         <div className="">{text}</div>
//       </div>
//     </>
//   );
// }
