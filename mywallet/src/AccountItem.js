import React, { Component } from 'react';
import './AccountItem.css';
import { getStxAddress } from '@stacks/wallet-sdk';
import { TransactionVersion } from '@stacks/transactions';

class AccountItem extends Component {

  render() {
    const {account} = this.props;
    console.log(account);
    const testnetAddress = getStxAddress({ account, transactionVersion: TransactionVersion.Testnet });
    
    return (
      <div className="account-item">
        <div className={`account-text`}>
          <div>{testnetAddress}</div>
        </div>
      </div>
    );
  }
}

export default AccountItem;
