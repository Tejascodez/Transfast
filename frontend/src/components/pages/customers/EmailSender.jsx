import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import './EmailSender.css';

const EmailSender = () => {
    const [modal, setModal] = useState(false);
    const [from, setFrom] = useState('tejastp834@gmail.com');
    const [emailList, setEmailList] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [customerEmails, setCustomerEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Fetch customer emails on component mount
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customers');
                const emailOptions = response.data.map(customer => ({
                    label: customer.email,
                    value: customer.email,
                }));
                setCustomerEmails(emailOptions);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };
        fetchEmails();
    }, []);

    // Add selected emails to the email list
    const handleAddEmail = () => {
        const emails = selectedEmails.map(email => email.value);
        setEmailList(prevList => [...new Set([...prevList, ...emails])]); // Avoid duplicates
        setSelectedEmails([]);
        setSelectAll(false);
        setModal(false);
    };

    // Remove an email from the email list
    const handleRemoveEmail = (index) => {
        setEmailList(prevList => prevList.filter((_, i) => i !== index));
    };

    // Handle file attachment
    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    // Toggle select all emails
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails([...customerEmails]);
        }
        setSelectAll(!selectAll);
    };

    // Toggle individual email selection
    const handleCheckboxChange = (email) => {
        setSelectedEmails(prevSelected =>
            prevSelected.some(selected => selected.value === email.value)
                ? prevSelected.filter(selected => selected.value !== email.value)
                : [...prevSelected, email]
        );
    };

    // Send email
    const sendEmail = async (e) => {
        e.preventDefault();

        if (emailList.length === 0) {
            setStatus({ type: 'error', message: 'No recipients selected.' });
            return;
        }

        const formData = new FormData();
        formData.append('from', from);
        formData.append('to', JSON.stringify(emailList)); // Convert to JSON for the backend
        formData.append('subject', subject);
        formData.append('message', message);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/send-email', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send emails.',
            });
        }
    };

    return (
        <>
            {/* Modal for selecting recipients */}
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Recipients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Check
                        type="checkbox"
                        label="Select All"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                        className="select-all-checkbox"
                    />
                    {customerEmails.map((email, index) => (
                        <Form.Check
                            key={index}
                            type="checkbox"
                            label={email.label}
                            checked={selectedEmails.some(selected => selected.value === email.value)}
                            onChange={() => handleCheckboxChange(email)}
                            className="email-checkbox"
                        />
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddEmail}>
                        Add Emails
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Email Sender Form */}
            <div className="email-container">
                <h2 className="email-header">Professional Email Sender</h2>
                <form onSubmit={sendEmail} className="email-form">
                    <div className="email-form-group">
                        <label className="email-label">From:</label>
                        <input type="email" value={from} readOnly className="email-input email-input-readonly" />
                    </div>
                    <div className="email-form-group">
                        <label className="email-label">Recipients:</label>
                        <button
                            type="button"
                            className="email-add-button"
                            onClick={() => setModal(true)}
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
                                {attachment && <span className="attachment-name">{attachment.name}</span>}
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="email-button">Send Email</button>
                </form>
                {status && (
                    <p className={`status-message ${status.type === 'success' ? 'success' : 'error'}`}>
                        {status.message}
                    </p>
                )}
            </div>
        </>
    );
};

export default EmailSender;
