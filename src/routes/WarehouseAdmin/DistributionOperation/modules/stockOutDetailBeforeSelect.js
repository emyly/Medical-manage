/**
 * Created by wangming on 11/18/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
import { GET_ORDERDETAIL_DATA_SUCCESS } from '../../../../components/OrderBasicInfoForm/modules/orderBasicInfoForm'

export const GET_DOTEMPORARY_DATA = 'GET_DOTEMPORARY_DATA';
export const GET_DOTEMPORARY_DATA_SUCCESS = 'GET_DOTEMPORARY_DATA_SUCCESS';
export const GET_DOTEMPORARY_DATA_FAIL = 'GET_DOTEMPORARY_DATA_FAIL';


export function getTemporaryStorage(orderId) {
  return {
    type: GET_DOTEMPORARY_DATA,
    payload: orderId
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORDERDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    orderData: action.response
  }),
  [GET_DOTEMPORARY_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      temporaryData: action.response,
      errorData: {}
    })
  },
  [GET_DOTEMPORARY_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response,
    temporaryData: [],
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderData: {},
  errorData: {},
  temporaryData: [],
};

export default function getStockOutCurrentOrderDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
