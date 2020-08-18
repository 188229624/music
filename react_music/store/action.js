const request = require( 'superagent' );
const fly = require("flyio");

const add = (text)=>{
    return {
        type:'Add',
        payload:text
    }
}
const change = (text)=>{
    return {
        type:'change',
        payload:text
    }
}
const post_to = (name)=>{
    return (dispatch)=>{
        dispatch(requestPost);
        request.get(`http://120.77.203.104:80/song?name=${name}`)       
        .then(res =>{
            dispatch(postSuccess(res));
        },err=>{
            dispatch(postSuccess(err));
        })
    }
}

const get_music = (id,name,_id,str)=>{
    return (dispatch)=>{                  
        request.post('http://120.77.203.104:80/music',{
            id: id            
        })
        .then(res =>{
            dispatch(music_type(res,null,name,_id,str));
        },err=>{
            dispatch(music_type(null,err,name,_id,str));
        })
    }
}
const music_type = (data,err,name,_id,str)=>{
    return {
        type:'music',
        data:data && data.body,
        err:err,
        name:name,
        _id:_id,
        str:str
    }
}
const flag = (str)=>{
    return {
        type:'flag',
        flag:str
    }
}
const requestPost=()=>{
    return{
        type: 'post',
        isFetch:true //进度条相关
    }
}

const saveRef = (ref)=>{
    return{
        type:'ref',
        ref:ref
    }
}
//通知 reducer 请求成功的 action
const postSuccess = (data)=>{
    return{
         type: 'post_success',
         isFetch:false,
         data: data.body
     }
}
//通知 reducer 请求失败的 action。
const postError = (message)=>{
  return{
        type: 'post_err',
        isFetch:false,
        errorMsg:message,
        data:null
  }
}

export {
    add,
    change,
    post_to,
    requestPost,
    postSuccess,
    postError,
    get_music,
    flag,
    saveRef,
    music_type
}