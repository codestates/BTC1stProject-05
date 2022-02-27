import React from 'react';
import './Template.css';
import ListItem from './ListItem';
import axios from 'axios';


class Template extends React.Component {
    state = {
        isLoading: false,
        datas: [],
        index: 0,
    }
    userAddress=""
    getURL = (type, index) => {
        switch(type){
            case 'account':
                return `http://localhost:3000/${type.toLowerCase()}/specific?chain=main&index=${index}&address=${this.userAddress}`;
            default:
                return `http://localhost:3000/${type.toLowerCase()}?chain=main&index=${index}`;
        }
    }
    getData = async(type) => {
        const {index, datas} = this.state
        let url = this.getURL(type, index);
        let data = await axios.get(url);
        let next = this.state.index + 30;
        let nextDatas = datas.concat(data.data.data);
        
        this.setState({datas: nextDatas, isLoading:false, index: next});
    }
    async componentDidMount(){
        this.userAddress = this.props.address;
        this.getData(this.props.type, this.userAddress);
    }
    render(){
        const{type} = this.props;
        const{isLoading, datas} = this.state;
        return (
            <>
                {isLoading ?
                    <div>Loading...</div> :
                    <div className="container">
                        <div className="App">
                            <div className='list_body'>
                                <div className='app-title'>{type} Explorer</div>
                                <button onClick={() => {this.getData(type)}}>Add More Item</button>
                                <div className='list'>
                                    {
                                        datas.map(d => {
                                            return(
                                                <ListItem 
                                                    type={type.toLowerCase()}
                                                    key={d.height} 
                                                    data={d}    
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
};

export default Template;