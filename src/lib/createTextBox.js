import { fixLineBreaks, generateLinks } from "lib";
import { nanoid } from "@reduxjs/toolkit";

export default function createTextBox({ str, id, parentClass, childClass }) {
  if (!str || typeof str !== "string") return;

  let val = fixLineBreaks(str);

  return (
    <div key={`generated-p-box${nanoid()}`} className={parentClass || ""}>
      {val.split("</br>").map((node, i) => {
        return (
          <p key={`generated-p-${nanoid()}-${i}`} className={childClass || ""}>
            {generateLinks(node)}
          </p>
        );
      })}
    </div>
  );
}
