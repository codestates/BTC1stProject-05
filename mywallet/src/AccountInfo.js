import React, { useState } from 'react';
import './AccountInfo.css';
import TransactionList from './TransactionList';

import { useLocation } from 'react-router-dom';
import { getStxAddress } from '@stacks/wallet-sdk';
import {
    privateKeyToString,
    getAddressFromPrivateKey,
    TransactionVersion
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import {
    AccountsApi,
    FaucetsApi,
    Configuration,
} from "@stacks/blockchain-api-client";

const AccountInfo = (props) => {
    const location = useLocation();
    const { privateKey, stacksAddress, balance } = location.state;
    //const [balance, setBalance] = useState();
    const [history, setHistory] = useState();
    const [limit, setLimit] = useState(30);

    const apiConfig = new Configuration({
        fetchApi: fetch,
        // for mainnet, replace `testnet` with `mainnet`
        //"https://stacks-node-api.testnet.stacks.co"
        basePath: 'http://localhost:3999',
    });
    const accounts = new AccountsApi(apiConfig);
    //const privateKey = account.stxPrivateKey;

    // const stacksAddress = getAddressFromPrivateKey(
    //     privateKey,
    //     TransactionVersion.Testnet // remove for Mainnet addresses
    // );



    // const balanceInfo = async function getAccountInfo() {
    //     const accountInfo = await accounts.getAccountInfo({
    //         principal: stacksAddress,
    //     });
    //     if(accountInfo == null){
    //         setBalance(0);
    //     }
    //     else{
    //         setBalance(accountInfo.balance);
    //     }
    // }
    // balanceInfo();

    // const faucet = async function runFaucetStx() {
    //     const faucets = new FaucetsApi(apiConfig);

    //     const faucetTx = await faucets.runFaucetStx({
    //       address: stacksAddress,
    //     });

    //     return faucetTx;
    //   }
    // const tx = faucet();
    // console.log(tx);
    const transactionHistory = async function getAccountTransactions() {
        const transactionHistory = await accounts.getAccountTransactions({
            principal: stacksAddress,
        });

        setHistory(transactionHistory);
    }
    //transactionHistory();
    //console.log(history);

    const limitStringLength = (str, limit) => {
        return {
            string: str.slice(0, limit),
            isShowMore: str.length > limit
        }
    };

    const onClickMore = (str) => () => {
        setLimit(str.length);
    };
    return (
        <div className="info-item" >
            <div className="info-text" >
                <div className="item-title">
                    <div className="top-title">Account</div>
                    <div className="top-body">
                        {limitStringLength(stacksAddress, limit).string}
                        {limitStringLength(stacksAddress, limit).isShowMore && <div className='more-button' onClick={onClickMore(stacksAddress)}>...더보기</div>}
                    </div>
                </div>
                <section className="body-section">
                    <div className="body-title">{parseFloat(balance)}STX</div>
                    <br></br><br></br>
                    <div className="circle" >보내기</div>
                </section>
                <div className='divider'></div>
                <h3>활동</h3>
                {/* {<TransactionList activity={history.results} />} */}
            </div>
        </div>
    );

}

export default AccountInfo;
