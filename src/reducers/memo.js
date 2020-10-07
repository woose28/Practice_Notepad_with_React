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

      case types.MEMO_LIST:
        console.log("Reducer MEMO_LIST 호출 됨");
        return {
          ...state,
          list : {
            ...state.list,
            status : "WAITING"
          }
        };


      case types.MEMO_LIST_SUCCESS:
        console.log("Reducer MEMO_LIST_SUCCESS 호출 됨");
        if(action.isInitial){
          console.log("action.isInitial True");
          console.log(JSON.stringify(action.data));
          return {
            ...state,
            list : {
              ...state.list,
              status : "SUCCESS",
              data : action.data,
              isLast : action.data.length < 6
            }
          };
        }
        else {
          if(actionsTypes === "new"){
            return {
              ...state,
              list:{
                ...state.list,
                status : "SUCCESS",
                data : [...action.data, ...state.list.data]
              }
            };
          }
          else{
            return {
              ...state,
              list:{
                ...state.list,
                status : "SUCCESS",
                data : [...state.list.data, ...action.data],
                isLast : action.data.length < 6
              }
            };
          }
        }
        break;
      default :
        console.log("Reducer default 호출됨");
        return state;
  }
}
