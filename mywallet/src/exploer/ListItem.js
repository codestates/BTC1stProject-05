import React from "react";
import './ListItem.css';


const setData = (type, data) => {
    switch(type){
        case 'block':
            return{
                head: `#${data.height}`,
                mead: `Txs: ${data.txs.length}`,
                tail: `${data.hash.substring(0,20)}...`,
                hash: data.hash
            }
        default :
            return{
                head: `#${data.tx_type}`,
                mead: `Sender: ${data.sender_address.substring(0, 10)}...`,
                tail: `${data.tx_id.substring(0,10)}...`,
                hash: data.tx_id
            }
    }
}

const ListItem = (props) => {
    const type = props.type == "account" ? "tx" : props.type;
    const{head, mead, tail, hash} = setData(type, props.data);
    
    return (
        <>
            <a href={`specific?type=${type}&hash=${hash}`}>
                <div className="ListItem">
                    <div className="head">{head}</div>
                    <div className="mead">{mead}</div>
                    <div className="tail">{tail}</div>
                </div>
            </a>
        </>
    );
}

export default ListItem;