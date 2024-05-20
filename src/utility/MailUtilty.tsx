import { DateTimeUtility } from "./DateTimeUtlity";
import { Mail } from "./models/Mail";

type replyType = 'new' | 'reply' | 'forward';

export const MailUtility = {

    prepareMailForEditing(replyMail: Mail, teamAddreses: string[],replyType: replyType): Mail {
        const newMail = JSON.parse(JSON.stringify(replyMail));

        if(replyType === 'reply') {
            newMail.body = `<br><br><br><hr style="border: none; border-top: 1px solid #ccc;">On ${DateTimeUtility.format(replyMail.sent_date, 'H:i d:m:Y')} , ${newMail.from_name} <${replyMail.from}> wrote:
            <br>
            <blockquote>${replyMail.body}</blockquote>`;
        }
        if(replyType === 'forward') {
            newMail.body = `<br><br><br><hr style="border: none; border-top: 1px solid #ccc;">Forwarded message:<br>${newMail.body}`;
        }
        if(replyType === 'new') {
            newMail.body = ' ';
        }
        newMail.subject = `Re: ${newMail.subject}`;

        this.updateRecipients(newMail, teamAddreses);


        return newMail;
    },
    updateRecipients(replyMail: Mail, teamAddresses: string[]) {
        console.log(replyMail, 'replyMail')
        // If the team is sending the email, don't change anything
        if (teamAddresses.includes(replyMail.from)) {
            return replyMail;
        }
    
        // If the team is not sending the email, update the recipients
        const all = [...replyMail.to, ...replyMail.cc, ...replyMail.bcc];
        const myEmail = teamAddresses[0];
    
        const otherRecipients = all.filter(email => email !== myEmail);
        //if ther eis reply_to set reply to as to and other recipients as cc and remove reply to from cc and bcc
        if (replyMail.reply_to !== null) {
            replyMail.from = myEmail;
            replyMail.to   = [replyMail.reply_to];
            replyMail.cc   = otherRecipients;
            replyMail.cc.filter(email => email !== replyMail.reply_to);
            replyMail.bcc = [];
        } else {
            replyMail.from = myEmail;
            replyMail.to   = [replyMail.from];
            replyMail.cc   = otherRecipients;
            replyMail.cc.filter(email => email !== replyMail.from);
            replyMail.bcc = [];
        }
    
        return replyMail;
    }
};
