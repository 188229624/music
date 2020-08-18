import { combineReducers } from 'redux';
const doAdd = (state = {},action)=>{
    switch(action.type){
        case 'Add':
            return state + action.payload;
        default:
            return state
    }     
}

const change = (state = {},action)=>{
    switch(action.type){
        case 'change':
            return Object.assign({},state,action.payload);
        default:
            return state
    }
}

const song = (state = {},action)=>{
    switch(action.type){
        case 'post':
            return Object.assign({},state,action);
        case 'post_success':
            return Object.assign({},state,action);
        case 'post_err':
            return Object.assign({},state,action);
        default:
            return state
    }
}

const doRef = (state = {},action)=>{
    switch(action.type){
        case 'ref':
            return Object.assign({},state,action.ref);    
        default:
            return state
    }
}

const music = (state = {},action)=>{
    switch(action.type){
        case 'music':
            return Object.assign({},state,action);
        default:
            return state
    }
}

const flag = (state = {},action)=>{
    switch(action.type){
        case 'flag':
            return action.flag;
        default:
            return state
    }
}

const reducer_all = combineReducers({
    doAdd,
    change,
    song,
    music,
    flag,
    doRef
})
export default reducer_all