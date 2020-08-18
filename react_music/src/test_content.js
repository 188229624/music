import React, { Component } from 'react';

const Test = React.createContext('light');

class Test_dom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            con:'a'
        };
        this.write = this.write.bind(this);
    }

    write(a){
       this.setState({
           con:a
       })
    }

    render(){
        return <>
                <Test.Provider value={this.state.con}>
                    <Toolbar/>
                    <Test_con/>
                </Test.Provider>
               <button onClick={()=>this.write('b')}>context</button>
              </>
    }
}

function Test_con(){
    return <Test.Consumer>
                {(value)=>{
                    return <h4>{value}</h4>
                }}
           </Test.Consumer>
}

function Toolbar(){
    return (
        <div>
            <Foot/>
        </div>
    )
}

class Foot extends React.Component{
    constructor(props){
        super(props);
    }

    static contextType = Test;
    
    render(){
        return <div>{this.context}
                   
                </div> 
    }
}

export default Test_dom;
