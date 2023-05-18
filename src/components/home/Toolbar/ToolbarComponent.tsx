import React, {useContext, useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {Button, Container, Modal} from "react-bootstrap";
import {
    HiOutlineMail,
    HiOutlineTrash,
    HiOutlineReply,
    HiOutlineMailOpen,
    HiArrowNarrowRight,
} from "react-icons/hi";
import NewMail from "./NewMail";
import {updateEmailStatus} from "../../../api/Mail";
import {AuthContext} from "../../../contexts/AuthContext";
import Forward from "./Forward";
import Reply from "./Reply";
import Outline from "../Outline";
import {ToastContext} from "../../../contexts/ToastContext";
import { Mail } from "../../../models/Mail";

const ToolbarComponent = ({emails, selectedEmail, handleStatusUpdate, toggleImageDisplay, showAttachments}) => {
    const {token} = useContext(AuthContext);
    const {showToast} = useContext(ToastContext);
    
    useEffect(() => {
        
    }, [selectedEmail]);

    const changeStatus = async () => {
        if (selectedEmail) {
            try {
                let status;
                if (selectedEmail.is_read == 0) {
                    status = false;
                } else if (selectedEmail.is_read == 1) {
                    status = true;
                }
                await updateEmailStatus(selectedEmail.id, !status, token);
                handleStatusUpdate();
            } catch (error) {
                console.error(error);
            }

        } else {
            showToast("warning", "Please select an email to mark as read/unread!");
            return;
        }
    };

    return (
        <div>
           
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Home">
                    <div className="d-flex justify-content-start p-3">
                        <NewMail/>
                        <Reply emails={emails} selectedEmailUid={selectedEmail?.uid} selectedEmail={selectedEmail}/>
                        <Forward emails={emails} selectedEmailUid={selectedEmail?.uid} selectedEmail={selectedEmail}/>
                        <Button className="mx-1" variant="secondary" onClick={changeStatus}>
                            <HiOutlineMailOpen/>
                            Unread / Read
                        </Button>
                    </div>
                </Tab>
                <Tab eventKey="send-receive" title="Display">
                    <div className="d-flex justify-content-start p-3">
                        <Button
                            className={`mx-1 ${showAttachments ?    'btn-danger' : 'btn-primary'}`}
                            variant={showAttachments ? 'danger' :'primary' }
                            onClick={toggleImageDisplay}
                        >
                            <HiArrowNarrowRight/>
                            {showAttachments ? 'Attachments Disabled' : 'Attachments Enabled'}
                        </Button>
                    </div>
                </Tab>
            </Tabs>
          
        </div>
    );

};

export default ToolbarComponent;
