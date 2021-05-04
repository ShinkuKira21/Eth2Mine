import React from "react";

export default class EthermineGen extends React.Component
{
    state = {
        bDisplay: false,
        address: null,
        raw: null,
        os: "win",
        gpu: "-G",
        server: "eu1"
    }

    generate = (qryWorker) => 
    {
        var gen = "ethminer"

        if(this.state.os == "win") gen += ".exe"

        gen += " -P stratum1+tcp://0xd2B0B8133b1E30EC7C7936153116F8bC955cb20f."+ qryWorker + "@" + this.state.server + ".ethermine.org:4444 " + this.state.gpu + " -R";
        var raw = "stratum1+tcp://0xd2B0B8133b1E30EC7C7936153116F8bC955cb20f."+ qryWorker + "@" + this.state.server + ".ethermine.org:4444";

        this.setState({address: gen, raw: raw, bDisplay: true});
    }

    updateOS = (event) =>
    { this.setState({os: event.target.value, bDisplay: false}); }

    updateServer = (event) =>
    { this.setState({server: event.target.value, bDisplay: false}); }

    updateGPU = (event) =>
    {   this.setState({gpu: event.target.value, bDisplay: false}); }

    render() {
        return (
            <div>
                <label>Operating System:<br/>
                    <select className='os' onChange={this.updateOS}>
                        <option value="win">Windows</option>
                        <option value="lin">Linux</option>
                    </select>
                </label>

                <label>Server:<br/>
                    <select className='servers' onChange={this.updateServer}>
                        <option value="eu1">Europe</option>
                        <option value="asia1">Asia</option> 
                        <option value="us1">US East</option>
                        <option value="us2">US West</option>
                    </select>
                </label>

                <label>GPU:<br/>
                    <select className='gpus' onChange={this.updateGPU}>
                        <option value="-G">OpenCL (AMD)</option>
                        <option value="-U">CUDA (nVidia)</option>
                    </select>
                </label><br/>

                <button onClick={() => this.generate(this.props.worker)}>Generate Mining Address</button><br/>

                <p>
                    {this.state.bDisplay ? <div className='worker-generation'>
                        Ethminer Address:<br/>{this.state.address}<br/>
                        Address:<br/>{this.state.raw}
                    </div> : <div></div>}
                </p>
            </div>
        );
    }
}