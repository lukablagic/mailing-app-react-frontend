import { useEffect, useState } from 'react';
import { Mail } from '../../utility/models/Mail';
import { MailEditor } from '../editor/MailEditor'
import { MailUtility } from '../../utility/MailUtilty';
import './assets/styles.css';
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
        <div className={'reply-mail'}>
            {typeof editingEmail !== "undefined" && editingEmail !== null &&
                <>
                    <div className='reply-mail-section-row'>
                        <button className='button-primary' onClick={() => { console.log(editingEmail) }}>Send Mail</button>
                    </div>
                    <div className='reply-mail-section-row'>
                        <div className='reply-mail-section-title'>From:</div>
                        <div className='reply-mail-section-txt'>{editingEmail.from}</div>
                    </div>
                    <div className='reply-mail-section-row'>
                        <div className='reply-mail-section-title'>To:</div>
                        <div className='reply-mail-section-txt'>{editingEmail.to}</div>
                    </div>
                    <div className='reply-mail-section-row'>
                        <input className='reply-mail-input' placeholder='Title' value={editingEmail.subject} />
                    </div>
                    <div className='reply-mail-editor-container'>
                        {typeof editingEmail !== "undefined" && editingEmail !== null &&
                            <MailEditor html={editingEmail.body} />
                        }
                    </div>
                </>
            }


        </div>
    )
}
