import React, { Component} from 'react';
import { Authentication } from '../components';
import { connect } from "react-redux";
import { loginRequest } from "../actions/authentication";
class Login extends Component{
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw){
    console.log("Login 컨테이너 컴포넌트 handleLogin 호출됨");
    return this.props.loginRequest(id, pw).then(
      ()=>{
          console.log("Login 컨테이너 loginRequest 정상적으로 완료");
          if(this.props.status === "SUCCESS"){
            let loginData = {
              isLoggedIn: true,
              username: id
            };

            document.cookie = 'key='+btoa(JSON.stringify(loginData));
            this.props.history.push("/");
            return true;
          }else{
            console.log("Login 컨테이너 loginRequest 비정상 완료");
            let $toastContent = $('<span style="color : #FFB4BA">Incorrect username of password 으아아아</span>');
            Materialize.toast($toastContent, 2000);
            return false;
          }
      }
    );
  }

  render(){
    return(
      <div>
        <Authentication mode={true} onLogin={this.handleLogin}/>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    status : state.authentication.login.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest : (id, pw) => {
      return dispatch(loginRequest(id, pw));
    }
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
