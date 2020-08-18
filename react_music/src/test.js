import React, { Component ,Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import Test_dom from './test_content';


const Test_chunk = lazy(()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(import('./test_chunk'));
        },2000)
    })
})

class Text_component extends Component{
    constructor(props){
        super(props);
        this.test_ref = React.createRef();
        //console.log(this.test_ref);
        // this.test_con = this.test_con.bind(this);
        // this.ref_fn = (e) =>{
        //     console.log(e);
        // }
    }

    test_con(){
        //console.log(this.test_ref);
    }

    render(){
        return <>
            <h5 ref={this.test_ref}> class 组件</h5>
            <button onClick={this.test_con.bind(this)}></button>
            <Suspense fallback={<div>Loading...</div>}>
               <Test_chunk/>
            </Suspense>
        </>
    }
}

const a = [1,2,3,4];

const TestFn = (props)=>{
    return  <>
                <Text_component/>
                <h5>React fn 自定义组件</h5>
                <h4>我是值{props.name}</h4>
            </>
}

const test_list = (a)=>{
    const list = a.map((value,index)=>{
        return <li key={index.toString()}>{'test' + value}</li>
    })
    return <ul>{list}</ul>
}

const testJsx =
    <div>test hello
        <TestFn name="test react"/>
        {test_list(a)}
        <Test_dom/>
    </div>

export {
    testJsx
} ;