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

    if(props.option === "pot")
        return (
            <div className='pot'>
                {console.log(latestPool.totalMined)}
                {props.threshold} / {((latestPool.totalMined) + (props.currentmined / props.units) - latestPool.totalPayout).toFixed(5)}
            </div>
        );
    
    else if(props.option === "pay")
        return (
            <div className='pay'>
                {latestPool.totalPayout} ETH
            </div>
        );

    else if(props.option == "profit")
        return (
            <div className='profit'>
                {(latestPool.totalMined + (props.currentmined / props.units) - latestPool.totalPayout).toFixed(5)} ETH
            </div>
        );

    else
        return (
            <div className='total-pot'>
                {props.threshold} / {(latestPool.totalMined + (props.currentmined / props.units)).toFixed(5)}
            </div>
        );
}

export default FetchLatestPool