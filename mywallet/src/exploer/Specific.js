import React from "react";
import queryString from 'query-string';
import axios from "axios";
import Transaction from './Transaction';
import Block from './Block';

class Specific extends React.Component {
    state = {
        isLoading: false,
        datas: "",
        type: ""
    }
    getData = async(type, hash) => {
        let data = await axios.get(`http://localhost:3000/${type}/specific?chain=main&hash=${hash}`);
        
        console.log(data.data.data);
        console.log(type);
        this.setState({datas:data.data.data, type: type});
    }
    async componentDidMount(){
        const {type, hash} = queryString.parse(window.location.search);
        this.getData(type, hash);
    }
    render() {
        const {datas, isLoading, type} = this.state;
        
        return(
            <>
                {isLoading ? 
                    <div> Loaindg.... </div> :
                    <div>
                        {
                            type == "" ? 
                            null :
                            (type == "tx" ? 
                                <div>
                                    <Transaction data={datas}/>
                                </div> :
                                <div>
                                    <Block data={datas}/>
                                </div>
                            )
                        }
                    </div>
                }
            </>
        );
    }
}


export default Specific;