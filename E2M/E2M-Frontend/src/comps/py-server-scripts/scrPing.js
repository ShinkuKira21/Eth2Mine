import React, {Component} from 'react'
import axios from 'axios'

export default class FetchPing extends Component 
{
  state = {
    data: "Loading..."
  }

  componentDidMount() {
    this.fetchPing();
    this.setState({bIsFetched: ""})
  }

  fetchPing = async() => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/ping`,
    );

    this.setState({data: data.ping});
  }

  render() {
    return(
      <div>{this.state.data}</div>
    );
  }
}

/*function FetchPing()
{
  const [ping, setPing] = useState(0);

  useEffect(() => {
    fetch('/ping').then(res => res.json()).then(data => {
      setPing(data.ping);
    });
  }, []);

  return ping;
}

export default FetchPing;*/