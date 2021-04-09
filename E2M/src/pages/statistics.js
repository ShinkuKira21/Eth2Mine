import EthMiner from  '../api/ethminer.js';
import WorkerSearch from '../comps/worker-search';

const statistics = () => {
    return (
		 <div className='statistics'>
			<h1>Admin | Statistics</h1>
			<GetStatistic />
			<GetWorker />
		 </div>	
    );
}

function GetStatistic(qryWallet)
{
	return <EthMiner wallet={qryWallet} admin={true}/>;
}

function GetWorker(qryWorker)
{
	return <WorkerSearch/>;
}

export default statistics