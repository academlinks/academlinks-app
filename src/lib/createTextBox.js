import { fixLineBreaks } from "./";
import { nanoid } from "@reduxjs/toolkit";

export default function createTextBox({ str, id, parentClass, childClass }) {
  if (!str || typeof str !== "string") return;

  const val = fixLineBreaks(str);

  return (
    <div key={`generated-p-box${nanoid()}`} className={parentClass || ""}>
      {val.split("</br>").map((node, i) => {
        return (
          <p key={`generated-p-${nanoid()}-${i}`} className={childClass || ""}>
            {node}
          </p>
        );
      })}
    </div>
  );
}
