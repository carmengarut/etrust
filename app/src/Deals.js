
import Notification from './components/Notification'
import Deal from './components/Deal'
import LoginForm from './components/LoginForm'
import DealForm from './components/DealForm'
import useDeals from './hooks/useDeals'
import { useSelector } from 'react-redux'

import { TableBody, Table, TableContainer, TableRow } from '@material-ui/core'

function Deals () {
  const { deals, addDeal } = useDeals()
  const user = useSelector(state => state.user)

  return (
    <div>
      <h1>Deals</h1>
      <Notification />
      {
        user
          ? <DealForm
              addDeal={addDeal}
            />
          : <LoginForm />
      }

      <TableContainer>
        <Table>
          <TableBody>
            {deals.map((deal, i) =>
              <TableRow key={deal.id}>
                <Deal
                  key={i}
                  deal={deal}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Deals
