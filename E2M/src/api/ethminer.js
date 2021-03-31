import React from "react";
import Cache from "../comps/eth.cache"

export default class EtherMiner extends React.Component {
	ethCache = Cache;

	state = {
		wallet: null,
		loading: true,
		ethpool: null,
		units: 1000000000000000000
	};

	async componentDidMount()
	{
		if(this.props.wallet === Cache({path: 0, ethpool: 0}))
		{ this.state.wallet = Cache({path: 0, ethpool: 0}); }
		else {this.state.wallet = Cache({path: 0, ethpool: 0});}
		
		
		const minerURL = "https://api.ethermine.org/miner/" + this.state.wallet + "/dashboard";

		const response = await fetch(minerURL);
		const data = await response.json();

		this.setState({ethpool: data.data, loading: false});
	}

	render() {
		if(this.props.admin)
		{
			return (
				<div className='admin-pool-statistics'>
					{this.state.loading ? <div>Loading...</div> :
					<div className='mining-pool-info'>
						<h2>Mining Pool Information</h2>
						Mining Pool Name: Eth4Default <br/>
						Wallet: {this.state.wallet} <br/>
						Worker(s): {this.state.ethpool.currentStatistics.activeWorkers} <br/>
						Unpaid (ETH): {(this.state.ethpool.currentStatistics.unpaid / this.state.units).toFixed(5)} <br/>
						Pay Users?: {(this.state.ethpool.currentStatistics.unpaid / this.state.units.toFixed(5) >= 0.9) ? "true" : "false"} <br/>
						Target / Unpaid: 0.9 / {(this.state.ethpool.currentStatistics.unpaid / this.state.units).toFixed(5)}
					</div>}
				</div>
			);
		}
		else
		{
			return (
				<div>
					{this.state.loading ? <div>Loading...</div> :
					<div className='pool-info'>
						Target / Unpaid: 0.9 / {(this.state.ethpool.currentStatistics.unpaid / this.state.units).toFixed(5)}
					</div>}
				</div>
			);
		}
	}
}