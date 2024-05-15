import React, { useState } from 'react';
import './assets/styles.css';

interface EmailInputProps {
    onAdd: (email: string) => void;
    onRemove: (email: string) => void;
    emails: string[];
}

export const EmailInput: React.FC<EmailInputProps> = ({ onAdd, onRemove, emails }) => {

    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            if (input.match(/^\S+@\S+\.\S+$/)) {
                onAdd(input);
                setInput('');
            }
        }
    };

    return (
        <div className='reply-mail-input-wrapper'>
            {emails.map(email => (
                <div
                    className='reply-mail-email-input-item' 
                    key={email + 'item'}
                 >
                    <div className='reply-mail-plain-mail'>
                        {email}
                    </div>
                    <button
                        className='reply-mail-input-remove'
                        key={email + 'button'}
                        onClick={() => onRemove(email)}
                    >
                        X
                    </button>
                </div>
            ))}
            <input
                className='reply-mail-input'
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};
