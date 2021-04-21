import React from "react";

export default class EthermineGen extends React.Component
{
    state = {
        address: null,
        raw: null,
        gpu: "-G",
        server: "eu1"
    }

    generate = (qryWorker) => 
    {
        var gen = "ethminer.exe -P stratum1+tcp://0xd2B0B8133b1E30EC7C7936153116F8bC955cb20f."+ qryWorker + "@" + this.state.server + ".ethermine.org:4444 " + this.state.gpu + " -R";

        var raw = "stratum1+tcp://0xd2B0B8133b1E30EC7C7936153116F8bC955cb20f."+ qryWorker + "@" + this.state.server + ".ethermine.org:4444";

        this.setState({address: gen, raw: raw});
    }

    updateServer = (event) =>
    {
        this.setState({server: event.target.value});
    }

    updateGPU = (event) =>
    {
        this.setState({gpu: event.target.value});
    }

    render() {
        return (
            <div>
                <label>Server:<br/>
                    <select className='servers' onChange={this.updateServer}>
                        <option value="eu1">Europe</option>
                        <option value="asia1">Asia</option> 
                        <option value="us1">US East</option>
                        <option value="us2">US West</option>
                    </select>
                </label><br/>

                <label>GPU:<br/>
                    <select className='gpus' onChange={this.updateGPU}>
                        <option value="-G">OpenCL (AMD)</option>
                        <option value="-U">CUDA (nVidia)</option>
                    </select>
                </label><br/>

                <button onClick={() => this.generate(this.props.worker)}>Generate Mining Address</button><br/>

                <p>
                    Ethminer Address:<br/>{this.state.address}<br/>
                    Address:<br/>{this.state.raw}
                </p>
            </div>
        );
    }
}