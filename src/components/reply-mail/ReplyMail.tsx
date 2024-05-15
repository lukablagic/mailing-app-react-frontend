const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useContext, useEffect, useState } from 'react';
import { Mail } from '../../utility/models/Mail';
import { MailUtility } from '../../utility/MailUtilty';
import { AuthContext } from '../../utility/contexts/AuthContext';
import { useTabsContext } from '../../utility/contexts/TabsContext';
import axios from 'axios';
import './assets/styles.css';
import { MailEditor } from '../editor/MailEditor';
import { EmailInput } from '../email-input/EmailInput';

type replyType = 'new' | 'reply' | 'forward';

interface ReplyMailProps {
    replyMail     : Mail;
    tabId         : string;
    replyType     : replyType;
    removeTab     : (tabId: string) => void;
    renderFullView: boolean;
}

export const ReplyMail = ({ replyMail, renderFullView = true, tabId, removeTab, replyType }: ReplyMailProps) => {

    const [editingEmail, setEditingMail]                   = useState<Mail | null>(null);
    const { setCurrentIndex, tabsCounter, setTabsCounter } = useTabsContext();
    const { auth }                                         = useContext(AuthContext);

    useEffect(() => {
        setEditingMail(MailUtility.prepareMailForEditing(replyMail, auth.team.addresses, replyType));
    }, [replyMail]);

    const handleSendMail = () => {
        console.log(tabId)
        removeTab(tabId)
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
    const handleAddEmail = (email: string) => {
        setEditingMail({ ...editingEmail, to: [...editingEmail.to, email] });
    };
    const handleRemoveEmail = (email: string) => {
    setEditingMail({ ...editingEmail, to: editingEmail.to.filter(e => e !== email) });
    };
      
    return (
        <div className={'reply-mail'}>
            {typeof editingEmail !== "undefined" && editingEmail !== null &&
                <>
                    <div className='reply-mail-section-row'>
                        <button className='button-primary' onClick={(e) => { e.stopPropagation(); handleSendMail() }}>Send Mail</button>
                    </div>
                    <div className='reply-mail-section-row'>
                        <div className='reply-mail-section-title'>From:</div>
                        <input
                            className='reply-mail-input mx-0'
                            value={editingEmail.from}
                            onChange={e => setEditingMail({ ...editingEmail, from: e.target.value })}
                        />
                    </div>
                    <div className='reply-mail-section-row'>
                        <div className='reply-mail-section-title'>To:</div>
                        <EmailInput onAdd={handleAddEmail} onRemove={handleRemoveEmail} emails={editingEmail.to} />
                    </div>
                    <div className='reply-mail-section-row'>
                        <input
                            className='reply-mail-input'
                            value={editingEmail.subject}
                            onChange={e => setEditingMail({ ...editingEmail, subject: e.target.value })}
                        />
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
