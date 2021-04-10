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
            premium: 30, // premium
        },

        // Up to 200MH/s
        mediumRewards: {
            bronze: 12, // bronze
            silver: 100, // silver
            gold: 120, // gold
            premium: 200, // premium
        },

        //Up to 450MH/s
        highRewards: {
            bronze: 20.50, // bronze
            silver: 170, // silver
            gold: 345, // gold
            premium: 500, // premium
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
   return 0;
}