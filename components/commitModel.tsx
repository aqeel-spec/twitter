import React from "react";

import { useRecoilState } from "recoil";
import { modelState } from "@/atom/modelAtom";

export default function CommitModel() {
  const [open, setOpen] = useRecoilState(modelState);
  return (
    <div>
      <h1>Commit model </h1>
      {open && <h1>Model is open</h1>}
    </div>
  );
}
