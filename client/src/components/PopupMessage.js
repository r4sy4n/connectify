import React from 'react';
import { useState } from 'react';
import { PopupContent, PopupWrapper } from '../assets/wrappers/PopupWrapper';

const PopupMessage = ( { onClose, children } ) => {
    const handleClick = ( event ) => {
        if ( event.target === event.currentTarget ) {
            onClose();
        }
    };

  return (
    <PopupWrapper onClick={handleClick}>
        <PopupContent>{ children }</PopupContent>
    </PopupWrapper>
  )
};

export default PopupMessage