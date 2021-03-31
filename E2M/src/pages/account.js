import EtherMiner from "../api/ethminer";
import EtherMinerWorker from "../api/ethminer-miner"
import EthermineGen from "../comps/ethermine-gen";

var state =
{
    address: "h"
}

const account = () => 
{
    return (
        <div className='account'>
            <h1>Account Information</h1>
            <div className='form-controls'>
            <GenerateMiningAddress qryWorker='cg'/>

                <a href="https://github.com/ethereum-mining/ethminer/releases">Ethminer (Recommended)</a><br/>
                <a href="https://github.com/todxx/teamredminer/releases">Team Red Miner</a><br/>
                <a href="https://github.com/Lolliedieb/lolMiner-releases">lolMiner</a><br/>
                <a href="https://bitcointalk.org/index.php?topic=2647654.0">Phoenix Miner</a>
            </div>
            <div className='statistics'>
                <LoadAccount qryWorker="cg"/>
            </div> 

            <div className='payday'>
                <h2>Request Payment</h2>
            </div>
        </div>
    );
}

function LoadAccount(qryWorker)
{
    const qry = qryWorker;

    return <EtherMinerWorker worker={qry.qryWorker} admin={true}/>;
}

function GenerateMiningAddress(qryWorker, qryWallet)
{
    var qry = qryWorker;
    return <EthermineGen worker={qry.qryWorker}/>
}

export default account;