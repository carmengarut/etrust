import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useForm from '../hooks/useForm'

import { addNewDeal } from '../reducers/dealReducer'
import { showModal } from '../reducers/modalReducer'
import { usersInit } from '../reducers/usersReducers'
import '../css/createContractForm.css'
import { uploadFile } from '../services/deals'

export default function CreateContractForm () {
  const users = useSelector(state => state.users)

  const [addFileMode, setAddFileMode] = useState(false)

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

  const { handleChange, values, errors } = useForm()

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const isUser = users.some(user => user.email === values.email)

    if (isUser) {
      const contractFile = document.querySelector('#file')
      const newForm = new FormData()
      newForm.append('files', contractFile.files[0])

      const uploadedFile = await uploadFile(newForm)

      const dealObject = {
        title: values.title,
        type: addFileMode ? 'File' : 'Text',
        content: values.content,
        file: uploadedFile.key,
        memberEmail: values.email
      }
      dispatch(addNewDeal(dealObject))
      console.log(newForm)

      history.push('/deals')
    } else {
      dispatch(showModal())
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
          {errors.title && <span>{errors.title}</span>}
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
          {errors.content && <span>{errors.content}</span>}
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
          {errors.email && <span>{errors.email}</span>}
        </div>

        <button type='submit' className='ccf-submit-button'>
          {t('create_contract_page.save')}
        </button>
      </form>
    </div>
  )
}
