import React from "react";
import './ListItem.css';


const setData = (type, data) => {
    switch(type){
        case 'block':
            return{
                head: `#${data.height}`,
                mead: `Txs: ${data.txs.length}`,
                tail: `${data.hash.substring(0,20)}...`
            }
        case "tx":
            return{
                head: `#${data.tx_type}`,
                mead: `Sender: ${data.sender_address.substring(0, 10)}...`,
                tail: `${data.tx_id.substring(0,10)}...`
            }
            break;
    }
}

const ListItem = (props) => {

    const{head, mead, tail} = setData(props.type, props.data);

    return (
        <>
            <a>
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