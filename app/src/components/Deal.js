import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../css/deals.css'
import avatar from '../public/avatar.svg'

const Deal = ({ deal }) => {
  const user = useSelector(state => state.user)

  const history = useHistory()
  return (
    <div className='TableRow' key={deal.id} onClick={() => { history.push(`/deals/${deal.id}`) }}>

      <div className='ColumnMemberTitle'>
        {deal.title}
      </div>
      <div className='ColumnsContainer1'>
        <div className='ColumnMember'>
          <img
            src={avatar}
            width='30px'
            height='30px'
            className='Avatar'
          /> {' '}
          {deal.members[0].name}
        </div>
        <div className='ColumnMember'>
          {deal.date.slice(0, 10)}
        </div>
      </div>
      <div className='ColumnsContainer2'>
        <div className='ColumnSignedContainer'>
          <div className='ColumnSigned'>

            {deal.signedBy.find(member => member.id === user.id)
              ? 'Signed'
              : deal.signedBy.find(member => member === user.id)
                ? 'Signed'
                : 'Not signed'}

          </div>
        </div>
        <div className='ColumnStatusContainer'>
          <div className='ColumnStatus'>

            {deal.status}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Deal
