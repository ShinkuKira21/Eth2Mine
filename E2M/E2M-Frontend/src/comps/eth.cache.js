// This will end up being a JSON Server Cache reader...
// or would syncronise with our database.

function ethcache(props)
{  
    if(props.path === 0)
    {
        return GetWalletAddress(props.ethpool);
    }

    return -1;
}

function GetWalletAddress(index)
{
    const walletAddresses = [
        "d2B0B8133b1E30EC7C7936153116F8bC955cb20f",
    ];

    return walletAddresses[index];
}

/*
function GetMiningPoolCache(miningPoolData)
{
    return miningPoolData;
}*/

export default ethcache