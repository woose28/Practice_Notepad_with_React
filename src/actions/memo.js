import axios from 'axios';
import { MEMO_POST,
          MEMO_POST_SUCCESS,
          MEMO_POST_FAILURE,
          MEMO_LIST,
          MEMO_LIST_SUCCESS,
          MEMO_LIST_FAILURE
         } from "./ActionTypes";

export function memoPostRequest(contents){
  return (dispatch) => {
    dispatch(memoPost());

    return axios.post("/api/memo/", {contents})
      .then((response)=>{
        dispatch(memoPostSuccess());
      }).catch((error)=>{
        dispatch(memoPostFailure(error.response.data.code));
      });
  };
}

export function memoPost(){
  return {
    type : MEMO_POST
  };
}

export function memoPostSuccess(){
  return {
    type : MEMO_POST_SUCCESS
  };
}

export function memoPostFailure(error){
  return {
    type : MEMO_POST_FAILURE,
    error
  };
}

export function memoListRequest(isInitial, listType, id, username){
  return (dispatch) => {
    console.log("memoListRequest 호출됨 ");

    dispatch(memoList());

    let url = "/api/memo";

    if(typeof username === "undefined"){
      url = isInitial ? url : '${url}/${listType}/${id}';
    }
    else{
      url = isInitial ? '${url}/${username}' : '${url}/${username}/${listType}/${id}';
    }
    return axios.get(url)
    .then((response)=> {
      console.log("memoListRequest 정상 반환 ");
      console.log(response.data);
      dispatch(memoListSuccess(response.data, isInitial, listType));
    }).catch((err)=>{
      dispatch(memoListFailure());
    });
  };
}

export function memoList(){
  return {
    type : MEMO_LIST
  };
}

export function memoListSuccess(data, isInitial, listType){
  return {
    type : MEMO_LIST_SUCCESS,
    data,
    isInitial,
    listType
  };
}

export function memoListFailure(){
  return {
    type : MEMO_LIST_FAILURE
  };
}
