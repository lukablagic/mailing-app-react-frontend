import React, { useContext, useEffect, useState } from "react";
import { getAttachmentData, getAttachments } from "../../api/Mail";
import { AuthContext } from "../common/AuthContext";
import { Button } from "react-bootstrap";

const Attachments = ({ emails, selectedEmail }) => {
    const { token } = useContext(AuthContext);
    const [attachments, setAttachments] = useState(null);


    const openAttachment = async (attachmentFileName) => {
        const attachment = await getAttachmentData(token, attachmentFileName);
        const url = window.URL.createObjectURL(attachment);
        window.open(url);
    };

    const handleShowAttachments = async () => {
        if (!attachments) {
            const fetchedAttachments = await getAttachments(token, selectedEmail.id);
            setAttachments(fetchedAttachments);
        } else {
            setAttachments(null);
        }
    };

    return (
        <>
            <h5>Attachments:</h5>
            <Button variant="outline-primary" onClick={handleShowAttachments}>
                {attachments ? "Hide Attachments" : "View Attachments"}
            </Button>
            {attachments &&
                attachments.map((attachment) => (
                    <div key={attachment.id}>
                        <Button
                            variant="outline-primary"
                            onClick={() => openAttachment(attachment.file_name)}
                            className={"m-2"}
                        >
                            {attachment.file_name}
                        </Button>
                    </div>
                ))}
        </>
    );
};

export default Attachments;
