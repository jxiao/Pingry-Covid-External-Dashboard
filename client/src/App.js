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

// Images + accessories
import PingryAnywhere from "./assets/images/PingryAnywhere";
import Spinner from "react-spinkit";
import FadeIn from "react-fade-in";

class App extends Component {
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
    const date = fetchedStatewideData[0].historicData[0].date;

    this.setState({
      date: date,
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
              <Row>
                <CardSet
                  internal={this.state.internal}
                  fetchedCountyData={this.state.countyData}
                  fetchedCountyProjections={this.state.fetchedCountyProjections}
                />
                <CovidActNowCard />
                <CountyTable
                  data={this.state.countyTotals}
                  countyData={this.state.countyData.data}
                  fetchedCountyProjections={this.state.fetchedCountyProjections}
                />
              </Row>
              <div className={styles.attributions}>
                <div>Updated as of: {this.state.date}</div>
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
