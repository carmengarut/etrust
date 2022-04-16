import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import SectionTitle from '../components/SectionTitle'
import CreateContractForm from '../components/CreateContractForm'
import { usersInit } from '../reducers/usersReducers'

import '../css/createContract.css'

export default function CreateContract () {
  const dispatch = useDispatch()
  const { t } = useTranslation('global')

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  return (
    <div className='cc-container'>
      <SectionTitle>
        {t('create_contract_page.contracts')}
      </SectionTitle>
      <CreateContractForm />

    </div>
  )
}
