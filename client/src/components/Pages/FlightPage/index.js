import React from "react";
import "./style.scss";
import { DateRangePicker } from 'react-dates';
import API from "../../../utils/API";
import FlightCard from "../../FlightCard"
import { Jumbotron, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody, CustomInput } from 'reactstrap';
import { Redirect } from 'react-router-dom';

let moment = require('moment');
moment().format();

class FlightPage extends React.Component {
    state = {
        loggedIn: "",
        redirect: false,
        origin: "",
        destination: "",
        departure: "",
        returnDate: "",
        flights: []
    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.startDate)
        if (this.state.origin === "" || this.state.destination === "" || this.state.startDate === undefined || this.state.returnDate === undefined || this.state.startDate === null || this.state.returnDate === null){
            alert("this dont work")
            return false
        }
        console.log("hello handle submit click");
        //payload of the flight info entered
        const payload = {
            origin: this.state.origin,
            destination: this.state.destination,
            departure: this.state.startDate.format("YYYY-MM-DD"),
            returnDate: this.state.endDate.format("YYYY-MM-DD")
        };
        //console.log(payload);

        API.getFlights(payload.origin, payload.destination, payload.departure, payload.returnDate)
        .then(results => {
            console.log(results);
            this.setState({
                flights: results.data.data
            });
            //console.log(this.state.flights);
        })
        .catch(() => {
            console.log('Error sending the payload to the server')
        });;
    };

    setRedirect = () => {
        console.log('redirect clicked');
        this.setState({
            redirect: true
        })
    };

    handleRedirect = () => {
        console.log('redirect clicked');
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    };

    componentDidMount() {
        const loggedIn = localStorage.getItem('login_token');
        this.setState({ loggedIn: loggedIn });
    }

    render() {

        if (!this.state.loggedIn) {
            return ( 
                <div className="text-center container mt-3">
                    {this.handleRedirect()}
                    <Card>
                        <CardHeader tag="h3">You Are Not Logged In!</CardHeader>
                        <CardBody>
                            <CardText>If you would like to view our page, please click the button below to sign in or register.</CardText>
                            <CardText>Thank You!</CardText>
                            <Button onClick={this.setRedirect}>Register / Sign In</Button>
                        </CardBody>
                        <CardFooter className="text-muted">Safe Flight</CardFooter>
                    </Card>
                </div> 
            )
        }

        return (
            <div>

            <Jumbotron className="text-center jumbo animated zoomInUp ">
                <div className="container col-12 text-center animated fadeIn  slow delay-1s">
                    <h1 className="display-4 animated pulse delay-3s">Choose Your Destination...</h1>
                    <h3 className="lead">We will show ONLY the SAFEST flight options </h3>
                    <hr className="my-2" />
                    <Form>
                        <div className="row m-2">
                            <FormGroup className="col-md formgroup">
                                <Label for="OriginAirport">Origin</Label>
                                <CustomInput className="input"
                                    type="select"
                                    name="origin"
                                    id="originAirport"
                                    placeholder="Airport you are leaving from"
                                    value={this.state.origin}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Airport you are leaving from</option>
                                    <option value="EWR">Newark, New Jersey, USA</option>
                                    <option value="ATL">Atlanta, Georgia, USA</option>
                                    <option value="LAX">Los Angeles, California, USA</option>
                                    <option value="ORD">Chicago, Illinois, USA</option>
                                    <option value="LHR">Hillingdon, London, UK</option>
                                    <option value="HKG">Chek Lap Kok, Islands, New Territories, China</option>
                                    <option value="CDG">Roissy-en-France, Île-de-France, France</option>
                                    <option value="DFW">Dallas-Fort Worth, Texas, USA</option>
                                    <option value="AMS">Haarlemmermeer, North Holland, The Netherlands</option>
                                    <option value="FRA">Frankfurt, Hesse, Germany</option>
                                    <option value="DEN">Denver, Colorado, USA</option>
                                    <option value="DEL">Delhi, India</option>
                                    <option value="JFK">Queens, New York, New York, USA</option>
                                    <option value="SFO">San Mateo County, California, USA</option>
                                    <option value="MCO">Orlando, Florida, USA</option>
                                    <option value="LAS">Las Vegas, Nevada, USA</option>
                                    <option value="BCN">Barcelona, Spain</option>
                                    <option value="YYZ">Mississauga, Ontario, CAN</option>
                                </CustomInput>        
                            </FormGroup>
                            <FormGroup className="col-md formgroup" >
                                <Label for="DestinationAirport">Destination</Label>
                                <CustomInput
                                    className="input"
                                    type="select"
                                    name="destination"
                                    id="destinationAirport"
                                    placeholder="Destination you are traveling to"
                                    value={this.state.destination}
                                    onChange={this.handleChange}
                                > 
                                    <option value="">Airport you are leaving from</option>
                                    <option value="EWR">Newark, New Jersey, USA</option>
                                    <option value="ATL">Atlanta, Georgia, USA</option>
                                    <option value="LAX">Los Angeles, California, USA</option>
                                    <option value="ORD">Chicago, Illinois, USA</option>
                                    <option value="LHR">Hillingdon, London, UK</option>
                                    <option value="HKG">Chek Lap Kok, Islands, New Territories, China</option>
                                    <option value="CDG">Roissy-en-France, Île-de-France, France</option>
                                    <option value="DFW">Dallas-Fort Worth, Texas, USA</option>
                                    <option value="AMS">Haarlemmermeer, North Holland, The Netherlands</option>
                                    <option value="FRA">Frankfurt, Hesse, Germany</option>
                                    <option value="DEN">Denver, Colorado, USA</option>
                                    <option value="DEL">Delhi, India</option>
                                    <option value="JFK">Queens, New York, New York, USA</option>
                                    <option value="SFO">San Mateo County, California, USA</option>
                                    <option value="MCO">Orlando, Florida, USA</option>
                                    <option value="LAS">Las Vegas, Nevada, USA</option>
                                    <option value="BCN">Barcelona, Spain</option>
                                    <option value="YYZ">Mississauga, Ontario, CAN</option>
                                </CustomInput>
                            </FormGroup>
                        </div>
                        
                        <DateRangePicker
                            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        />
                    </Form>
                    <Button
                        onClick={this.handleSubmit}
                        className="m-3"
                        >
                        Search Flights
                    </Button>
                </div>
            </Jumbotron>
            {this.state.flights.map(flight => <FlightCard key={flight.id} flight= {flight}/>)}
            </div>

            

        );
    };
};

export default FlightPage; 
