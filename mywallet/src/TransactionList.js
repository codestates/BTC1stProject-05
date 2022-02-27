import React, { Component } from 'react';
import TransactionItem from './TransactionItem';

class TransactionList extends Component {
  render() {
    const { history } = this.props;
    const historyList = history.map(
      (info) => (
        <TransactionItem infos={info}/>
      )
    );

    return (
      <div>
        {historyList}    
      </div>
    );
  }
}

export default TransactionList;