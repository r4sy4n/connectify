import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { ContactDetailsWrapper, ContactItem } from '../assets/wrappers/ContactDetailsWrapper';

const ContactDetails = () => {
    return (
        <ContactDetailsWrapper>
            <ContactItem>
                <FaPhone />
                <p>123-456-789</p>
            </ContactItem>
            <ContactItem>
                <FaEnvelope />
                <p>connectify@email.com</p>
            </ContactItem>
            <ContactItem>
                <FaMapMarkerAlt />
                <p>Manila, Philippines</p>
            </ContactItem>
        </ContactDetailsWrapper>
    );
};

export default ContactDetails