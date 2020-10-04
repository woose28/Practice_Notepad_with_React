import React , { Component } from 'react';
import { Write } from "../components";
import { connect } from "react-redux";
import { memoPostRequest } from "../actions/memo";
class Home extends Component{
  constructor(props){
    super(props);
    this.handlePost = this.handlePost.bind(this);
  }
  handlePost(contents){
    return this.props.memoPostRequest(contents).then(
      () => {
          if(this.props.postStatus.status == "SUCCESS"){
            Materialize.toast("SUCCESS~!", 2000);
          }
          else {
            let $toastContent;
                switch(this.props.postStatus.error) {
                    case 1:
                        // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                        $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                        Materialize.toast($toastContent, 2000);
                        setTimeout(()=> {location.reload(false);}, 2000);
                        break;
                    case 2:
                        $toastContent = $('<span style="color: #FFB4BA">Contents should be string</span>');
                        Materialize.toast($toastContent, 2000);
                        break;
                    case 3:
                        $toastContent = $('<span style="color: #FFB4BA">Please write Something</span>');
                        Materialize.toast($toastContent, 2000);
                        break;
                    default:
                        $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                        Materialize.toast($toastContent, 2000);
                        break;
                }
          }
      }
    );
  }
  render(){
    const write = (<Write onPost={this.handlePost}/>);
    return (
      <div className="wrapper">
        { this.props.isLoggedIn ? write : undefined}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.authentication.status.isLoggedIn,
    postStatus : state.memo.post
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest : (contents) => {
      return dispatch(memoPostRequest(contents));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
