import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Authentication extends Component{
  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e){
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleRegister(){
    console.log("handleRegister 호출됨");
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onRegister(id, pw).then(
      (result) => {
        if(!result){
          this.setState({
            username:'',
            password:''
          });
        }
      }
    );
  }

  handleLogin(e){
    console.log("handleLogin 호출됨");
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onLogin(id, pw).then(
      (success) => {
        console.log("onLogin 후");
        if(!success){
          this.setState({
            password : ""
          });
        }
      }
    );
  }

  handleKeyPress(e){
    console.log("keyPress 호출됨");
    if(e.charCode == 13){
      console.log("mode 판단 전");
      if(this.props.mode){
        console.log("핸들 로그인 호출 전");
        this.handleLogin();
      }
      else{
        this.handleRegister();
      }
    }
  }

  render(){
    const inputBoxes = (
      <div>
        <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                    name="username"
                    type="text"
                    className="validate"
                    value={this.state.username}
                    onChange={this.handleChange}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}/>
              </div>
      </div>
    );

    const loginView = (
      <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn" onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>


                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
    );

    const registerView = (
      <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <a className="waves-effect waves-light btn" onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
    );

    return(
      <div className="container auth">
              <Link className="logo" to="/">MEMOPAD</Link>
              <div className="card">
                  <div className="header blue white-text center">
                      <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                  </div>
                  {this.props.mode ? loginView : registerView }
              </div>
          </div>
    );
  }
}

Authentication.propTypes = {
  mode : PropTypes.bool
};

Authentication.defaultProps = {
  mode : true
};

export default Authentication;
