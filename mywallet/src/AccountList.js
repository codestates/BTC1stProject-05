import React, { Component } from 'react';
import AccountItem from './AccountItem';

class AccountList extends Component {
  render() {
    const { accounts, url } = this.props;
    const accountList = accounts.map(
      (accountInfo) => (
        <AccountItem stxPrivateKey={accountInfo.stxPrivateKey} url = {url} />
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