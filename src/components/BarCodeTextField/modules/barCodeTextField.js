// ------------------------------------
// Constants
// ------------------------------------
export const GET_BARCODEOUT_DATA = 'GET_BARCODEOUT_DATA'
export const GET_BARCODEOUT_DATA_SUCCESS = 'GET_BARCODEOUT_DATA_SUCCESS'
export const GET_BARCODEOUT_DATA_FAIL = 'GET_BARCODEOUT_DATA_FAIL'
export const GET_BARCODEIN_DATA = 'GET_BARCODEIN_DATA'
export const GET_BARCODEIN_DATA_SUCCESS = 'GET_BARCODEIN_DATA_SUCCESS'
export const GET_BARCODEIN_DATA_FAIL = 'GET_BARCODEIN_DATA_FAIL'
export const BARCODE_CLEAR_ERROR_MSG = 'BARCODE_CLEAR_ERROR_MSG'


// ------------------------------------
// Actions
// ------------------------------------
export function clearErrorMsg() {
  return {
    type: BARCODE_CLEAR_ERROR_MSG
  }
}

export function getBarcodeOut(params) {
  console.debug('orderBasicInfoForm.js getBarcodeOut');
  return {
    type: GET_BARCODEOUT_DATA,
    payload: params
  }
}

export function getBarcodeIn(params) {
  console.debug('orderBasicInfoForm.js getBarcodeIn');
  return {
    type: GET_BARCODEIN_DATA,
    payload: params
  }
}

export const actions = {
  getBarcodeOut,
  getBarcodeIn
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BARCODEOUT_DATA]: (state, action) => state,
  [GET_BARCODEOUT_DATA_SUCCESS]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_SUCCESS:', state, action);
    return Object.assign({}, state, {
      status: true,
      barCodeData: action.response,
      error: ''
    })
  },
  [GET_BARCODEOUT_DATA_FAIL]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_FAIL:', state, action);
    return Object.assign({}, state, {
      status: false,
      error: action.response,
      barCodeData: {}
    })
  },
  [GET_BARCODEIN_DATA]: (state, action) => state,
  [GET_BARCODEIN_DATA_SUCCESS]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_SUCCESS:', state, action);
    return Object.assign({}, state, {
      status: true,
      barCodeData: action.response,
      error: ''
    })
  },
  [GET_BARCODEIN_DATA_FAIL]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_FAIL:', state, action);
    return Object.assign({}, state, {
      status: false,
      error: action.response,
      barCodeData: {}
    })
  },
  [BARCODE_CLEAR_ERROR_MSG]: (state, action) => Object.assign({}, state, {
    status: true,
    error: null,
    barCodeData: {},
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  barCodeData: {},
  error: null,
}

export default function barCodeTextFieldReducer(state = initialState, action) {
  console.debug('barCodeTextField.js barCodeTextFieldReducer;', action);
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
