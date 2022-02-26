
import React, { useState } from 'react';
import './Home.css';
import AccountList from './AccountList';
import { useLocation } from 'react-router-dom';
import { generateNewAccount } from '@stacks/wallet-sdk';
import { StacksTestnet } from '@stacks/network';
import {
    makeRandomPrivKey,
    privateKeyToString,
    getAddressFromPrivateKey,
    TransactionVersion,
    contractPrincipalCV,
} from "@stacks/transactions";
import {
    AccountsApi,
    FaucetsApi,
    Configuration,
} from "@stacks/blockchain-api-client";

// 
// const state = {  accounts: [
// {
//     stxPrivateKey: '8721c6a5237f5e8d361161a7855aa56885a3e19e2ea6ee268fb14eabc5e2ed9001',
//     dataPrivateKey: 'a29c3e73dba79ab0f84cb792bafd65ec71f243ebe67a7ebd842ef5cdce3b21eb',
//     appsKey:
//       'xprvA1y4zBndD83n6PWgVH6ivkTpNQ2WU1UGPg9hWa2q8sCANa7YrYMZFHWMhrbpsarxXMuQRa4jtaT2YXugwsKrjFgn765tUHu9XjyiDFEjB7f',
//     index: 0,
//     salt: 'c15619adafe7e75a195a1a2b5788ca42e585a3fd181ae2ff009c6089de54ed9e',
//   },
// ]
// }


const Home = () => {
    const location = useLocation();
    const { wallet } = location.state;
    const [accounts, setAccount] = useState(wallet.accounts);
    const [ updatewallet, updateWallet] = useState(wallet);

    //console.log(wallet.accounts);
    const newAccount = async () => {
        const newWallet = generateNewAccount(updatewallet);
        setAccount(newWallet.accounts);
        updateWallet(newWallet);
    }

    const accountInfos = async function getAccountInfo(stacksAddress) {

        const apiConfig = new Configuration({
            fetchApi: fetch,
            // for mainnet, replace `testnet` with `mainnet`
            basePath: "https://stacks-node-api.testnet.stacks.co",
          });
          

        const accounts = new AccountsApi(apiConfig);
        const accountInfo = await accounts.getAccountInfo({
          principal: stacksAddress,
        });
      
        return accountInfo;
      }
    const addAccount = () => {
        /** Call the plugin */
        const privateKey = prompt('비공개키를 입력해주세요')
        const stacksAddress = getAddressFromPrivateKey(
            privateKey,
            TransactionVersion.Testnet // remove for Mainnet addresses
          );
        const accountInfo = accountInfos(stacksAddress);
        console.log(accountInfo);
        
    }
    return (
        <main className="account-list-template">
            <div className="title">
                MyWallet
            </div>
            <div className="account-form" onClick={newAccount}><li>계정 생성</li></div>
            <div className="account-form" onClick={addAccount}><li>계정 추가</li></div>
            <div className="account-form-static"><li>계정 주소 목록</li></div>
            <section className="form-wrapper">
                {<AccountList accounts={accounts} />}
            </section>
        </main>
    );
}
export default Home;