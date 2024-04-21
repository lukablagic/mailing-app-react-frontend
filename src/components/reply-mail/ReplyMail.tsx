import { useContext, useEffect, useState } from 'react';
import { Mail } from '../../utility/models/Mail';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { MailUtility } from '../../utility/MailUtilty';
import './assets/styles.css';
import axios from 'axios';
import { AuthContext } from '../../utility/contexts/AuthContext';
import { MailEditor } from '../editor/MailEditor';

interface ReplyMailProps {
    replyMail: Mail;
    renderFullView: boolean;
}

export const ReplyMail = ({ replyMail, renderFullView = true }: ReplyMailProps) => {

    const [editingEmail, setEditingMail] = useState<Mail | null>(null);
    const { auth }                       = useContext(AuthContext);

    useEffect(() => {
        setEditingMail(MailUtility.prepareMailForEditing(replyMail, auth.team.addresses));
    }, [replyMail]);

    const handleSendMail = () => {
        console.log('Mail sent');
        console.log('editing mail', editingEmail)
        axios.post(`${BASE_URL}/mail/send-mail`, {
            'draft': editingEmail,
        },
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                    
            }
        })
    }

    return (
        <div className={'reply-mail'}>
            {typeof editingEmail !== "undefined" && editingEmail !== null &&
                <>
                    <div className='reply-mail-section-row'>
                        <button className='button-primary' onClick={(e) => { e.stopPropagation(); handleSendMail() }}>Send Mail</button>
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
