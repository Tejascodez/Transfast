import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import './EmailSender.css';

const EmailSender = () => {
    const [modal, showModal] = useState(false);
    const [from, setFrom] = useState('tejastp834@gmail.com');
    const [to, setTo] = useState([]);
    const [emailList, setEmailList] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [customerEmails, setCustomerEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers');
                const emailOptions = [...new Set(response.data.map(item => item.email))]
                    .map(email => ({ label: email, value: email }));
                setCustomerEmails(emailOptions);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };

        fetchEmails();
    }, []);

    const handleAddEmail = () => {
        const emails = selectedEmails.map(email => email.value).filter(email => email !== '');
        setEmailList([...new Set([...emailList, ...emails])]);
        setSelectedEmails([]);
        setSelectAll(false);
        showModal(false);
    };

    const handleRemoveEmail = (index) => {
        const updatedList = [...emailList];
        updatedList.splice(index, 1);
        setEmailList(updatedList);
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(customerEmails);
        }
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (email) => {
        if (selectedEmails.some(selected => selected.value === email.value)) {
            setSelectedEmails(selectedEmails.filter(selected => selected.value !== email.value));
        } else {
            setSelectedEmails([...selectedEmails, email]);
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (emailList.length === 0) {
            setStatus({ type: 'error', message: 'Please add at least one recipient.' });
            return;
        }

        const formData = new FormData();
        formData.append('from', from);
        formData.append('to', JSON.stringify(emailList));
        formData.append('subject', subject);
        formData.append('message', message);

        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            const response = await axios.post('http://localhost:5000/send-email', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setStatus({ type: 'success', message: 'Emails sent successfully!' });
                setEmailList([]);
                setSubject('');
                setMessage('');
                setAttachment(null);
            }
        } catch (error) {
            console.error('Error sending emails:', error);
            setStatus({ type: 'error', message: 'Failed to send emails. Please try again.' });
        }
    };

    return (
        <>
            <div>
                <Modal show={modal} onHide={() => showModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Recipients</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                        {customerEmails.map((email, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={email.label}
                                checked={selectedEmails.some(selected => selected.value === email.value)}
                                onChange={() => handleCheckboxChange(email)}
                            />
                        ))}
                        <CreatableSelect
                            isMulti
                            type="checkbox"
                            value={to}
                            onChange={setTo}
                            options={customerEmails}
                            placeholder="Add or create email addresses..."
                            className="creatable-select"
                            styles={{
                                menu: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => showModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddEmail}>
                            Add Emails
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="email-container">
                <h2 className="email-header">Professional Email Sender</h2>
                <form onSubmit={sendEmail} className="email-form">
                    <div className="email-form-group">
                        <label className="email-label">From:</label>
                        <input
                            type="email"
                            value={from}
                            readOnly
                            className="email-input email-input-readonly"
                        />
                    </div>
                    <div className="email-form-group">
                        <label className="email-label">Recipients:</label>
                        <button
                            type="button"
                            className="email-add-button"
                            onClick={() => showModal(true)}
                        >
                            Add Recipients
                        </button>
                    </div>
                    {emailList.length > 0 && (
                        <div className="email-list">
                            <h4>Recipients:</h4>
                            <ul>
                                {emailList.map((email, index) => (
                                    <li key={index}>
                                        {email}{' '}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEmail(index)}
                                            className="email-remove-button"
                                        >
                                            ✖
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="email-form-group">
                        <label className="email-label">Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="email-input"
                        />
                    </div>
                    <div className="email-form-group">
                        <label className="email-label">Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="email-textarea"
                        />
                    </div>
                    <div className="email-form-group">
                        <label className="email-label">Attach File:</label>
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="file-input"
                                onChange={handleFileChange}
                                className="email-file-input"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-input" className="file-input-label">
                                <FontAwesomeIcon icon={faPaperclip} className="attachment-icon" />
                            </label>
                            {attachment && (
                                <span className="attachment-name">{attachment.name}</span>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="email-button">Send Email</button>
                </form>
                {status && (
                    <p className={status.type === 'success' ? 'email-success' : 'email-error'}>
                        {status.message}
                    </p>
                )}
            </div>
        </>
    );
};

export default EmailSender;
