import React from 'react';
import './Template.css';
import ListItem from './ListItem';
import axios from 'axios';


class Template extends React.Component {
    state = {
        isLoading: false,
        datas: [],
        index: 0
    }
    getData = async(type) => {
        const {index, datas} = this.state
        console.log(index);
        let data = await axios.get(`http://localhost:3000/${type.toLowerCase()}?chain=main&index=${index}`);
        let next = this.state.index + 30;
        let nextDatas = datas.concat(data.data.data);
        
        console.log(nextDatas);
        this.setState({datas: nextDatas, isLoading:false, index: next});
    }
    async componentDidMount(){
        this.getData(this.props.type);
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