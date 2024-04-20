import { useEffect, useState } from 'react';
import { Mail } from '../../utility/models/Mail';
import { MailEditor } from '../editor/MailEditor'
import { MailUtility } from '../../utility/MailUtilty';

interface ReplyMailProps {
    replyMail: Mail;
    renderFullView: boolean;
}

export const ReplyMail = ({ replyMail, renderFullView = true }: ReplyMailProps) => {

    const [editingEmail, setEditingMail] = useState<Mail | null>(null);

    useEffect(() => {
        setEditingMail(MailUtility.prepareMailForEditing(replyMail));
    }, [replyMail]);


    return (
        <div className={renderFullView === true ?  'relative h-full max-h-full flex-grow bg-white px-4 pt-0' : 'relative h-1/6 max-h-64 flex-grow bg-white px-4 pt-0' }>
            {typeof editingEmail !== "undefined" && editingEmail !== null &&
                <MailEditor html={editingEmail.body} />
            }
        </div>
    )
}
