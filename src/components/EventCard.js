import React, { Component } from 'react';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import { Badge } from 'reactstrap';
import { Grid } from 'react-bootstrap';
import Spinner from './Spinner';


class EventCard extends Component {

    constructor(props) {
        super(props);
        
     
        this.state = {
           data: this.props.data
        };

   
    }

    renderCategory(categorieList) {
        return categorieList.map((categorie) => {
            return <Badge key={categorie.key}>{categorie.name}</Badge>;
        })
    }

    render() {

        const isLoading = this.props.data === "";
        const event = isLoading ? " " : this.props.data;
        const startDate = isLoading ? " " : event.dateStart;
        const endDate =  isLoading ? " " : event.dateFinish;
      

        return (<Grid>

            <div>
                <h1>{ isLoading ? <Spinner /> : event.title}</h1>
                <h5>{ isLoading ? <Spinner /> :<div> Data de Início <Moment format="DD/MM/YYYY">{startDate}</Moment></div>} </h5>
                <h5>{ isLoading ? <Spinner /> :<div> Data de Fim <Moment format="DD/MM/YYYY">{endDate}</Moment></div>} </h5>
                {isLoading ? <Spinner /> : renderHTML(event.description)}
            </div></Grid>
        );
    }
}

export default EventCard;
