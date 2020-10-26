import React, { Component } from "react";
import {
  fetchNJStatewideDataDB,
  fetchCountyDataDB,
  fetchInternalPingryDB,
  fetchCountyProjectionsDB,
  fetchDetailedStats,
  fetchTestings,
  fetchCountyTotalsDB,
} from "./api";
import Aux from "./hoc/_Aux";
import "./assets/scss/style.scss";
import styles from "./App.module.css";
import { Row, Col, Card } from "react-bootstrap";
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
import cx from "classnames";

class App extends Component {
  // LEVELS
  // 1 --> open
  // 2 --> reduced density
  // 3 --> fully remote
  static SHORT_HILLS_LEVEL = 1;
  static BASKING_RIDGE_LEVEL = 1;

  // TESTING RESULTS
  static POTENTIALLY_POSITIVE_PAIRS = 1;
  static TOTAL_NUM_TESTS = 1433;
  static SAMPLE_COLLECTION_DATE = new Date(2020, 10, 16);

  static MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      detailedStats: [],
      fetchedTestingData: [],
    };
    ReactGA.initialize("UA-177348263-1");
    ReactGA.pageview("/");
  }

  async componentDidMount() {
    const fetchedStatewideData = await fetchNJStatewideDataDB();
    const fetchedCountyData = (await fetchCountyDataDB())[0];
    const fetchedPingryData = await fetchInternalPingryDB();
    const fetchedCountyProjections = await fetchCountyProjectionsDB();
    const fetchedDetailedStats = (await fetchDetailedStats())[0];
    const fetchedTestingData = (await fetchTestings())[0].data;
    const fetchedCountyTotals = await fetchCountyTotalsDB();
    this.setState({
      statewideData: fetchedStatewideData,
      countyData: fetchedCountyData,
      countyTotals: fetchedCountyTotals,
      internal: fetchedPingryData[0],
      fetchedCountyProjections: fetchedCountyProjections,
      countyProjections: fetchedCountyProjections[0].data,
      loading: false,
      detailedStats: fetchedDetailedStats,
      fetchedTestingData: fetchedTestingData,
    });
  }

  formatNum(num) {
    const formatter = new Intl.NumberFormat("en-US");
    return formatter.format(num);
  }

  render() {
    console.log(this.state.fetchedTestingData);
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
                <h6 className={styles.smallerText}>
                  Data regarding Pingry's Return-to-School COVID-19 Testing is
                  updated upon receipt of lab results
                </h6>
                <h6 className={styles.smallerText}>
                  All other values (including historical data) are updated daily
                  at 8AM
                </h6>
                <a
                  href="https://pingryanywhere.org/cms/resources/media/2020/10/Pingry-Anywhere-COVID-19-Tracking-Dashboard-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.smallerText}
                >
                  Learn More About Our Dashboard
                </a>
              </Col>
              <Status
                shortHills={App.SHORT_HILLS_LEVEL}
                baskingRidge={App.BASKING_RIDGE_LEVEL}
              />

              <Row>
                <Col md={9} lg={7} className={styles.center}>
                  <Card>
                    <Card.Body>
                      <h6 className={cx("mb-4", styles.smallmargin)}>
                        Pingry's Return-to-School COVID-19 Testing
                      </h6>
                      <div className="row d-flex align-items-center">
                        <div className="col-12">
                          <h3 className="f-w-300 d-flex align-items-center m-b-0">
                            <div className={cx(styles.center, styles.testing)}>
                              <br />
                              <table className={cx("table", styles.table)}>
                                <thead>
                                  <tr>
                                    <th className={styles.tableHeader}>
                                      <p>Date of Sample Collection</p>
                                    </th>
                                    <th className={styles.tableHeader}>
                                      <p>Total Number of Tests Administered</p>
                                    </th>
                                    <th className={styles.tableHeader}>
                                      <p>
                                        Number of Potentially Positive Pairs
                                      </p>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className={styles.smallerText}>
                                  {this.state.fetchedTestingData.map(
                                    (entry, i) => {
                                      return (
                                        <tr key={i}>
                                          <td className={styles.smallPadding}>
                                            {
                                              App.MONTHS[
                                                new Date(entry.date).getMonth()
                                              ]
                                            }{" "}
                                            {new Date(entry.date).getDate()},{" "}
                                            {new Date(entry.date).getFullYear()}
                                          </td>
                                          <td className={styles.smallPadding}>
                                            {this.formatNum(entry.numTests)}
                                          </td>
                                          <td className={styles.smallPadding}>
                                            {this.formatNum(
                                              entry.potentiallyPositivePairs
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </h3>
                        </div>
                        <br />
                        <br />
                        <br />
                      </div>
                      <div>
                        Updated upon receipt of results from Mirimus Labs
                      </div>
                      <div>
                        <a
                          href="https://pingryanywhere.org/health-safety/covid-19-testing/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Detailed information regarding Pingry's COVID-19
                          Testing
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <CampusCards
                  internal={this.state.internal}
                  detailedStats={this.state.detailedStats}
                />
                <CampusCharts
                  internal={this.state.internal}
                  detailedStats={this.state.detailedStats}
                />
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
