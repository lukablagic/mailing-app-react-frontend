import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {AuthResponse} from '../models/AuthResponse';
import {User} from '../models/User';
import {Mail} from '../models/Mail';
import {stringify} from "querystring";
import {createLogger} from "vite";

const API_BASE_URL = 'http://localhost';


export async function getEmails(token: string): Promise<Mail[]> {
    const response = await fetch(`${API_BASE_URL}/emails`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        }
    });
    const data = await response.json();

    return data.emails;
}


export async function sendEmail(token: string, subject: string, to: string[], cc: string[], bcc: string[], body: string, inReplyTo: string) {

    console.log(token, subject, to, cc, bcc, body, inReplyTo)
    const response = await fetch(`${API_BASE_URL}/emails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({subject: subject, to: to, cc: cc, bcc: bcc, body: body, inReplyTo: inReplyTo})
    });

    const email = await response.json();
    return email;
}

export async function replyEmail(token: string, email: any) {
 //   console.log(token, email);
    const response = await fetch(`${API_BASE_URL}/emails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(email),
    });

    const responseJson = await response.json();
    return responseJson;
}


export async function updateEmailStatus(id: number, status: boolean, token: string) {
    const response = await fetch(`${API_BASE_URL}/emails/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({status: status})
    });
}

export async function deleteEmail(id: number, token: string) {
    const response = await fetch(`${API_BASE_URL}/emails/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        }
    });
}

export async function getAttachments(token: string, emailId: number) {
    const response = await fetch(`${API_BASE_URL}/emails/${emailId}/attachments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });

    const data = await response.json();

    if (response.ok) {
        return data.attachments;
    } else {
        throw new Error(data.message);
    }
}

export async function getAttachmentData(token: string, emailFileName: string, fileType: string, subType: string) {
    const response = await fetch(`${API_BASE_URL}/emails/${emailFileName}/data`, {
        method: 'GET',
        headers: {
            'Content-Type': fileType + '/' + subType,
            Authorization: 'Bearer ' + token,
        },
    });
    if (fileType === 'image' && response.ok) {
        const data = await response.json();
        return data;
    } else (response.ok)
    {
        return response.blob();
    }
}
