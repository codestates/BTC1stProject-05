import React from 'react';
import Transaction from './Transaction';

class Block extends React.Component {
    render(){
        const {data} = this.props;
        let time = new Date(data.burn_block_time_iso);
        console.log(time);
        return (
            <>
                <div>
                    <h2>Blcok Hash : {data.hash}</h2>
                    <h3>Block Height : {data.height}</h3>
                    <h3>Block Miner Tx : {data.miner_txid}</h3>
                    <hr></hr>
                    <div>
                        {
                            data.txs.map(tx => {
                                return(
                                    <div>
                                        <Transaction data={tx}/>
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Block;