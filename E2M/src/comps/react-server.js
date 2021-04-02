import React, { useEffect, useState } from 'react'

const fetchMessage = async () => {
    const[ping, setPing] = useState('');
    const message = await fetch('/ping').then(res=>res.text())

    setPing(message);
    return ping;
}

useEffect(() => {
    fetchMessage()
}, []);


function test() {

    return(
        <div><fetchMessage/></div>
    );
}

export default test;