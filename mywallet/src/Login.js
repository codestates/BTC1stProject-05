import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { generateWallet, generateSecretKey, restoreWalletAccounts } from '@stacks/wallet-sdk';
import { StacksTestnet } from '@stacks/network';
const Login = () => {
  const password = "password";
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  // const signup = () => {
  //   navigate('/signup');
  // }
  const keyChange = (e) => {
    setKey(e.target.value);
  }
  const loadWallet = async () => {

    const genWallet = await generateWallet({
      secretKey: key,
      password: password
    });
    const restoreWallet = await restoreWalletAccounts({
      // `baseWallet` is returned from `generateWallet`
      wallet: genWallet,
      gaiaHubUrl: 'https://hub.blockstack.org',
      network: new StacksTestnet()
    })
    //console.log(restoreWallet);
    navigate('/home', { state: { wallet: restoreWallet } });
  }
  const signin = () => {

    if (key === '' || key == null)
      alert("비밀키를 입력하셔야 합니다");
    else {
      loadWallet();
    }
  }

  const signup = async () => {
    const key = generateSecretKey();
    const genWallet = await generateWallet({
      secretKey: key,
      password: password
    });
    alert(key);
    navigate('/home', { state: { wallet: genWallet } });
  }
  return (
    <main>
      <div className="title">MyWallet</div>
      <section className="form-wrapper">
        <div className="div">  니모닉 코드를 입력해주세요</div>
        <section>
          <textarea onChange={keyChange} />
          <div className="create-button" onClick={signin}>Sign in</div>
        </section>
        <section className="form-wrapper">
          <div className="signup-button" onClick={signup}> Sign Up</div>
        </section>
      </section>
    </main>
  );
};

export default Login