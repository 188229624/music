import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import {testJsx} from './test';
//import Music_main from './music_main';
import Router from './router.js'
import { Provider } from 'react-redux'
import store from '../store/store' 


store.subscribe(() =>
  console.log(store.getState())
);

// store.dispatch(add('bbb'));
// store.dispatch(change({b:2}));

class App extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     a:1
        // }
        // this.add = this.add.bind(this);
        // this.reduce = this.reduce.bind(this);
    }

    // add(e,arg){
    //     console.log(e,arg);
    //     this.setState((state,props)=>({
    //         a:state.a+=1
    //     }))
    // }

    // reduce(){
    //     this.setState((state,props)=>({
    //         a:state.a-=1
    //     }))
    // }

    render() { 
        return  <Provider store={store}>
                    {/* {testJsx}
                    <h1>Hello React!</h1>
                    <button onClick={(e)=> this.add(e,'a')}>{this.state.a}</button>
                    <button onClick={this.reduce}>{this.state.a}</button> */}
                    <Router/>            
                </Provider>
    }
}
ReactDOM.render(<App />, document.getElementById('app'));