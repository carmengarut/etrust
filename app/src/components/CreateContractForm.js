import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Modal from '../components/Modal'
import useForm from '../hooks/useForm'
import { addNewDeal } from '../reducers/dealReducer'
import { showModal, hideModal } from '../reducers/modalReducer'
import { inviteUserNow, usersInit } from '../reducers/usersReducers'
import '../css/createContractForm.css'
import { uploadFile } from '../services/deals'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

import inviteUserIcon from '../public/invite-user-icon.svg'
import handleError from '../helpers/errorHandler'

export default function CreateContractForm () {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const [addFileMode, setAddFileMode] = useState(false)
  const { handleChange, values } = useForm()

  const textareaStyle = addFileMode
    ? { display: 'none' }
    : { display: 'block' }

  const fileInputStyle = addFileMode
    ? { display: 'block' }
    : { display: 'none' }

  const activeButton = {
    color: '#fff',
    background: '#4E8AF4'
  }

  const inactiveButton = {
    color: '#4E8AF4',
    background: '#fff'
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  let uploadedFile

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const isUser = users.some(user => user.email === values.email)

      const contractFile = document.querySelector('#file')
      const newForm = new FormData()
      newForm.append('files', contractFile.files[0])

      uploadedFile = await uploadFile(newForm)

      if (isUser) {
        const dealObject = {
          title: values.title,
          type: addFileMode ? 'File' : 'Text',
          content: values.content,
          file: uploadedFile.key,
          memberEmail: values.email,
          signedBy: addFileMode ? [] : [user.id]
        }

        dispatch(addNewDeal(dealObject))

        window.scrollTo(0, 0)
        addFileMode
          ? history.push('/place-signatures/' + uploadedFile.key)
          : history.push('/deals')
      } else {
        dispatch(showModal())
      }
    } catch (e) {
      handleError(e)
    }
  }

  const handleInviteUser = async () => {
    try {
      const invitationDetails = {
        email: values.email
        // senderName: `${user.name} ${user.surname}`,
        // contractTitle: values.title
      }

      dispatch(inviteUserNow(invitationDetails)).then(() => {
        dispatch(hideModal())
        dispatch(setNotification('User Invited'))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
        const dealObject = {
          title: values.title,
          content: values.content,
          file: uploadedFile.key,
          memberEmail: values.email,
          signedBy: addFileMode ? [] : [user.id]
        }

        dispatch(addNewDeal(dealObject))

        window.scrollTo(0, 0)
        addFileMode
          ? history.push('/place-signatures/' + uploadedFile.key)
          : history.push('/deals')
      })
    } catch (e) {
      console.error(e)
      console.error(e.message)
    }
  }

  return (
    <div className='ccf-container'>
      <div>{t('create_contract_page.title')}</div>
      <form onSubmit={handleSubmit} className='ccf-form'>
        <div className='ccf-field-group'>
          <label>{t('create_contract_page.contract_title')}</label>
          <input
            className='ccf-field'
            type='text'
            name='title'
            placeholder={t('create_contract_page.contract_title_placeholder')}
            onChange={handleChange}
            required
          />
        </div>

        <div className='ccf-field-group'>
          <label>{t('create_contract_page.content')}</label>
          <div>
            <button
              type='button'
              onClick={() => setAddFileMode(false)}
              className='ccf-button-left'
              style={addFileMode ? inactiveButton : activeButton}
            >
              {t('create_contract_page.write_here')}
            </button>
            <button
              type='button'
              onClick={() => setAddFileMode(true)}
              className='ccf-button-right'
              style={addFileMode ? activeButton : inactiveButton}
            >
              {t('create_contract_page.upload_contract')}
            </button>
          </div>
          <textarea
            className='ccf-textarea'
            style={textareaStyle}
            name='content'
            placeholder={t('create_contract_page.content_placeholder')}
            onChange={handleChange}
            required={!addFileMode}
          />
          <input
            type='file'
            id='file'
            name='contractFile'
            style={fileInputStyle}
            required={addFileMode}
            className='cff-file-field'
          />
        </div>
        <div className='ccf-field-group'>
          <label>{t('create_contract_page.email')}</label>
          <input
            className='ccf-field'
            type='email'
            name='email'
            placeholder={t('create_contract_page.email_placeholder')}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className='ccf-submit-button'>
          {t('create_contract_page.save')}
        </button>
      </form>
      <Modal action={handleInviteUser} buttonName={t('create_contract_page.invite_user')} cancelButtonName={t('create_contract_page.cancel')}>
        <img
          alt=''
          src={inviteUserIcon}
          width='100'
          height='100'
        />
        <h6>{t('create_contract_page.dont_have_account')}</h6>
        {values.email} {t('create_contract_page.want_to_send_invitation')}
      </Modal>
    </div>
  )
}
