import React, { Component } from 'react';
import { fetchNJStatewideDataDB, fetchCountyDataDB, fetchCountyTotalsDB, fetchInternalPingryDB, fetchCountyProjectionsDB } from './api';
import Aux from "./hoc/_Aux";
import "./assets/scss/style.scss";
import styles from './App.module.css';
import {Row, Col} from 'react-bootstrap';

// Components
import CardSet from './components/CardSet/CardSet';
import CountyTable from './components/CountyTable/CountyTable';
import CovidActNowCard from './components/CovidActNowCard/CovidActNowCard';

// Images + accessories
import PingryAnywhere from './assets/images/PingryAnywhere';
import Spinner from 'react-spinkit';
import FadeIn from 'react-fade-in';

class App extends Component {

    /**
     * THRESHOLDS FOR COLOR CODE
     * Each inner array corresponds to the column of the matrix
     * Each inner array [a,b] works as follows:
     *      Safe        = 0 to a
     *      Warning     = a to b
     *      Shutdown    = b to infinity
     */
    static thresholds = [[1.1, 1.4], [10, 25], [25, 40]];

    // Each zipcode correlates to 1 county (all 21 NJ counties in alphabetical order)
    static zipcodesNJ = ['08201', '07661', '08016', '08103', '08204', '08332', '07039', '08097', '07310', '08809',
    '08638', '08846', '07703', '07950', '08722', '07011', '08079', '08873', '07875', '07208',
    '07820'];

    // Local Counties: Essex, Morris, Somerset, Union
    // Condition: all zipcodes must correlate to 1 singular county
    static localCounties = ['07039', '07950', '08873', '07208', '08809', '08846', '08638', '07310', '07875', '07820', '07661', '08103', '07011'];
    static localCountiesIndices = [6, 13, 17, 19, 9, 11, 10, 8, 18, 20, 1, 3, 15];

    // Tooltip message to show on hover of status
    static STATUS_TOOLTIP_MESSAGE = "Operating with greatest risk in mind. See matrix below for more details.";


    constructor(props) {
        super(props);
        this.state = {
            date: "",
            statewideData: {},
            countyData: {},
            countyTotals: [],
            internal: [],
            fetchedCountyProjections: [],
            countyProjections: [],
            loading: true
        }
    }

    async componentDidMount() {
        const fetchedStatewideData = await fetchNJStatewideDataDB();
        const fetchedCountyTotals = await fetchCountyTotalsDB();
        const fetchedCountyData = (await fetchCountyDataDB())[0];
        const fetchedPingryData = await fetchInternalPingryDB();
        const fetchedCountyProjections = await fetchCountyProjectionsDB();
        const date = fetchedStatewideData[0].historicData[0].date;

        this.setState({date: date, statewideData: fetchedStatewideData, countyData: fetchedCountyData, 
            countyTotals: fetchedCountyTotals, internal: fetchedPingryData[0], fetchedCountyProjections: fetchedCountyProjections,
            countyProjections: fetchedCountyProjections[0].data, loading: false})
    }


    render() {
        return (
            <Aux>
                {this.state.loading ? (<Col sm={12} style={{textAlign: "center", height: "100vh"}}><Spinner name="three-bounce" color="#054f8a" className={styles.spinner}/></Col>) : 
                    <FadeIn>
                    
                    <div className="pcoded-content">
                        <div className={styles.center}>
                            <a href="http://pingryanywhere.org" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                <PingryAnywhere className={styles.pingryLogo}/>
                            </a>
                        </div>
                        <Row>
                            <CardSet internal={this.state.internal} fetchedCountyData={this.state.countyData} fetchedCountyProjections={this.state.fetchedCountyProjections} />
                            <CovidActNowCard />
                            <CountyTable data={this.state.countyTotals} countyData={this.state.countyData.data} fetchedCountyProjections={this.state.fetchedCountyProjections}/>
                        </Row>
                        <div className={styles.attributions}>
                            <div>Updated as of: {this.state.date}</div>
                            <div>Sources: <a href="https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv" target="_blank" rel="noopener noreferrer">The New York Times</a>, <a href="https://covidtracking.com/api/v1/states/current.json" target="_blank" rel="noopener noreferrer">The COVID Tracking Project</a>, <a href="https://www.covidactnow.org/" target="_blank" rel="noopener noreferrer">CovidActNow.org</a></div>
                            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></div>
                        </div>
                    </div>
                    </FadeIn>}
            </Aux>
        ); 
    }
}

export default App;