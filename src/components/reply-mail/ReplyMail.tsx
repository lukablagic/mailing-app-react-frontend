const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useContext, useEffect, useState } from 'react';
import { Mail } from '../../utility/models/Mail';
import { MailUtility } from '../../utility/MailUtilty';
import { AuthContext } from '../../utility/contexts/AuthContext';
import { useTabsContext } from '../../utility/contexts/TabsContext';
import axios from 'axios';
import './assets/styles.css';
import { MailEditor } from '../editor/MailEditor';

interface ReplyMailProps {
    replyMail     : Mail;
    tabId         : string;
    removeTab     : (tabId: string) => void;
    renderFullView: boolean;
}

export const ReplyMail = ({ replyMail, renderFullView = true, tabId, removeTab }: ReplyMailProps) => {

    const [editingEmail, setEditingMail]                   = useState<Mail | null>(null);
    const { setCurrentIndex, tabsCounter, setTabsCounter } = useTabsContext();
    const { auth }                                         = useContext(AuthContext);

    useEffect(() => {
        setEditingMail(MailUtility.prepareMailForEditing(replyMail, auth.team.addresses));
    }, [replyMail]);

    const handleSendMail = () => {
        console.log(tabId)
        removeTab(tabId)
        console.log(editingEmail.body);
        setCurrentIndex(0);
        setTabsCounter(tabsCounter - 1);
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
    const handleSaveHtml = (data: string) => {
        setEditingMail({ ...editingEmail, body: data });
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
                            <MailEditor html={editingEmail.body} saveData={handleSaveHtml} />
                        }
                    </div>
                </>
            }


        </div>
    )
}
