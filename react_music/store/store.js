import { createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js'; 

let state = {
    doAdd:'aaaa',
    change:{a:1},
    song:null,
    music:null,
    flag:true,
    doRef:null
}
const store = createStore(reducer,state,applyMiddleware(thunk));

export default store;