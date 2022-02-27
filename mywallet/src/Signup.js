import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { generateWallet, generateSecretKey } from '@stacks/wallet-sdk';

const SignUp = () => {

  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //setState에서 async를 사용해도 될까?
  const handleChange = (e) => {
    return new Promise(resolve => {
       setPassword(e.target.value);
    })
  }
  const signup = async () => {
    if (password === '' || password == null)
      alert("계정 관리를 위해 비밀번호를 입력하셔야 합니다");
    else {
      const key = generateSecretKey();
      const genWallet = await generateWallet({
        secretKey: key,
        password: password
      });
      alert(key);
      navigate('/home', { state: { wallet : genWallet } });
    }
  }

  return (
    <main>
      <div className="title">
        MyWallet
      </div>
      <div className="div"> 계정 관리를 위한 비밀번호를 입력해주세요 </div>
      <section className="form-wrapper">
        <div className="form">
          <input className="input" onChange={handleChange} />
          <div className="create-button" onClick={signup}>Sign up</div>
        </div>
      </section>
    </main>
  );
}
export default SignUp;