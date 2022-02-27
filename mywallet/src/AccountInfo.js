import React, { useState, useEffect } from 'react';
import './AccountInfo.css';
import TransactionList from './TransactionList';
import { useLocation } from 'react-router-dom';

import {
    makeSTXTokenTransfer,
    TransactionVersion,
    getAddressFromPrivateKey,
    broadcastTransaction,
    AnchorMode
} from '@stacks/transactions';
import {
    AccountsApi,
    FaucetsApi,
    Configuration,
} from "@stacks/blockchain-api-client";

const BN = require("bn.js");
const AccountInfo = (props) => {
    const location = useLocation();
    const { account, url } = location.state;
    const privateKey = account.stxPrivateKey;
    const [balance, setBalance] = useState();
    const [inputAmount, setAmount] = useState();
    const [inputRecipient, setRecipient] = useState();
    const [history, setHistory] = useState([]);
    const [inputFee, setFee] = useState();
    const [limit, setLimit] = useState(30);

    const apiConfig = new Configuration({
        fetchApi: fetch,
        basePath: url,
    });
    // initiate the /accounts API with the basepath and fetch library
    const accountsApi = new AccountsApi(apiConfig);
    const stacksAddress = getAddressFromPrivateKey(
        privateKey,
        TransactionVersion.Testnet // remove for Mainnet addresses
    );
    // 

    const limitStringLength = (str, limit) => {
        return {
            string: str.slice(0, limit),
            isShowMore: str.length > limit
        }
    };

    const onClickMore = (str) => () => {
        setLimit(str.length);
    };

    const changeRecipient = (e) => {
        return new Promise(resolve => {
            setRecipient(e.target.value);
        })
    }
    const changeFee = (e) => {
        return new Promise(resolve => {
            setFee(e.target.value);
        })
    }
    const changeAmount = (e) => {
        return new Promise(resolve => {
            setAmount(e.target.value);
        })
    }

    const tranfer = async () => {
        // amount of Stacks (STX) tokens to send (in micro-STX). 1,000,000 micro-STX are worth 1 Stacks (STX) token
        const amount = new BN(inputAmount);
        // skip automatic fee estimation
        const fee = new BN(inputFee);
        // skip automatic nonce lookup
        const nonce = new BN(0);

        // Private key from hex string
        const txOptions = {
            recipient: inputRecipient,
            amount: amount,
            senderKey: privateKey,
            network: 'testnet', // for mainnet, use 'mainnet'
            memo: 'test memo',
            nonce: nonce, // set a nonce manually if you don't want builder to fetch from a Stacks node
            fee: fee, // set a tx fee if you don't want the builder to estimate
            anchorMode: AnchorMode.Any,
        };

        const transaction = await makeSTXTokenTransfer(txOptions);

        // to see the raw serialized tx
        //const serializedTx = transaction.serialize().toString('hex');

        // broadcasting transaction to the specified network
        const broadcastResponse = await broadcastTransaction(transaction);
        const txId = broadcastResponse.txid;
        console.log(txId);
        alert(txId);
    }

    const loadBalance = async () => {
        // get balance for a specific account
        const balance = await accountsApi.getAccountBalance({
            principal: stacksAddress,
        });
        // get STX balance details
        const stxAmount = balance.stx;
        setBalance(stxAmount.balance);
    }

    loadBalance();


    const getAccountTransactions = async () => {
        const hty = await accountsApi.getAccountTransactions({
            principal: stacksAddress,
        });
        setHistory(hty.results);
    }


    // 500stx 토큰 발행 (테스트용)
    // (async ()=> {
    //     const faucets = new FaucetsApi(apiConfig);

    //     const faucetTx = await faucets.runFaucetStx({
    //       address: stacksAddress,
    //     });

    //     console.log(faucetTx);
    //   })().catch(console.error);
    return (
        <div className="info-text" >
            <div className="item-title">
                <div className="top-title" >Account</div>
                <div className="top-body" onClick={() => { navigator.clipboard.writeText(stacksAddress) }}>
                    {limitStringLength(stacksAddress, limit).string}
                    {limitStringLength(stacksAddress, limit).isShowMore && <div className='more-button' onClick={onClickMore(stacksAddress)}>...더보기</div>}

                </div>
            </div>
            <section className="body-section">
                <div className="body-title">{parseFloat(balance)}STX</div>
                <br></br><br></br>
                <section className="body-body">
                    <div >보낼 계정 주소:<input className="input" onChange={changeRecipient} /></div>
                    <div>보  낼 금  액:<input className="input2" placeholder='1000' onChange={changeAmount} /></div>
                    <div>가   스   비:<input className="input3" placeholder='2000' onChange={changeFee} /></div>
                </section>
                <div className="space"><div className="circle" onClick={tranfer}>보내기</div></div>
            </section>
            <section>
                <div className="item-title" onClick={getAccountTransactions}>활동</div>
                <div className="bottom">
                    {<TransactionList history={history} />}
                </div>
            </section>
        </div>
    );

}

export default AccountInfo;
