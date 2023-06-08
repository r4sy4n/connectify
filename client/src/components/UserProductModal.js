import React, { useState, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import Loading from '../components/Loading'
import { GlobalVariables } from '../App';
import { utils } from '../utils/Utils'

import { ModalWrapper, UserProductWrapper } from '../assets/wrappers/ModalWrapper';

const UserProductModal = ({ closeModal }) => {

    const [isLoading, setIsLoading] = useState();

    return (
        //modal's overlay container
        <ModalWrapper
            onClick={ utils.hideModal(closeModal) }
        >
            {/* Start Modal Main Container */}
            <div className='modal-container'>

                {/* Start Close Button */}
                <div className='modal-close'
                    onClick={ utils.hideModal(closeModal) }
                >
                    <Icon><CloseCircleOutline/></Icon>
                </div>
                {/* End Close Button */}

                {
                    
                //checks if loading spinner should be display or the form
                isLoading
                ? <Loading center />
                :
                <UserProductWrapper>

                    
                </UserProductWrapper>
                }
            </div>
        </ModalWrapper>
  )
}

export default UserProductModal;