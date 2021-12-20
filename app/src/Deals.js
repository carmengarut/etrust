import { useEffect } from 'react'
import Notification from './components/Notification'
import Deal from './components/Deal'
import { useTranslation } from 'react-i18next'

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { dealInit } from './reducers/dealReducer'
import { ratingInit } from './reducers/ratingReducer'
import './css/deals.css'
import dealsIcon from './public/deals-icon.svg'

function Deals () {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  useEffect(() => {
    dispatch(dealInit())
    dispatch(ratingInit())
  }, [])

  return (
    <div className='DealsContainer'>
      <div className='DealsTitle'>
        <img
          alt=''
          src={dealsIcon}
          width='30px'
          height='30px'
        />
        <h1 className='Title'>{t('agreements_page.agreements')}</h1>
      </div>
      <Notification />
      <div className='ButtonContainer'>
        <button onClick={() => history.push('/create-deal')} className='Button'>{t('agreements_page.new_deal')}</button>
      </div>

      <div className='TableHeader'>
        <div className='ColumnTitleDeal'>{t('agreements_page.title')}</div>
        <div className='Columns2TitleContainer'>
          <div className='ColumnTitle'>{t('agreements_page.user')}</div>
          <div className='ColumnTitle'>{t('agreements_page.creation_date')}</div>
        </div>
        <div className='BatchesTitleContainer'>
          <div className='ColumnTitle'>{t('agreements_page.signed')}</div>
          <div className='ColumnTitle'>{t('agreements_page.status')}</div>
        </div>
      </div>
      {deals.filter(deal => {
        if (deal.createdBy.id) return (deal.createdBy.id === user.id || deal.members.find(member => member.id === user.id))
        return (deal.createdBy === user.id || deal.members.find(member => member.id === user.id))
      }).map((deal, i) =>
        <Deal
          key={i}
          deal={deal}
        />
      )}

    </div>
  )
}

export default Deals
