import React, { Component } from 'react';
import Home from './Home';
import Bar from './Navbar';
import News from './News';
import AdsTop from './Ads/AdsTop';
import Footer from './Footer';
import Event from './Event';
import Events from './Events';
import Categories from './Categories';
import AdsModal from './Ads/AdsModal';
import Columns from './Columns';
import Column from './Column';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
import ReactGA from 'react-ga';



class App extends Component {
    
    constructor(props) {
        super(props);

    }

  
    render() {

        return (
            <Router>

            <div>
                <AdsModal />
                <Bar />
                <AdsTop />
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
    
    
                <Footer />
            </div>
        </Router>
            
        );
    }
}

export default App;
