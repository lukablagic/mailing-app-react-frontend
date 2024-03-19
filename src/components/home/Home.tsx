import  { useState, useEffect, useContext } from "react";
import {  Row, Col } from "react-bootstrap";
import Options from "./Options";
import Inbox from "./Inbox";
import { getEmails } from "../../api/Mail";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { User } from "../../utility/models/User";
import Header from "../header/Header";
import ToolbarComponent from "../toolbar/ToolbarComponent";
import Details from "../details/Details";

const Home = () => {
  
  const { token }                               = useContext(AuthContext);
  const [emails, setEmails]                     = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState(null);
  const [emailType, setEmailType]               = useState("inbox");
  const [showAttachments, setShowAttachments]   = useState(false);
  const [selectedEmail, setSelectedEmail]       = useState(null);
  const seenSubjects                            = new Set();
  const seenSubjectsSent                        = new Set();
  const [user, setUser]                         = useState<User>(null);
  
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  };

  useEffect(() => {
    getUser();
    getEmails(token).then((res) => setEmails(res));

  }, [token]);

  const handleEmailClick = (id) => {

    setSelectedEmailUid(id);
    setSelectedEmail(emails.find((email) => email.uid === id));

  };

  const handleStatusUpdate = () => {
    getEmails(token).then((res) => setEmails(res));
  };

  const filteredEmailsInbox = emails.filter((email) => {
    if (emailType === "inbox") {
      if (email.in_reply_to !== null) {
        return false;
      }
      if (email.subject.startsWith("Re:")) {
        return false;
      }
      if (seenSubjects.has(email.subject)) {
        return false;
      }
      return true ;
    } else if (emailType === "sent") {
     if (email.from == user.email) {
        return true;
      }
    }
    return false ;
  });

  const handleEmailType = (type) => {
    setSelectedEmailUid(null); // Reset selected email UID
    seenSubjects.clear(); // Clear seenSubjects set
    seenSubjectsSent.clear(); // Clear seenSubjectsSent set
    setEmailType(type);
  };

  const toggleImageDisplay = () => {
    setShowAttachments(!showAttachments);
    console.log(showAttachments);
  };

  return (

        <div className="bg-light ">
          <Header />
          <div >
            <ToolbarComponent
                emails={emails}
                handleStatusUpdate={handleStatusUpdate}
                selectedEmail={selectedEmail}
                toggleImageDisplay={toggleImageDisplay}
                showAttachments={showAttachments}
            />
          </div>
          <Row className=" ">
            <Col xs={12} md={2} className="py-1 py-md-0 left">
              <Options handleItemSelected={handleEmailType} />
            </Col>
            <Col xs={12} md={2} className="py-2 py-md-0">
              <Inbox
                  filteredEmailsInbox={filteredEmailsInbox}
                  handleEmailClick={handleEmailClick}
                  handleReload={handleStatusUpdate} 
              />
            </Col>
            <Col xs={12} md={8} >
              <Details emails={emails} selectedEmail={selectedEmail} showAttachments={showAttachments} />
            </Col>
          </Row>
        </div>

  );
};

export default Home;
