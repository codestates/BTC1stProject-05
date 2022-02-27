import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Template from './Template';

class Account extends React.Component {
    state = {
        isLoading: true,
        data:{}
    }
    userAddress = ""
    getData = async(address) => {
        let data = await axios.get(`http://localhost:3000/account?chain=main&address=${address}`);
        
        this.userAddress = address;
        console.log(data.data.data);
        this.setState({data:data.data.data, isLoading: false});
    }
    async componentDidMount(){
        const {address} = queryString.parse(window.location.search);
        this.getData(address);
    }
    render(){
        const {data, isLoading} = this.state;

        return (
            <>
                <div>
                    {
                        isLoading ? 
                            <div>Loading....</div> :
                            <div>
                                <h1>Account : {this.userAddress}</h1>
                                <h2>Balance : {data.balance / 1000000}stx</h2>
                                <h3>Total Income : {data.total_received / 1000000}stx</h3>
                                <h3>Total Sent : {data.total_sent / 1000000}stx</h3>
                                <h3>Total Fees : {data.total_fees_sent / 1000000}stx</h3>
                                <hr></hr>
                                <div>
                                    <Template type="account" address={this.userAddress}/>
                                </div>
                            </div>
                   }
                </div>
            </>
        );
    }
}

export default Account;