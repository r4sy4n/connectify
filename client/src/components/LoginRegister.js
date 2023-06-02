import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import ModalWrapper from '../assets/wrappers/ModalWrapper';

const LoginRegister = () => {
  
  //hides the modal when clicked outside or the 'x' button
  const hideModal = (event) => {
      let modalContainer = document.querySelector('.modal-container');
      let modalClose = document.querySelector('.modal-close');
      
      if (modalContainer !== undefined) {
          if (!modalContainer.contains(event.target) || modalClose.contains(event.target)){
              // globalDispatch({ type: 'RESET', state: 'showBookModal' });
          }
      }
  }
  
  return (
    //modal's overlay container
    <ModalWrapper
    onClick={ hideModal }
>
    {/* Start Modal Main Container */}
    <div className='modal-container'>

        {/* Start Close Button */}
        <div className='modal-close flex center-middle'
            onClick={ hideModal }
        >
            <Icon><CloseCircleOutline/></Icon>
        </div>
        {/* End Close Button */}
    </div>
  </ModalWrapper>
  )
}

export default LoginRegister;