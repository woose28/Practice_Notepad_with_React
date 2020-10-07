import React , { Component } from 'react';
import { Write, MemoList } from "../components";
import { connect } from "react-redux";
import { memoPostRequest, memoListRequest } from "../actions/memo";
class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      loadingState:false
    }
    this.handlePost = this.handlePost.bind(this);
  }
  handlePost(contents){
    return this.props.memoPostRequest(contents).then(
      () => {
          if(this.props.postStatus.status == "SUCCESS"){
            this.loadNewMemo().then(
              ()=>{
                console.log("listtatus : "+this.props.listStatus);
                Materialize.toast('Success!', 2000);
              }
            );
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

  loadNewMemo(){
    if(this.props.listStatus == "WAITING"){
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    if(this.props.memoData.lenth === 0){
      return this.props.memoListRequest(true);
    }

    return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
  }

  loadOldMemo(){
      // CANCEL IF USER IS READING THE LAST PAGE
      if(this.props.isLast) {
          return new Promise(
              (resolve, reject)=> {
                  resolve();
              }
          );
      }

      // GET ID OF THE MEMO AT THE BOTTOM
      let lastId = this.props.memoData[this.props.memoData.length - 1]._id;

      // START REQUEST
      return this.props.memoListRequest(false, 'old', lastId, this.props.username).then(() => {
          // IF IT IS LAST PAGE, NOTIFY
          if(this.props.isLast) {
              Materialize.toast('You are reading the last page', 2000);
          }
      });
  }

  componentDidMount(){
    const loadUntilScrollable = () => {
          // IF THE SCROLLBAR DOES NOT EXIST,
          if($("body").height() < $(window).height()) {
              this.loadOldMemo().then(
                  () => {
                      // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                      if(!this.props.isLast) {
                          loadUntilScrollable();
                      }
                  }
              );
          }
      };

    const loadMemoLoop = () => {
      this.loadNewMemo().then(
        ()=>{
            this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
        }
      );
    };
    this.props.memoListRequest(true, undefined, undefined, undefined).then(() => {
      loadUntilScrollable();
      loadMemoLoop();
    });

    $(window).scroll(() => {
      if($(document).height() - $(window).height() - $(window).scrollTop() < 250){
        if(!this.state.loadingState){
          this.loadOldMemo();
          this.setState({
            loadingState : true
          });
        }
        else{
          if(this.state.loadingState){
            this.setState({
              loadingState: false
            });
          }
        }
      }
    })
  }
  componentDidUpdate(){
    console.log("Props 업데이트 됨");
    console.log(JSON.stringify(this.props.memoData));
  }
  componentWillUnmount(){
    clearTimeout(this.memoLoaderTimeoutId);
    $(window).unbind();
  }

  render(){
    const write = (<Write onPost={this.handlePost}/>);
    return (
      <div className="wrapper">
        { this.props.isLoggedIn ? write : undefined}
        <MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.authentication.status.isLoggedIn,
    postStatus : state.memo.post,
    currentUser : state.authentication.status.currentUser,
    memoData : state.memo.list.data,
    listStatus : state.memo.list.status,
    isLast : state.memo.list.isLast
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest : (contents) => {
      return dispatch(memoPostRequest(contents));
    },
    memoListRequest : (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
