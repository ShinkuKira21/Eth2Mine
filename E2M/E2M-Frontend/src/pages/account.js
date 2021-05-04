import { ReactSession } from "react-client-session";
import { NavLink } from "react-router-dom";
import EtherMinerWorker from "../api/ethminer-miner"
import EthermineGen from "../comps/ethermine-gen";

const account = () => 
{
    return (
        <div className='account'>
            <h1>Account Settings</h1>
            {/*Account Settings would be nice in sidebar*/}
            <div className="account-cpwd">
                <NavLink to='/account/action-changepwd'>Change Password</NavLink>
            </div>
            <h1>Account Information</h1>
            <div className='form-controls'>
            <GenerateMiningAddress qryWorker='cg'/>

                <a href="https://github.com/ethereum-mining/ethminer/releases">Ethminer (Recommended)</a><br/>
                <a href="https://github.com/todxx/teamredminer/releases">Team Red Miner</a><br/>
                <a href="https://github.com/Lolliedieb/lolMiner-releases">lolMiner</a><br/>
                <a href="https://bitcointalk.org/index.php?topic=2647654.0">Phoenix Miner</a>
            </div>
            <div className='statistics'>
                <LoadAccount qryWorker={ReactSession.get("username")}/>
            </div>
        </div>
    );
}

function LoadAccount(qryWorker)
{
    const qry = qryWorker;

    return <EtherMinerWorker worker={qry.qryWorker} admin={true}/>;
}

function GenerateMiningAddress(qryWorker)
{
    var qry = qryWorker;
    return <EthermineGen worker={qry.qryWorker}/>
}

export default account;