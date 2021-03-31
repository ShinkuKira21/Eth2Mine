import React from "react";

export default class Rewards extends React.Component {
    state = {
        memershipType = null,

        // up to 100MH/s
        lowRewards = [
            5, // bronze
            10, // silver
            15, // gold
            30, // premium
        ],

        // Up to 200MH/s
        mediumRewards = [
            10, // bronze
            75, // silver
            90, // gold
            150, // premium
        ],

        //Up to 450MH/s
        highRewards = [
            15, // bronze
            125, // silver
            200, // gold
            300, // premium
        ]
    }
}


function CheckMembership()
{
    
}