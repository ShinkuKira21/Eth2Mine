import { Component } from "react";

export default class AccountActions extends Component
{
    render ()
    {
        if(window.location.pathname === "/account/action-changepwd")
        {
            return (
                <div>
                    Change Password
                </div>
            );
        }
        else
        {
            return (
                <div>
                </div>
            );
        }
    }
}