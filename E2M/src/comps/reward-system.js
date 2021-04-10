import React from "react";

export default class Rewards extends React.Component {
    state = {
        memershipType: null,

        // up to 100MH/s
        lowRewards: {
            bronze: 5, // bronze
            silver: 10, // silver
            gold: 15, // gold
            premium: 30, // premium
        },

        // Up to 200MH/s
        mediumRewards: {
            bronze: 10, // bronze
            silver: 75, // silver
            gold: 90, // gold
            premium: 150, // premium
        },

        //Up to 450MH/s
        highRewards: {
            bronze: 15, // bronze
            silver: 125, // silver
            gold: 250, // gold
            premium: 360, // premium
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

function RecordHours(hours)
{
    // only record for Pay Hours Field
    if(hours <= 4) return;
    
    return; // set total hours for rewards to increase.
}

function GetEarntRewards(rate, hours)
{
    return hours * rate; 
}

function GetMiningHours()
{
    // Gather from Database (Pay Hours Field)
   return 10;
}