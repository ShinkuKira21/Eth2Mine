import React from 'react';
import EtherMinerWorker from '../api/ethminer-miner';

export default class WorkerSearch extends React.Component
{
    state = {
        input: null,
        bSearch: false
    }

    retrieveSearch = () =>
    {
        this.setState({bSearch: true});
    }

    updateSearch = (event) =>
    {
        this.setState({bSearch: false, input: event.target.value})
    }

    render() {
        return (
            <div className='worker-search'>
                <input type='text' onChange={this.updateSearch}/>
                <button onClick={() => this.retrieveSearch()}>Search</button>
                {this.state.bSearch ? 
                    <div>
                        <EtherMinerWorker worker={this.state.input} admin={true}/>
                    </div> : <div></div>}
            </div>
        );
    }
}