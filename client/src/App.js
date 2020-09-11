import React, { Component } from "react";
import {
  fetchNJStatewideDataDB,
  fetchCountyDataDB,
  fetchCountyTotalsDB,
  fetchInternalPingryDB,
  fetchCountyProjectionsDB,
} from "./api";
import Aux from "./hoc/_Aux";
import "./assets/scss/style.scss";
import styles from "./App.module.css";
import { Row, Col } from "react-bootstrap";
import ReactGA from "react-ga";

// Components
import CardSet from "./components/CardSet/CardSet";
import CountyTable from "./components/CountyTable/CountyTable";
import CovidActNowCard from "./components/CovidActNowCard/CovidActNowCard";
import Charts from "./components/Charts/Charts";
import CampusCharts from "./components/CampusCharts/CampusCharts";
import Status from "./components/Status/Status";
import CampusCards from "./components/CampusCards/CampusCards";

// Images + accessories
import PingryAnywhere from "./assets/images/PingryAnywhere";
import Spinner from "react-spinkit";
import FadeIn from "react-fade-in";

class App extends Component {
  // LEVELS
  // 1 --> open
  // 2 --> reduced density
  // 3 --> fully remote
  static SHORT_HILLS_LEVEL = 1;
  static BASKING_RIDGE_LEVEL = 1;

  constructor(props) {
    super(props);
    this.state = {
      statewideData: {},
      countyData: {},
      countyTotals: [],
      internal: [],
      fetchedCountyProjections: [],
      countyProjections: [],
      loading: true,
    };
    ReactGA.initialize("UA-177348263-1");
    ReactGA.pageview("/");
  }

  async componentDidMount() {
    const fetchedStatewideData = await fetchNJStatewideDataDB();
    const fetchedCountyTotals = await fetchCountyTotalsDB();
    const fetchedCountyData = (await fetchCountyDataDB())[0];
    const fetchedPingryData = await fetchInternalPingryDB();
    const fetchedCountyProjections = await fetchCountyProjectionsDB();

    this.setState({
      statewideData: fetchedStatewideData,
      countyData: fetchedCountyData,
      countyTotals: fetchedCountyTotals,
      internal: fetchedPingryData[0],
      fetchedCountyProjections: fetchedCountyProjections,
      countyProjections: fetchedCountyProjections[0].data,
      loading: false,
    });
  }

  render() {
    return (
      <Aux>
        {this.state.loading ? (
          <Col sm={12} style={{ textAlign: "center", height: "100vh" }}>
            <Spinner
              name="three-bounce"
              color="#054f8a"
              className={styles.spinner}
            />
          </Col>
        ) : (
          <FadeIn>
            <div className="pcoded-content">
              <div className={styles.center}>
                <a
                  href="http://pingryanywhere.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <PingryAnywhere className={styles.pingryLogo} />
                </a>
              </div>
              <Col sm={12} className={styles.center}>
                <h3>COVID-19 Tracking Dashboard</h3>

                <h6 className={styles.smallerText}>
                  Data Sources: The New York Times, CovidActNow.org, Pingry's
                  Internal Tracking Database
                </h6>
                <h6 className={styles.smallerText}>Updated daily at 8AM ET</h6>
              </Col>
              <Status
                shortHills={App.SHORT_HILLS_LEVEL}
                baskingRidge={App.BASKING_RIDGE_LEVEL}
              />
              <Row>
                <CampusCards internal={this.state.internal} />
                <CampusCharts internal={this.state.internal} />
                <CardSet
                  fetchedCountyData={this.state.countyData}
                  fetchedCountyProjections={this.state.fetchedCountyProjections}
                />
                <Charts
                  IRAverages={this.state.fetchedCountyProjections[0].averages}
                  CRAverages={this.state.countyData.averages}
                />
                <CovidActNowCard />
                <CountyTable
                  data={this.state.countyTotals}
                  countyData={this.state.countyData.data}
                  fetchedCountyProjections={this.state.fetchedCountyProjections}
                />
              </Row>
              <div className={styles.attributions}>
                <div>
                  Sources:{" "}
                  <a
                    href="https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The New York Times
                  </a>
                  ,{" "}
                  <a
                    href="https://covidtracking.com/api/v1/states/current.json"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The COVID Tracking Project
                  </a>
                  ,{" "}
                  <a
                    href="https://www.covidactnow.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CovidActNow.org
                  </a>
                </div>
                <div>
                  Icons made by{" "}
                  <a
                    href="https://www.flaticon.com/authors/freepik"
                    title="Freepik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Freepik
                  </a>{" "}
                  from{" "}
                  <a
                    href="https://www.flaticon.com/"
                    title="Flaticon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.flaticon.com
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </Aux>
    );
  }
}

export default App;
