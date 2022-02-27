import React, { useState } from 'react';
import './AccountItem.css';
import { useNavigate } from 'react-router-dom';
import {
  getAddressFromPrivateKey,
  TransactionVersion
} from '@stacks/transactions';
import {
  Configuration,
  AccountsApi
} from "@stacks/blockchain-api-client";

const AccountItem = (props) => {

  const navigate = useNavigate();
  //const testnetAddress = getStxAddress({ account, transactionVersion: TransactionVersion.Testnet });
  const [balance, setBalance] = useState();
  const url = props.url;
  const privateKey = props.stxPrivateKey;
  const apiConfig = new Configuration({
    fetchApi: fetch,
    // for mainnet, replace `testnet` with `mainnet`
    //"https://stacks-node-api.testnet.stacks.co"
    //'http://localhost:3999'
    basePath: url,
  });

  const stacksAddress = getAddressFromPrivateKey(
    privateKey,
    TransactionVersion.Testnet // remove for Mainnet addresses
  );
  const accountDetail = async () => {
    // initiate the /accounts API with the basepath and fetch library
    const accountsApi = new AccountsApi(apiConfig);

    // get balance for a specific account
    const balance = await accountsApi.getAccountBalance({
      principal: stacksAddress,
    });

    // get STX balance details
    const stxAmount = balance.stx;
    setBalance(stxAmount.balance);
  }
  accountDetail();

  const accountInfo = () => {
    //console.log(restoreWallet);
    navigate('/accountinfo', { state: { stacksAddress: stacksAddress, balance: balance, key: privateKey } });
  }


  //console.log(balance);
  return (
    <div className="account-item"  >
      <div className="account-text"  >
        <section className='section' onClick={accountInfo}>
          <div>주소 : {stacksAddress}</div>
          <div>잔액 : {balance}</div>
        </section>
      </div>
    </div>
  );

}

export default AccountItem;
