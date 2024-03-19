import React, { useContext, useEffect, useState } from "react";
import { getAttachmentData } from "../../api/Mail";
import { AuthContext } from "../../utility/contexts/AuthContext";


const ImageView = ({ attachment }) => {
    const [blobUrl, setBlobUrl] = useState(null);
    const [attachmentImage, setAttachmentImage] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchAttachmentImage = async () => {
            if (attachment.file_type.startsWith("image")) {
                const attachmentBlob = await getAttachmentData(
                    token,
                    attachment.file_name,
                    attachment.file_type,
                    attachment.file_subtype
                );
                setAttachmentImage(attachmentBlob);
            }
        };

        fetchAttachmentImage();
    }, [attachment, token]);

    return (
        <div >
            {attachmentImage ? (
                <p dangerouslySetInnerHTML={{ __html: attachmentImage.data }} />
            ) : (
                <h1>No image</h1>
            )}
        </div>
    );
};

export default ImageView;
