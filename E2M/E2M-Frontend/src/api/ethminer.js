import React from "react";
import Cache from "../comps/eth.cache"
import FetchLatestPool from '../comps/py-server-scripts/scrLatestPool'
export default class EtherMiner extends React.Component 
{
	ethCache = Cache;

	state = {
		wallet: null,
		loading: true,
		ethpool: null,
		ethstats: null,
		threshold: 0.9,
		units: 1000000000000000000
	};

	async componentDidMount()
	{
		if(this.props.wallet === Cache({path: 0, ethpool: 0}))
		{ this.state.wallet = Cache({path: 0, ethpool: 0}); }
		else {this.state.wallet = Cache({path: 0, ethpool: 0});}
		
		
		var minerURL = "https://api.ethermine.org/miner/" + this.state.wallet + "/dashboard";

		var response = await fetch(minerURL);
		var data = await response.json();

		this.setState({ethpool: data.data});

		minerURL = "https://api.ethermine.org/miner/" + this.state.wallet + "/currentStats";
		response = await fetch(minerURL);
		data = await response.json();

		this.setState({ethstats: data.data})

		this.calibrateThreshold();

		this.setState({loading: false});
	}

	calibrateThreshold()
	{
		var threshold = this.state.ethstats.coinsPerMin;
		threshold *= 60; threshold *= 24; threshold *= 7; threshold *= 4;

		if(threshold > 1) threshold = 1;

		this.setState({threshold: Math.round(threshold * 100) / 100})
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
						Unpaid (ETH): <FetchLatestPool option="pay" threshold={this.state.threshold}/>
						Pay Users?: {(this.state.ethpool.currentStatistics.unpaid / this.state.units.toFixed(5) >= this.state.threshold) ? "true" : "false"} <br/>

						Pot Target / Unpaid: <FetchLatestPool option="pot" threshold={this.state.threshold} currentmined={this.state.ethpool.currentStatistics.unpaid} units={this.state.units} />

						Total Target / Unpaid: <FetchLatestPool option="total-pot" threshold={this.state.threshold} currentmined={this.state.ethpool.currentStatistics.unpaid} units={this.state.units} />

						Profit: <FetchLatestPool option="profit" threshold={this.state.threshold} currentmined={this.state.ethpool.currentStatistics.unpaid} units={this.state.units} />
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
						Pot Target / Unpaid: <FetchLatestPool option="pot" threshold={this.state.threshold} currentmined={this.state.ethpool.currentStatistics.unpaid} units={this.state.units} />
					</div>}
				</div>
			);
		}
	}
}