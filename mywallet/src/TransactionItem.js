import React, { useState } from 'react';
import './TransactionItem.css';
import { useNavigate } from 'react-router-dom';
import { 
  getAddressFromPrivateKey,
  TransactionVersion
 } from '@stacks/transactions';
import {
    AccountsApi,
    Configuration,
} from "@stacks/blockchain-api-client";

const TransactionItem = (props) => {
  const infos = props.infos;


  //console.log(balance);
  return (
    <div className="div">
      <div className='box'>
      <h3>거래 내역</h3> 
      <div><h4>status : </h4>{infos.tx_status}</div>
      <div><h4>transaction ID : </h4>{infos.tx_id}</div>
      <div><h4>sender address: </h4>{infos.sender_address}</div>
      <div><h4>recipient address : </h4>{infos.token_transfer.recipient_address}</div>
      <div><h4>nonce : </h4>{infos.nonce}</div>
      <div><h4>가스 가격 : </h4>{infos.fee_rate}</div>
      </div>
      <div className="divider"></div>
      </div>
  );
}

export default TransactionItem;
