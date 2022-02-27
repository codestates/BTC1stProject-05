import React, { useState } from 'react';
import './AccountItem.css';
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

  const navigate = useNavigate();
  const [balance, setBalance] = useState();
  const activityInfo = props.activityInfo;


  //console.log(balance);
  return (
    <div className="account-item"  >
      <div className="account-text"  >
        {/* <section className='section' onClick={accountInfo}>
          <div>주소 : {stacksAddress}</div> 
          <div>잔액 : {balance}</div>
        </section> */}
      </div>
    </div>
  );

}

export default TransactionItem;
