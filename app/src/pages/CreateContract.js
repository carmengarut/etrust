import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import SectionTitle from '../components/SectionTitle'
import CreateContractForm from '../components/CreateContractForm'
import Modal from '../components/Modal'

import useForm from '../hooks/useForm'

import { hideModal } from '../reducers/modalReducer'
import { usersInit } from '../reducers/usersReducers'
import { addNewDeal } from '../reducers/dealReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

import { inviteUser } from '../services/deals'

import inviteUserIcon from '../public/invite-user-icon.svg'

import '../css/createContract.css'

export default function CreateContract () {
  const user = useSelector(state => state.user)

  const { values } = useForm()

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  const handleInviteUser = async () => {
    try {
      const invitationDetails = {
        email: values.email,
        senderName: `${user.name} ${user.surname}`,
        contractTitle: values.title
      }
      await inviteUser(invitationDetails)
      dispatch(hideModal())
      dispatch(setNotification('User Invited'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      const dealObject = {
        title: values.title,
        content: values.content,
        memberEmail: values.email
      }
      dispatch(addNewDeal(dealObject))
      history.push('/deals')
    } catch (e) {
      console.error(e)
      console.error(e.message)
    }
  }

  return (
    <div className='cc-container'>
      <SectionTitle>
        {t('create_contract_page.contracts')}
      </SectionTitle>
      <CreateContractForm />
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
