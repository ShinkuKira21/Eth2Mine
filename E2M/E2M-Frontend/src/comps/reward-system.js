import React from "react";

export default class Rewards extends React.Component {
    state = {
        memershipType: null,

        // DOLLARS

        // up to 100MH/s
        lowRewards: {
            bronze: 6.50, // bronze
            silver: 12, // silver
            gold: 20, // gold
            premium: 40, // premium
        },

        // Up to 200MH/s
        mediumRewards: {
            bronze: 12, // bronze
            silver: 30, // silver
            gold: 50, // gold
            premium: 70, // premium
        },

        //Up to 450MH/s
        highRewards: {
            bronze: 20.50, // bronze
            silver: 50, // silver
            gold: 75, // gold
            premium: 95, // premium
        }
    }

    render()
    {
        return(
            <div className="reward-system">
                Earnt Rewards: £{GetEarntRewards(this.state.mediumRewards.silver, GetMiningHours())} -> TO ETH ALGORITHM<br/>
                Total Mining Hours: {GetMiningHours()}
            </div>
        );
    }
}
/*
function RecordHours(hours)
{
    // only record for Pay Hours Field
    if(hours <= 4) return;
    
    return; // set total hours for rewards to increase.
}*/

function GetEarntRewards(rate, hours)
{
    return hours * rate; 
}

function GetMiningHours()
{
    // Gather from Database (Pay Hours Field)
   return 0;
}