import { DateTimeUtility } from "./DateTimeUtlity";
import { Mail } from "./models/Mail";

export const MailUtility = {

    prepareMailForEditing(replyMail: Mail, teamAddreses: string[]): Mail {
        const newMail = JSON.parse(JSON.stringify(replyMail));

        newMail.body = `<br><br><br><hr style="border: none; border-top: 1px solid #ccc;">On ${DateTimeUtility.format(replyMail.sent_date, 'H:i d:m:Y')} , ${newMail.from_name} <${replyMail.from}> wrote:<br>${newMail.body}`;
        newMail.subject = `Re: ${newMail.subject}`;

        this.updateRecipients(newMail, teamAddreses);


        return newMail;
    },
    updateRecipients(newMail: Mail, teamAddreses: string[]) {
        const to            = newMail.to;
        const from          = newMail.from;
        const cc            = newMail.cc;
        newMail.to          = [];
        newMail.from        = teamAddreses[0];

        if (newMail.reply_to !== null) {
            newMail.to.push(newMail.reply_to);
        }
        const all = [...to, ...cc, from];

        all.forEach((email) => {
            if (teamAddreses.includes(email) === false && newMail.to.includes(email) === false){
                newMail.cc.push(email);
            }
        });

        return newMail;
    }
};
