import React, { useEffect, useState } from 'react';

function FetchPing()
{
    const [ping, setPing] = useState(0);

  useEffect(() => {
    fetch('/ping').then(res => res.json()).then(data => {
      setPing(data.ping);
    });
  }, []);

  return (
    <div>{ping}</div>
  );
}



export default FetchPing;
