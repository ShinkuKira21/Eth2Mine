import {useState, useEffect} from "react";

function FetchLatestPool(props)
{
    const [latestPool, setLatestPool] = useState(0);

    // totalMined (since last pool payout)
    // totalPayout (pending)
    useEffect(() => {
        fetch('/pool-details').then(res => res.json()).then(data => {
        setLatestPool({totalMined: data.totalMined, totalPayout: data.totalPayout});});
    }, []);

    var currentmined = 0;
    if(props.currentmined) currentmined = props.currentmined;

    if(props.option === "pot")
        return (
            <div className='pot'>
                {props.threshold} / {(latestPool.totalMined - latestPool.totalPayout).toFixed(5)}
            </div>
        );
    
    else if(props.option === "pay")
        return (
            <div className='pay'>
                {latestPool.totalPayout} ETH
            </div>
        );

    else if(props.option === "profit")
        return (
            <div className='profit'>
                {(latestPool.totalMined - latestPool.totalPayout).toFixed(5)} ETH
            </div>
        );

    else
        return (
            <div className='total-pot'>
                    {props.threshold} / {latestPool.totalMined}
            </div>
        );
}

export default FetchLatestPool