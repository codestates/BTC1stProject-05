import React, { Component } from 'react';
import AccountItem from './AccountItem';

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
class AccountList extends Component {
  render() {
    const { accounts } = this.props;
    const accountList = accounts.map(
      (account) => (
        <AccountItem
          account={account}
        />
      )
    );

    return (
      <div>
        {accountList}    
      </div>
    );
  }
}

export default AccountList;