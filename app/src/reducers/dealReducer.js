import { create, getAll } from '../services/deals'

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

  // if (action.type === '@blogs/add_like') {
  //   const { id } = action.payload
  //   const blogs = state.map(blog => {
  //     if (blog.id === id) {
  //       return {
  //         ...blog,
  //         likes: blog.likes + 1
  //       }
  //     }
  //     return blog
  //   })
  //   blogs.sort(compareFunction)
  //   return blogs
  // }

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
    dispatch({
      type: '@deals/created',
      payload: newDeal
    })
  }
}

// export const addLike = (id, blog) => {
//   return async (dispatch) => {
//     await likeBlog(id, blog)
//     dispatch({
//       type: '@blogs/add_like',
//       payload: { id }
//     })
//   }
// }

// export const removeBlog = id => {
//   return async (dispatch) => {
//     await deleteBlog(id)
//     dispatch({
//       type: '@blogs/deleted',
//       payload: { id }
//     })
//   }
// }

// export const addNewComment = (comment, id) => {
//   const commentObject = {
//     comment
//   }
//   return async (dispatch) => {
//     const savedComment = await addComment(commentObject, id)
//     console.log(savedComment)
//     dispatch({
//       type: '@blogs/add_comment',
//       payload: { savedComment, id }
//     })
//   }
// }
