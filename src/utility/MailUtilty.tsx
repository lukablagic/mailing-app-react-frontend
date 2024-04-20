import { DateTimeUtility } from "./DateTimeUtlity";
import { Mail } from "./models/Mail";

export const MailUtility = {

    prepareMailForEditing(replyMail: Mail): Mail {
        const newMail = JSON.parse(JSON.stringify(replyMail));
      
       newMail.body = `<br><br><br><hr style="border: none; border-top: 1px solid #ccc;">On ${DateTimeUtility.format(replyMail.sent_date,'H:i d:m:Y')} , ${newMail.from_name} <${replyMail.from}> wrote:<br>${newMail.body}`;
        newMail.subject = `Re: ${newMail.subject}`;
        
        newMail.to = [];
        newMail.to.push(newMail.from);

        return newMail;
    }
};
