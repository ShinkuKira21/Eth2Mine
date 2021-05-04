import React from "react";
import Cache from "../comps/eth.cache"
import GetAccount from "../comps/py-server-scripts/scrGetAccount";

export default class EtherMinerWorker extends React.Component {
	ethCache = Cache;

	state = {
		wallet: null,
		loading: true,
		ethpool: null,
		history: null,
		hours: [],
		units: 1000000
	};

	async componentDidMount()
	{
		if(this.props.wallet === Cache({path: 0, ethpool: 0}))
		{ this.state.wallet = Cache({path: 0, ethpool: 0}); }
		else {this.state.wallet = Cache({path: 0, ethpool: 0});}

		const minerURL = "https://api.ethermine.org/miner/" + this.state.wallet + "/worker/" + this.props.worker + "/currentStats";

		const minerHistoryURL = "https://api.ethermine.org/miner/" + this.state.wallet + "/worker/" + this.props.worker + "/history";

		var response = await fetch(minerURL);
		var data = await response.json();

		this.state.ethpool = data.data;

		response = await fetch(minerHistoryURL);
		data = await response.json();

		this.setState({history: data.data, loading: false});
	}

	render() {
		if(this.props.admin)
		{
			return (
				<div className="admin-miner-information">
					{this.state.loading ? <div>Loading...</div> :
					<div className='worker-info'>
						<h2>Worker Information</h2>
						Worker Name: {this.props.worker} <br/>
						Worker Last Seen: {GetTime(this.state.ethpool.lastSeen)}<br/>
						Current Hashrate: {(this.state.ethpool.currentHashrate / this.state.units).toFixed(2)}MH/s <br/>
						Average Hashrate: {(this.state.ethpool.averageHashrate / this.state.units).toFixed(2)}MH/s <br/>
						Reported Hashrate: {(this.state.ethpool.reportedHashrate / this.state.units).toFixed(2)}MH/s <br/>			
						Current Mining Time: {GetWorkerHours(this.state.history)[0]} hours<br/>
						<GetAccount mode={0} worker={this.props.worker}/>
					</div>}
				</div>
			);
		}
		else
		{
			return (
				<div className="miner-information">
					{this.state.loading ? <div>Loading...</div> :
					<div className='worker-info'>
					</div>}
				</div>
			);
		}
	}
}

function GetWorkerHours(data)
{
	var info = [];
	var hours = [];

	for(var i = 0; data[i] != null; i++)
	{
		if(i === 0) hours[0] = data[i].time;
		if(data[i + 1] != null) hours[1] = data[i].time;
	}

	var difference = hours[1] - hours[0];
	var hourCount = (difference / 60 / 60).toFixed(2);

	info[0] = hourCount;

	return info;
}

function GetTime(lastSeen)
{
	var currentTime = new Date().valueOf()/1000;
	currentTime = currentTime.toFixed(0) - lastSeen;
	var hours = (currentTime / 60 /60).toFixed(2);

	if(isNaN(hours))
		hours = "Never";

	else if(hours < 1)
		hours = "Now";		

	else
		hours += " Hours";

	return hours;
}