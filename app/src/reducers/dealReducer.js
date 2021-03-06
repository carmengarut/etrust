import handleError from '../helpers/errorHandler'
import { addContractSigned, create, getAll, sign, updateContract } from '../services/deals'
import { showModal } from './modalReducer'
import { setNotification, removeNotification } from './notificationReducer'

const compareFunction = (objectA, objectB) => {
  return new Date(objectB.date).getTime() - new Date(objectA.date).getTime()
}

const initialState = []

export const dealReducer = (state = initialState, action) => {
  if (action.type === '@deals/init') {
    const deals = action.payload
    deals.sort(compareFunction)
    return deals
  }

  if (action.type === '@deals/created') {
    return [...state, action.payload].sort(compareFunction)
  }

  if (action.type === '@deals/sign') {
    const dealUpdated = action.payload
    const deals = state.map(deal => {
      if (deal.id === dealUpdated.id) {
        if (dealUpdated.signedBy.length >= 2) {
          return {
            ...deal,
            signedBy: dealUpdated.signedBy,
            status: 'Signed',
            fileSigned: dealUpdated.fileSigned
          }
        } else {
          return {
            ...deal,
            signedBy: dealUpdated.signedBy,
            fileSigned: dealUpdated.fileSigned
          }
        }
      } else {
        return deal
      }
    })
    deals.sort(compareFunction)
    return deals
  }

  if (action.type === '@deals/edit') {
    const dealUpdated = action.payload
    const deals = state.map(deal => {
      if (deal.id === dealUpdated.id) {
        return {
          ...deal,
          ...dealUpdated
        }
      }
      return deal
    })
    deals.sort(compareFunction)
    return deals
  }

  // if (action.type === '@blogs/add_comment') {
  //   const { savedComment, id } = action.payload
  //   const blogs = state.map(blog => {
  //     if (blog.id === id) {
  //       return {
  //         ...blog,
  //         comments: [...blog.comments, {
  //           content: savedComment.content,
  //           id: savedComment.id
  //         }]
  //       }
  //     }
  //     return blog
  //   })
  //   return blogs
  // }

  // if (action.type === '@blogs/deleted') {
  //   const { id } = action.payload
  //   const blogs = state.filter(blog => blog.id !== id)
  //   return blogs
  // }

  return state
}

export const dealInit = () => {
  return async (dispatch) => {
    const deals = await getAll()
    dispatch({
      type: '@deals/init',
      payload: deals
    })
  }
}

export const addNewDeal = deal => {
  return async (dispatch) => {
    try {
      const newDeal = await create(deal)
      dispatch(setNotification('Deal successfully created.'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      dispatch({
        type: '@deals/created',
        payload: newDeal
      })
      return newDeal
    } catch (e) {
      handleError(e)
    }
  }
}

export const signDeal = (id, users) => {
  return async (dispatch) => {
    try {
      const dealUpdated = await sign(id, users)
      dispatch({
        type: '@deals/sign',
        payload: dealUpdated
      })
    } catch (e) {
      handleError(e)
    }
  }
}

export const editDeal = (id, object) => {
  return async (dispatch) => {
    try {
      const dealUpdated = await updateContract(id, object)
      dispatch(showModal())
      dispatch({
        type: '@deals/edit',
        payload: dealUpdated
      })
    } catch (e) {
      handleError(e)
    }
  }
}

export const editToAddContractSigned = (id, object) => {
  return async (dispatch) => {
    try {
      const dealUpdated = await addContractSigned(id, object)
      dispatch({
        type: '@deals/edit',
        payload: dealUpdated
      })
    } catch (e) {
      handleError(e)
    }
  }
}

// export const removeBlog = id => {
//   return async (dispatch) => {
//     await deleteBlog(id)
//     dispatch({
//       type: '@blogs/deleted',
//       payload: { id }
//     })
//   }
// }
