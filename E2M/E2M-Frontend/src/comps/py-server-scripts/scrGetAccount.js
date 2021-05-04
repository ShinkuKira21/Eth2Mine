import React, {Component} from 'react'
import axios from 'axios'

export default class GetAccount extends Component 
{
  state = {
    bLoading: true,
    data: null
  }

  componentDidMount() {
    this.fetchPing();
    this.setState({bIsFetched: ""})
  }

  fetchPing = async() => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/account/get-data`, {
      workerName: this.props.worker,
      mode: this.props.mode}, {'content-type':'application/json'}
    );
    
    this.setState({data: data.data, bLoading: false});

    console.log(this.state.data)
  }

  render() {
    // Mode 0 gets rewards.
    if(this.props.mode === 0)
        return(
            <div>
                {!this.state.bLoading ?
                    <div className='rewards'>
                        Earnt Rewards: {this.state.data} ETH
                    </div> : null
                }
            </div>
        );

    else return (
            <div>
                {!this.state.bLoading ?
                    <div>
                        
                    </div> : null
                }
            </div>
        );
  }
}