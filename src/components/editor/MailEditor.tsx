import { CKEditor } from "@ckeditor/ckeditor5-react";
const ClassicEditor = window["CKSource"]['Editor'];
import "./assets/styles.css";

export const MailEditor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={"alo"}
      onReady={(editor) => {
        editor.editing.view.document.on(
          "enter",
          (evt, data) => {
            if (data.isSoft) {
              editor.execute("enter");
            } else {
              editor.execute("shiftEnter");
            }
            data.preventDefault();
            evt.stop();
            editor.editing.view.scrollToTheSelection();
          },
          { priority: "high" },
        );
      }}
      onBlur={(_event, editor) => {
        // const data = (editor as any).getData();
        // if (data !== null && data !== undefined && data !== "") {
        //     saveData(data);
        // }
      }}
    />
  );
};
