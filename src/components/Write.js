import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Write extends Component{

    constructor(props){
      super(props);
      this.state = {
        contents : ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handlePost = this.handlePost.bind(this);
    }
    handleChange(e){
      this.setState({
        contents : e.target.value
      });
    }

    handlePost(){
      let contents = this.state.contents;
      this.props.onPost(contents).then(
        () => {
          this.setState({
            contents:""
          });
        }
      );
    }
    render(){
      return(
        <div className="container write">
          <div className="card">
            <div className="card-content">
              <textarea className="materialize-textarea" placeholder="Write down your memo"
                        onChange={this.handleChange} value={this.state.contents}></textarea>
            </div>
            <div className="card-action">
              <a onClick={this.handlePost}>POSt</a>
            </div>
          </div>
        </div>

      );
    }
}

Write.PropTypes = {
  onPost : PropTypes.func
}

Write.defaultProps = {
  onPost : (contents) => { console.error("post function not defined"); }
}

export default Write;
