import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Modal from '../components/Modal'
import SectionTitle from '../components/SectionTitle'
import DealDetailsMemberCard from '../components/DealDetailsMemberCard'
import DealDetailsRatings from '../components/DealDetailsRatings'
import ContractDetailsForm from '../components/ContractDetailsForm'

import { hideModal } from '../reducers/modalReducer'

import successIcon from '../public/success-icon.svg'

import '../css/contractDetails.css'

export default function ContractDetails () {
  const { id } = useParams()
  const deal = useSelector(state => state.deals).find(deal => deal.id === id.toString())

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  const goToContracts = () => {
    history.push('/deals')
    dispatch(hideModal())
  }

  if (!deal) {
    return null
  }

  return (
    <div className='cd-container'>
      <SectionTitle>
        {t('deal_details.contract_details')}{deal.title}
      </SectionTitle>

      <div className='cd-box'>
        <div className='cd-status-container'>{t('deal_details.contract_status')}
          <span className='cd-status-green'>
            {deal.status}
          </span>
        </div>

        <div>{t('deal_details.contract_members')}</div>
        <div className='cd-members-container'>
          <DealDetailsMemberCard deal={deal} user={deal.createdBy} />
          <DealDetailsMemberCard deal={deal} user={deal.member} />
        </div>

        <ContractDetailsForm deal={deal} />

        {deal.status === 'Signed'
          ? <DealDetailsRatings />
          : ''}
      </div>

      <Modal action={goToContracts} buttonName={t('deal_details.go_to_contracts')} cancelButtonName={t('deal_details.continue_editing')}>
        <img
          alt=''
          src={successIcon}
          width='100'
          height='100'
        />
        <h6>{t('deal_details.saved')}</h6>
        {t('deal_details.contract_successfully_edited_1')} "{deal.title}" {t('deal_details.contract_successfully_edited_2')}
      </Modal>
    </div>
  )
}
