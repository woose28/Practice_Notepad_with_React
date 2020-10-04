import * as types from "../actions/ActionTypes";

const initial_state = {
  post : {
    status : "INIT",
    erorr : -1
  },
  list : {
    status : "INIT",
    data : [],
    inLast : false
  },
  edit : {
    status : "INIT",
    error : -1
  },
  remove : {
    status : "INIT",
    error : -1
  },
  star : {
    status : "INIT",
    error : -1
  }
};

export default function memo(state=initial_state, action){
  switch(action.type){
      case types.MEMO_POST:
        return {
          ...state,
          post : {
            ...state.post,
            status : "WAITING",
            error : -1
          }
        };

      case types.MEMO_POST_SUCCESS:
        return {
          ...state,
          post:{
            ...state.post,
            status : "SUCCESS"
          }
        };

      case types.MEMO_POST_FAILURE:
        return {
          ...state,
          post:{
            ...state.post,
            status : "FAILURE",
            error : action.error
          }
        };
      default :
        return state;
  }
}
