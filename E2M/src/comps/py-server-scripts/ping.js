import React, {useState, useEffect} from "react";

function FetchPing()
{
  const [ping, setPing] = useState(0);

  useEffect(() => {
    fetch('/ping').then(res => res.json()).then(data => {
      setPing(data.ping);
    });
  }, []);

  return ping;
}

export default FetchPing;