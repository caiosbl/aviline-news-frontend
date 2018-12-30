import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Bar from './components/Navbar';
import News from './components/News';
import Ads1 from './components/Ads1';
import Footer from './components/Footer';
import Event from './components/Event';
import Events from './components/Events';
import Categories from './components/Categories';
import * as serviceWorker from './serviceWorker';


const routing = (

    <Router>

        <div>
            <Bar/> 
            <Ads1/>
            <Switch>
                
                <Route exact path="/news/:id" component={News} />
                <Route exact path="/events/:id" component={Event} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/categories/:id" component={Categories} />
                <Route exact path="/categories" component={Categories} />
              
                <Route path="*" component={Home} />
              
            </Switch>

            <Footer/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
