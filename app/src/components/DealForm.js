import React, { useEffect } from 'react'
import { addNewDeal } from '../reducers/dealReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { showModal } from '../reducers/modalReducer'
import { usersInit } from '../reducers/usersReducers'

import inviteUserIcon from '../public/invite-user-icon.svg'
import dealsIcon from '../public/deals-icon.svg'

import '../css/dealForm.css'
import useForm from '../hooks/useForm'

export default function DealForm () {
  const users = useSelector(state => state.users)

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
      const dealObject = {
        title: values.title,
        content: values.content,
        memberEmail: values.email
      }

      dispatch(addNewDeal(dealObject))

      history.push('/deals')
    } else {
      dispatch(showModal())
    }
  }

  return (
    <div className='DealsFormContainer'>
      <div className='DealsFormTitle'>
        <img
          alt=''
          src={dealsIcon}
          width='30px'
          height='30px'
        />
        <h1 className='Title'>{t('create_contract_page.contracts')}</h1>
      </div>
      <div className='DealsFormCard'>
        <div>{t('create_contract_page.title')}</div>
        <form onSubmit={handleSubmit} className='DealsFormForm'>
          <div className='DealsFormFieldGroup'>
            <label>{t('create_contract_page.contract_title')}</label>
            <input
              className='DealsFormField'
              type='text'
              name='title'
              placeholder={t('create_contract_page.contract_title_placeholder')}
              onChange={handleChange}
              required
            />
            {errors.title && <span>{errors.title}</span>}
          </div>

          <div className='DealsFormFieldGroup'>
            <label>{t('create_contract_page.content')}</label>
            <textarea
              className='DealsFormTextarea'
              name='content'
              placeholder={t('create_contract_page.content_placeholder')}
              onChange={handleChange}
              required
            />
            {errors.content && <span>{errors.content}</span>}
          </div>

          <div className='DealsFormFieldGroup'>
            <label>{t('create_contract_page.email')}</label>
            <input
              className='DealsFormField'
              type='email'
              name='email'
              placeholder={t('create_contract_page.email_placeholder')}
              onChange={handleChange}
              required
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <button type='submit' className='DealsFormSaveButton'>
            {t('create_contract_page.save')}
          </button>
        </form>
      </div>
      <Modal buttonName='Invite User'>
        <img
          alt=''
          src={inviteUserIcon}
          width='100'
          height='100'
        />
        <h6>User doesn't have an eTrust account</h6>
        {values.email} doesn't have an eTrust account. Do you want to send him and invitation?
      </Modal>
    </div>
  )
}
