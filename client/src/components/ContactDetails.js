import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { ContactDetailsWrapper, ContactItem } from '../assets/wrappers/ContactDetailsWrapper';

const ContactDetails = () => {
    return (
        <ContactDetailsWrapper>
            <ContactItem>
                <div className='icon'>
                    <FaPhone/>
                </div>
                <p>123-456-789</p>
            </ContactItem>
            <ContactItem>
                <div className='icon'>
                    <FaEnvelope/>
                </div>
                <p>connectify@email.com</p>
            </ContactItem>
            <ContactItem>
                <div className='icon'>
                    <FaMapMarkerAlt/>
                </div>
                <p>Manila, Philippines</p>
            </ContactItem>
        </ContactDetailsWrapper>
    );
};

export default ContactDetails