import { create, getAll, sign } from '../services/deals'
import { setNotification, removeNotification } from './notificationReducer'

const compareFunction = (objectA, objectB) => {
  return objectB.date - objectA.date
}

const initialState = []

export const dealReducer = (state = initialState, action) => {
  if (action.type === '@deals/init') {
    const deals = action.payload
    deals.sort(compareFunction)
    return deals
  }

  if (action.type === '@deals/created') {
    return [...state, action.payload]
  }

  if (action.type === '@deals/sign') {
    const dealUpdated = action.payload
    const deals = state.map(deal => {
      if (deal.id === dealUpdated.id) {
        return {
          ...deal,
          signedBy: dealUpdated.signedBy
        }
      }
      return deal
    })
    deals.sort(compareFunction)
    return deals
  }

  // if (action.type === '@blogs/add_comment') {
  //   console.log(action.payload)
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
  //   console.log('ha entrado')
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
    const newDeal = await create(deal)
    dispatch(setNotification('Deal successfully created.'))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch({
      type: '@deals/created',
      payload: newDeal
    })
  }
}

export const signDeal = (id, users) => {
  return async (dispatch) => {
    const dealUpdated = await sign(id, users)
    dispatch({
      type: '@deals/sign',
      payload: dealUpdated
    })
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
