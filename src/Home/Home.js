import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export class Home extends Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="App container">
                <div className="home-container">

                    <div className="zoom service-border">
                        <div className="service-name">
                            <Link to="/trombinoscope">
                                <img className="service-img"  src = {'tromb1.jpeg'}  alt="card"/>  <br/>
                                Trombinoscope
                            </Link>
                        </div>
                    </div>
                    <div className="zoom service-border">
                        <div className="service-name">
                            <Link to="">
                                <img className="service-img"  src = {'lunchAtWork.jpeg'}  alt="card"/>  <br/>
                                Lunch at work
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}