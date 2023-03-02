import React from "react";

type Commit = {
  commit: string;
  name: string;
  timestamp: any;
  userImg: string;
};
type CommitProps = {
  commit: Commit;
  id: string;
};
function Commits({ commit, id }: CommitProps) {
  return <div>{commit.commit}</div>;
}

export default Commits;
