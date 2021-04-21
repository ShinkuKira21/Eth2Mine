import { Component } from "react";

export default class TandCs extends Component
{
    // a TCSFile within server to enable TandCs editions.
    state = {
        TCSFile: null,
    }

    render() {
        return(
            <div className='terms-and-conditions'>
                <h1>Terms and Conditions</h1>
                {/* TandCs file will be shown here this could be done a 
                    customisable text editor on admin page */}
                Once the threshold is met, it will never be reset.<br/>
                However, the pot will need to be replenished if dropped.<br/>
                Pot will auto-increment or decrement based on user count.<br/>
                <br/><br/>
                Please allow 24-hours after payday before contacting support.<br/>
                Payday's are every month and please read <a href=''>Reward System</a> to 
                see the reward algorithm.
            </div>
        );
    }
}