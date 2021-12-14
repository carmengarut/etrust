import { Container } from 'react-bootstrap'
import './css/landingPage.css'
import headingImage from './public/heading-img.svg'
import coin from './public/coin.svg'
import standings from './public/standings.svg'
import eye from './public/eye.svg'

const LandingPage = () => {
  return (
    <Container>
      <div className='HeadingBlock'>
        <div className='flex-item-left'>
          <h1 className='H1'>Build trustworthy agreements</h1>
          <h2 className='H2'>Ensure the reliability of the other party and get your agreements fulfilled.</h2>
          <div>
            <button className='ButtonLeft'>How we do it?</button>
            <button className='ButtonRight'>Start Now</button>
          </div>
        </div>

        <img
          alt=''
          src={headingImage}
          width='531px'
          height='418px'
          className='flex-item-right'
        />

      </div>
      <div className='BoxesBlock'>
        <div className='Box'>
          <img
            alt=''
            src={eye}
            width='48px'
            height='48px'
          />
          <h3 className='BoxTitle'>
            Understand other party’s reliability
          </h3>
          <div className='BoxText'>
            Search other parties profile to look at their trust rate. We calculate it based on the perfectage of agreements fulfilled.
          </div>
        </div>
        <div className='Box'>
          <img
            alt=''
            src={standings}
            width='48px'
            height='48px'
          />
          <h3 className='BoxTitle'>
            Ensuring immutability through blockchain technology
          </h3>
          <div className='BoxText'>
            Once signed by both parts, the agreement will be encrypted and stored in the blockchain, ensuring its immutability.
          </div>
        </div>
        <div className='Box'>
          <img
            alt=''
            src={coin}
            width='48px'
            height='48px'
          />
          <h3 className='BoxTitle'>
            Enforce the fulfillment of your agreements
          </h3>
          <div className='BoxText'>
            You will evaluate the fullfilment of the other part when the agreement is completed. This feedback will be public, enforcing good behaviour.
          </div>
        </div>
      </div>
    </Container>

  )
}

export default LandingPage
