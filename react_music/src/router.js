import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import  {main_connect as Main} from './music_main';
import Search from './music_search';
import {createBrowserHistory} from 'history'
const customHistory = createBrowserHistory();

const router_main = ()=>(
    <HashRouter history={customHistory}>
        <Switch>
            <Route exact  path="/" component={Main} history={history}/>
            <Route exact  path="/search" component={Search} history={history}/>
        </Switch>
    </HashRouter>
)

export default router_main;