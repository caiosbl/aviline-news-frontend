import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Bar from './components/Navbar';
import News from './components/News';
import AdsTop from './components/Ads/AdsTop';
import Footer from './components/Footer';
import Event from './components/Event';
import Events from './components/Events';
import Categories from './components/Categories';
import AdsModal from './components/Ads/AdsModal';
import Columns from './components/Columns';
import Column from './components/Column';
import * as serviceWorker from './serviceWorker';
import HttpsRedirect from 'react-https-redirect';


const routing = (

    <Router>

        <div>
            <AdsModal/>
            <Bar/> 
            <AdsTop/>
            <HttpsRedirect>
            <Switch>
                
                <Route exact path="/news/:id" component={News} />
                <Route exact path="/events/:id" component={Event} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/categories/:id" component={Categories} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/columns/:id" component={Columns} />
                <Route exact path="/column/:id" component={Column} />
              
                <Route path="*" component={Home} />
              
            </Switch>
            </HttpsRedirect>

            <Footer/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
