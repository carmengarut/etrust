
import Deal from '../components/Deal'
import { useTranslation } from 'react-i18next'

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import addContractIcon from '../public/add-contract-icon.svg'
import userIcon from '../public/user-cross-icon.svg'

import '../css/deals.css'

import SectionTitle from '../components/SectionTitle'
import Modal from '../components/Modal'
import { showModal } from '../reducers/modalReducer'

function ContractsOverview () {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)

  const history = useHistory()
  const { t } = useTranslation('global')
  const dispatch = useDispatch()

  const handleCreateContract = () => {
    (user.status === 'missing-kyc' || user.status === 'kyc_in_progress')
      ? dispatch(showModal())
      : history.push('/create-deal')
  }

  const handleVerify = () => {
    user.type === 'individual'
      ? history.push('/kyc-explanation')
      : history.push('/kyc-cif')
  }

  return (
    <div className='DealsContainer'>
      <SectionTitle>
        {t('agreements_page.agreements')}
      </SectionTitle>
      <div className='ButtonContainer'>
        <button onClick={handleCreateContract} className='Button'>{t('agreements_page.new_deal')}</button>
      </div>

      <div className='TableHeader'>
        <div className='ColumnsContainer0'>
          <div className='ColumnTitleDeal'>{t('agreements_page.title')}</div>
          <div className='Columns2TitleContainer'>
            <div className='ColumnTitle'>{t('agreements_page.user')}</div>
            <div className='ColumnTitle'>{t('agreements_page.creation_date')}</div>
          </div>
        </div>
        <div className='BatchesTitleContainer'>
          <div className='ColumnTitle'>{t('agreements_page.signed')}</div>
          <div className='ColumnTitle'>{t('agreements_page.status')}</div>
        </div>
      </div>
      {deals.filter(deal => {
        if (deal.createdBy.id) return (deal.createdBy.id === user.id || deal.member.id === user.id)
        return (deal.createdBy === user.id || deal.member === user.id)
      }).length > 0
        ? deals.filter(deal => {
            if (deal.createdBy.id) return (deal.createdBy.id === user.id || deal.member.id === user.id)
            return (deal.createdBy === user.id || deal.member === user.id)
          }).map((deal, i) =>
            <Deal
              key={i}
              deal={deal}
            />
          )
        : (
          <div className='D-no-deals-container'>
            <img
              alt=''
              src={addContractIcon}
              width='100'
              height='100'
            />
            <div className='D-no-deals-text'>{t('agreements_page.no_deals')}</div>
            <button onClick={handleCreateContract} className='Button'>{t('agreements_page.new_deal')}</button>
          </div>)}
      <Modal action={handleVerify} buttonName={t('agreements_page.verify_account')} cancelButtonName={t('agreements_page.cancel')}>
        <img
          alt=''
          src={userIcon}
          width='100'
          height='100'
        />
        <h6>{t('agreements_page.cant_create_contract')}</h6>
        {t('agreements_page.account_not_verified')}
      </Modal>
    </div>
  )
}

export default ContractsOverview
