import Loader from 'react-loader-spinner'
import React, { Component } from 'react';
 
class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
        <Loader 
        type="TailSpin"
        color="#A8A8A8"
        height="30"	
        width="30"
     />   
    )
  }
}


export default Spinner;