import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";


const ImageView = ({ attachment }) => {
    const [blobUrl, setBlobUrl] = useState(null);
    const [attachmentImage, setAttachmentImage] = useState(null);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchAttachmentImage = async () => {
            if (attachment.file_type.startsWith("image")) {
               
            }
        };

        fetchAttachmentImage();
    }, [attachment, auth.token]);

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
