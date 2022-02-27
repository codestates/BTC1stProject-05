import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { generateWallet, generateSecretKey, restoreWalletAccounts } from '@stacks/wallet-sdk';
import { StacksMainnet, StacksTestnet, StacksMocknet } from '@stacks/network';
const Login = () => {
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const signup = () => {
    navigate('/signup');
  }
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }
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
      network: new StacksMocknet()
    })
    //console.log(restoreWallet);
    navigate('/home', { state: { wallet: restoreWallet } });
  }
  const signin = () => {

    if (password === '' || password == null || key === '' || key == null)
      alert("비밀번호와 비밀키를 입력하셔야 합니다");
    else {
      loadWallet();
    }
  }

  return (
    <main>
      <div className="title">MyWallet</div>
      <div className="div">  비밀번호와 key를 입력해주세요</div>
      <div class="form">
        <section className="form-wrapper">
          <div className='form'>
            <div > Password </div>
            <input className="input" onChange={passwordChange} />
          </div>
          <div className='form'>
            <div> SecreteKey </div>
            <textarea onChange={keyChange} />
          </div>
        </section>
        <section className="form-wrapper">
          <div className="create-button" onClick={signin}>Sign in</div>
        </section>
      </div>
      <section className="form-wrapper">
        <div className="signup-button" onClick={signup}> Sign Up</div>
      </section>
    </main>
  );
};

export default Login