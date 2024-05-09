import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import './assets/styles.css';

interface Credentials {
    id: number;
    team_id: number;
    imap_server: string;
    imap_port: number;
    protocol: string;
    use_ssl: boolean;
    email: string;
    imap_password: string;
    smtp_server: string;
    smtp_password: string;
    password: string;
}

export const AccountSettings = () => {

    const { auth }                                = useContext(AuthContext);
    const [credentials, setCredentials]           = useState<Credentials>();
    const [showSmtpPassword, setShowSmtpPassword] = useState(false);
    const [showImapPassword, setShowImapPassword] = useState(false);

    const toggleSmtpPasswordVisibility = () => {
        setShowSmtpPassword(!showSmtpPassword);
    };

    const toggleImapPasswordVisibility = () => {
        setShowImapPassword(!showImapPassword);
    };

    useEffect(() => {
        axios.get(BASE_URL + '/teams/team-crendentials',
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                setCredentials(response.data.credentials)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    const handleUpdate = () => {
        axios.put(BASE_URL + '/teams/team-crendentials',
            {
                credentials
            },
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                console.log('Credentials updated')
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <div className="account-settings">
            <h1 className="settings-content-title">Account settings</h1>
            <div className="settings-list">
                <h2 className="settings-content-title">IMAP</h2>
                <label>Server: <input type="text" name="imap_server" className='settings-input' value={credentials?.imap_server} onChange={handleInputChange} /></label>
                <label>Port: <input type="number" name="imap_port" className='settings-input' value={credentials?.imap_port} onChange={handleInputChange} /></label>
                <label>Protocol: <input type="text" name="protocol" className='settings-input' value={credentials?.protocol} onChange={handleInputChange} /></label>
                <label>Email: <input type="email" name="email" className='settings-input' value={credentials?.email} onChange={handleInputChange} /></label>
                <label>Password: <input type={showImapPassword ? "text" : "password"} name="imap_password" className='settings-input' value={credentials?.imap_password} onChange={handleInputChange} /></label>
                <label>Show Password: <input type="checkbox" onChange={toggleImapPasswordVisibility} /></label>
            </div>
            <div>
                <h2 className="settings-content-title">SMTP</h2>
                <label>Server: <input type="text" name="smtp_server" className='settings-input' value={credentials?.smtp_server} onChange={handleInputChange} /></label>
                <label>Password: <input type={showSmtpPassword ? "text" : "password"} name="smtp_password" className='settings-input' value={credentials?.smtp_password} onChange={handleInputChange} /></label>
                <label>Show Password: <input type="checkbox" onChange={toggleSmtpPasswordVisibility} /></label>
            </div>
            <button className='plus-button' onClick={handleUpdate}>Update</button>
        </div>
    )
}