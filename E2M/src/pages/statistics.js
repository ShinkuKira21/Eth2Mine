import EtherMinerWorker from '../api/ethminer-miner.js';
import EthMiner from  '../api/ethminer.js'

const statistics = () => {
    return (
		 <div className='page-title'>
			<h1>Admin | Statistics</h1>
			<SearchWallet/>
			
		 </div>	
    );
}

function SearchWallet()
{
	const bSearch = false;

	return(
		<div>
			<input></input>
			<button value="">Search</button>
			<GetStatistic />
			<GetWorker qryWorker="cg"/>
			<GetWorker qryWorker="tester-drshocking12"/>
			<GetWorker qryWorker="tester-ella"/>
			<GetWorker qryWorker="tester-JohnF56"/>
			<GetWorker qryWorker="tester-vhoon"/>
			<GetWorker qryWorker="tester-rbvortex"/>
		</div>
	);
}

function GetStatistic(qryWallet)
{
	return <EthMiner wallet={qryWallet} admin={true}/>;
}

function GetWorker(qryWorker)
{
	const qry = qryWorker;
	return <EtherMinerWorker worker={qry.qryWorker} admin={true}/>;
}

function GetWorkerHistory()
{
	
}

export default statistics