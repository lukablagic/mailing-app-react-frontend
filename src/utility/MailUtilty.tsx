import { DateTimeUtility } from "./DateTimeUtlity";
import { Mail } from "./models/Mail";

type replyType = 'new' | 'reply' | 'forward';

export const MailUtility = {

    prepareMailForEditing(replyMail: Mail, teamAddreses: string[],replyType: replyType): Mail {
        const newMail = JSON.parse(JSON.stringify(replyMail));

        if(replyType === 'reply') {
            newMail.body = `<br><br><br><hr style="border: none; border-top: 1px solid #ccc;">On ${DateTimeUtility.format(replyMail.sent_date, 'H:i d:m:Y')} , ${newMail.from_name} <${replyMail.from}> wrote:<br>${newMail.body}`;
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
    updateRecipients(newMail: Mail, teamAddreses: string[]) {
        const to            = newMail.to;
        const cc            = newMail.cc;
        newMail.to          = [];
        newMail.from        = teamAddreses[0];

        if (newMail.reply_to !== null) {
            newMail.to.push(newMail.reply_to);
        }
        const all = [...to, ...cc];

        all.forEach((email) => {
            if (teamAddreses.includes(email)) {
                return;
            }
            newMail.cc.push(email);
        });

        return newMail;
    }
};
