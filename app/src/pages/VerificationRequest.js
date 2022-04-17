import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import '../css/verificationRequest.css'
import { userEdit } from '../reducers/userReducer'
import { getImage } from '../services/deals'

export default function VerificationRequest () {
  const { id } = useParams()
  const user = useSelector(state => state.users).find(user => user.id === id.toString())

  const [frontPhoto, setFrontPhoto] = useState('')
  const [backPhoto, setBackPhoto] = useState('')
  const [selfie, setSelfie] = useState('')

  const dispatch = useDispatch()

  const handleAccept = () => {
    dispatch(userEdit(user.id, { status: 'active' }))
  }

  const handleDeny = () => {
    dispatch(userEdit(user.id, { status: 'missing-kyc' }))
  }

  if (!user) {
    return <></>
  } else {
    getImage(user.idFrontPhoto).then(data => {
      setFrontPhoto(data)
    }).catch(err => { console.log(err) })
    if (user.idBackPhoto) {
      getImage(user.idBackPhoto).then(data => {
        setBackPhoto(data)
      }).catch(err => { console.log(err) })
    }
    if (user.selfie) {
      getImage(user.selfie).then(data => {
        setSelfie(data)
      }).catch(err => { console.log(err) })
    }
  }
  return (
    <div className='vr-container'>
      <h1>Verificación de identidad</h1>
      <div>Status: {user.status} </div>
      <div>Nombre: {user.name}</div>
      <div>Apellidos: {user.surname}</div>
      <div>Tipo de cuenta: {user.type}</div>
      <div>Tipo de documento: {user.documentType}</div>
      <div>Número de documento: {user.documentNumber}</div>
      <div>País de expedición: {user.name}</div>
      <div>
        <div>
          <div>Parte delantera del Documento: </div>
          <img src={frontPhoto} alt='' width='200px' height='auto' />
        </div>
        <div>
          <div>Parte trasera del Documento: </div>
          <img src={backPhoto} alt='' width='200px' height='auto' />
        </div>
        <div>
          <div>Selfie: </div>
          <img src={selfie} alt='' width='200px' height='auto' />
        </div>
      </div>
      {user.status === 'kyc_in_progress'
        ? (
          <div>
            <button onClick={handleAccept}>
              Aceptar
            </button>
            <button onClick={handleDeny}>
              Denegar
            </button>
          </div>)
        : <></>}
    </div>
  )
}
