import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAttachments, getAttachmentData } from "../../api/Mail";
import { AuthContext } from "../../utility/contexts/AuthContext";
import ImageView from "./ImageView";

const Attachments = ({ emails, selectedEmail, showAttachments }) => {
    
    const { token } = useContext(AuthContext);
    const [attachments, setAttachments] = useState([]);
    const [attachmentImage, setAttachmentImage] = useState(null);
    const [disableAttachments, setDisableImage] = useState(false);

    useEffect(() => {
        const fetchAttachments = async () => {
            const fetchedAttachments = await getAttachments(token, selectedEmail.id);
            setAttachments(fetchedAttachments);
        };

        setDisableImage(showAttachments);
        fetchAttachments();
    }, [token, selectedEmail.id, showAttachments]);

    const openAttachment = async (attachment) => {
        if (attachment.file_type.startsWith("image")) {
            const attachmentBlob = await getAttachmentData(
                token,
                attachment.file_name,
                attachment.file_type,
                attachment.file_subtype
            );
            setAttachmentImage(attachmentBlob);
        } else {
            const attachmentBlob = await getAttachmentData(
                token,
                attachment.file_name,
                attachment.file_type,
                attachment.file_subtype
            );
            const url = window.URL.createObjectURL(attachmentBlob);
            window.open(url);
        }
    };

    return (
        <>
            {!disableAttachments ? (
                <>
                    <h5>Attachments:</h5>
                    <div className="d-flex">
                        {attachments.map((attachment) => (
                            <div key={attachment.id}>
                                {attachment.file_type.startsWith("image") ? (
                                    <div className="d-flex">
                                        <ImageView attachment={attachment} />
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => openAttachment(attachment)}
                                        className="m-2"
                                    >
                                        {attachment.file_name}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h3>Attachments Disabled</h3>
            )}
        </>
    );
};

export default Attachments;
