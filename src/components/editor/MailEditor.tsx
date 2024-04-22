import { CKEditor } from "@ckeditor/ckeditor5-react";
const ClassicEditor = window["CKSource"]['Editor'];
import "./assets/styles.css";
import { useEffect, useState } from "react";

interface MailEditorProps {
  html: string;
  saveData: (data: string) => void;
}

export const MailEditor = ({ html, saveData }: MailEditorProps) => {

  const [editorData, setEditorData] = useState(' ');

  useEffect(() => {
    if (editorData !== null && editorData !== '') {
      setEditorData(html);
    }
  }, []);

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
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
        const data = (editor as any).getData();
        console.log(data)
        if (data !== null && data !== undefined && data !== "") {
          saveData(data);
        }
      }}
    />
  );
};
