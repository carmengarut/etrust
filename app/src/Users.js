import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersInit } from './reducers/usersReducers'
import './css/users.css'

import titleIcon from './public/deals-icon.svg'
import avatar from './public/avatar.svg'

export default function Users () {
  const users = useSelector(state => state.users)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersInit())
  }, [])

  return (
    <div className='UsersContainer'>
      <div className='DealsTitle'>
        <img
          alt=''
          src={titleIcon}
          width='30px'
          height='30px'
        />
        <h1 className='Title'>Users</h1>
      </div>

      <input
        className='SearchField'
        type='text'
        value={search}
        name='Search'
        placeholder='Search'
        onChange={({ target }) => { setSearch(target.value) }}
      />

      {!users[0]
        ? <div />
        : users.filter(user => {
          const fullname = user.name + ' ' + user.surname
          return fullname.toLowerCase().includes(search.toLowerCase())
        }).map(user => (
          <div key={user.id} className='TableRow'>
            <img
              style={{
                width: '60px',
                height: '60px',
                resizeMode: 'contain',
                borderRadius: '50%'
              }}
              src={user.profileImg || avatar}
              alt={user.name}
            />
            <div className='Name'>{user.name} {user.surname}</div>
            <div className='TrustRate'>{user.trustRate} % trust</div>

          </div>))}
    </div>
  )
}
