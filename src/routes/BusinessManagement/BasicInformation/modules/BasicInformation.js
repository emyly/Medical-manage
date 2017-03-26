/**
 * Created by liuyali on 2016/11/5.
 */
export const POST_BASICINFO_DATA = 'POST_BASICINFO_DATA';
export const POST_BASICINFO_DATA_SUCCESS = 'POST_BASICINFO_DATA_SUCCESS';
export const POST_BASICINFO_DATA_ERROR = 'POST_BASICINFO_DATA_ERROR';

/*
* 初始化上传
* */
export const SET_BASICINFO_DATA_INIT = 'SET_BASICINFO_DATA_INIT';

// "WDMC":"xxxx",//文档名称
//   "SSJXSID":"1000004",//所属经销商ID
//   "CJR":"102"//创建人
export function getBasicInfoData(imgArr) {
  return {
    type: POST_BASICINFO_DATA,
    payload: {
      imgArr
    }
  }
}

export function setBasicInfoDataInit() {
  return {
    type: SET_BASICINFO_DATA_INIT,
  }
}


const ACTION_HANDLERS = {
  [SET_BASICINFO_DATA_INIT]: (state) => Object.assign({}, state, {
    uploadFin: false,
    idArr: []
  }),
  [POST_BASICINFO_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    uploadFin: true, idArr: action.idArr
  }),
  [POST_BASICINFO_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error, idArr: action.idArr
  }),
};

const initialState = {
  uploadFin: false,
  idArr: []
}


export default function getBasicInfoDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
