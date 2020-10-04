import axios from 'axios';
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT
} from './ActionTypes';

//Register
export function registerRequest(username, password){
  return (dispatch) => {
      dispatch(register());

      return axios.post('/api/account/signup', {username, password})
      .then((response)=>{
        console.log(response);
        dispatch(registerSuccess());
      }).catch((error)=>{
        console.log(error);
        dispatch(registerFailure(error.response.data.code));
      });
  };
}

export function register(){
  return {
    type : AUTH_REGISTER
  };
}

export function registerSuccess(){
  return {
    type : AUTH_REGISTER_SUCCESS
  };
}

export function registerFailure(error){
  return {
    type : AUTH_REGISTER_FAILURE,
    error
  };
}

//login
export function loginRequest(username, password){
  return (dispatch) => {
    console.log("Login thunk 함수 호출됨");
    dispatch(login());

    return axios.post("/api/account/signin", {username, password})
        .then((response) => {
          console.log("서버로 응답 받음");
          dispatch(loginSuccess(username));
        })
        .catch((error)=>{
          dispatch(loginFailure());
        });
  };
}

export function login(){
  return {
    type : AUTH_LOGIN
  };
}

export function loginSuccess(username){
  return {
    type : AUTH_LOGIN_SUCCESS,
    username
  };
}

export function loginFailure(){
  return {
    type : AUTH_LOGIN_FAILURE
  };
}

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.username)); //HTTP 틍신을 통해 username을 빋이옴
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus(){
  return {
    type : AUTH_GET_STATUS
  };
}

export function getStatusSuccess(username){
  return {
    type : AUTH_GET_STATUS_SUCCESS,
    username
  };
}

export function getStatusFailure(){
  return {
    type : AUTH_GET_STATUS_FAILURE
  };
}

/* Logout */
export function logoutRequest(){
  return (dispatch) => {
    return axios.post('/api/account/logout')
    .then((response)=>{
        dispatch(logout());
    });
  };
}


export function logout(){
  return {
    type : AUTH_LOGOUT
  };
}
