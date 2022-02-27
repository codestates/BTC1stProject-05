
import React, { useState } from 'react';
import './Home.css';
import AccountList from './AccountList';
import { useLocation } from 'react-router-dom';
import { generateNewAccount } from '@stacks/wallet-sdk';
const Home = () => {
    const urlList = [
        "http://localhost:3999",
        "https://stacks-node-api.testnet.stacks.co"
    ];
    const netstring = [
        "로컬넷",
        "테스트넷"
    ]
    const [index, setIndex] = useState(0);
    const [currnet, setCurrNet] = useState(netstring[0]);
    const [net, setChangeNet] = useState(netstring[1]);
    const [url, setURL] = useState(urlList[0]);
    const location = useLocation();
    const { wallet } = location.state;
    const [accounts, setAccount] = useState(wallet.accounts);
    const [updatewallet, updateWallet] = useState(wallet);

    const newAccount = async () => {
        const newWallet = generateNewAccount(updatewallet);
        setAccount(newWallet.accounts);
        updateWallet(newWallet);
    }
    const changeNet = () => {
        if(index === 0) {
            setIndex(1);
            setCurrNet(netstring[1]);
            setURL(urlList[1]);
            setChangeNet(netstring[0]);
        }
        else {
            setIndex(0);
            setCurrNet(netstring[0]);
            setURL(urlList[0]);
            setChangeNet(netstring[1]);
        }
    }

    return (
        <main className="account-list-template">
            <div className="title">
                <div className = "title-wrapper">
                    <div className='subtitle'>{currnet} 실행 중</div>
                    <div className='circle-button' onClick={changeNet}>{net} <br/>전환</div>
                </div>
                    MyWallet
                </div>
            <div className="account-form" onClick={newAccount}><li>계정 생성</li></div>
            <div className="account-form-static"><li>계정 주소 목록</li></div>
            <section className="form-wrapper">
                {<AccountList accounts={accounts} url = {url} />}
            </section>
        </main>
    );
}
export default Home;