import React from 'react';

class Transaction extends React.Component {
    getContent = (data, type)=> {
        switch(type){
            case "contract_call":
                return JSON.stringify(data.contract_call);
            case "token_transfer":
                return JSON.stringify(data.token_transfer); 
            default:
                return "No Content";
        }
    }
    render(){
        const {data} = this.props;
        return (
            <>
                <div>
                    <h2>Transaction Hash : {data.tx_id}</h2>
                    <h3>Transaction Type : {data.tx_type}</h3>
                    <h3>Transaction Status : {data.tx_status}</h3>
                    <h4>Block Hash : {data.block_hash}</h4>
                    <div>Nonce : {data.nonce}</div>
                    <div>Sender Address : {data.sender_address}</div>
                    <div>Content : {this.getContent(data, data.tx_type)}</div>
                </div>
            </>
        );
    }
}

export default Transaction;