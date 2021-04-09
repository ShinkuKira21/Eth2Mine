const register = () => {
    return (
        <div className='Register'>
            <h1>Register</h1>
            <RegisterPrompt />
        </div>
    );
};

function RegisterPrompt() {
    return (
        <div className='register-form'>
            <label>First Name: <input/></label><br/>
            <label>Surname: <input/></label><br/>
            <label>Eth Wallet: <input/></label><br/>
            <label>Password: <input/></label><br/>
            <label>Confirm Password: <input/></label><br/>
            <br/>
            <button>Register</button>
        </div>
    );
}

export default register