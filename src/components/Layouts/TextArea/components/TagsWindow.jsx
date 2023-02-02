import { useEffect } from "react";

import styles from "./styles/tagsWindow.module.scss";
import { Image } from "../../../Layouts";

function TagsWindow({ result, handleCandidate }) {
  useEffect(() => {
    openModalByOffset();
  }, []);

  return (
    <div className={styles.tagsWindow} id="tags-modal-window">
      {result.map((user) => (
        <div
          className={styles.tagCandidate}
          key={user._id}
          onClick={() => handleCandidate(user)}
        >
          <Image src={user.profileImg} />
          <p>{user.userName}</p>
        </div>
      ))}
    </div>
  );
}

export default TagsWindow;

function openModalByOffset() {
  // const modal = document.getElementById("tags-modal-window");
  // const field = document.getElementById("text-area-with-tag");
  // const node = createElement("span", { id: "text-area-cursor-pos" });
  // const selObj = window.getSelection();
  // // alert(selObj);
  // const selRange = selObj.getRangeAt(0);
}
