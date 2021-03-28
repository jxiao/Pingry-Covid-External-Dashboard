import React, { Component } from "react";
import {
  fetchNJStatewideDataDB,
  fetchCountyDataDB,
  fetchInternalPingryDB,
  fetchCountyProjectionsDB,
  fetchDetailedStats,
  fetchTestings,
  fetchCountyTotalsDB,
  fetchUpdatedTestings,
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
import TestingChart from "./components/TestingChart/TestingChart";

// Images + accessories
import PingryAnywhere from "./assets/images/PingryAnywhere";
import Spinner from "react-spinkit";
import FadeIn from "react-fade-in";
import cx from "classnames";
// import Testing from "../../models/testing.model";

class App extends Component {
  // LEVELS
  // 1 --> open
  // 2 --> reduced density
  // 3 --> fully remote
  // 0 --> special (atm: Fully Remote for Re-Entry)
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
      fetchedUpdatedTestingData: [],
      showMore: false,
      entriesShown: 3,
      priorTestingShown: false,
      archiveEntriesShown: 3,
    };
    ReactGA.initialize("UA-177348263-1");
    ReactGA.initialize("UA-186911504-1");
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
    const fetchedUpdatedTestingData = (await fetchUpdatedTestings())[0].data;
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
      fetchedUpdatedTestingData: fetchedUpdatedTestingData,
      showMore: false,
      entriesShown: 3,
      priorTestingShown: false,
    });
  }

  formatNum(num) {
    const formatter = new Intl.NumberFormat("en-US");
    return formatter.format(num);
  }

  render() {
    let showMoreRowsButton = (
      <button
        style={{ marginRight: "1rem", marginTop: "0.5rem" }}
        className={styles.testingButton}
        onClick={() =>
          this.setState({
            // Pick nearest multiple of 10 or maximum number of rows
            entriesShown: Math.min(
              this.state.entriesShown + 10,
              this.state.fetchedUpdatedTestingData.length
            ),
          })
        }
        disabled={
          this.state.entriesShown >= this.state.fetchedUpdatedTestingData.length
        }
      >
        Show{" "}
        {Math.max(
          0,
          Math.min(
            this.state.entriesShown + 10,
            this.state.fetchedUpdatedTestingData.length
          ) - this.state.entriesShown
        )}{" "}
        More
      </button>
    );

    let showFewerRowsButton = (
      <button
        // style={{ marginRight: "1rem", marginTop: "0.5rem" }}
        className={styles.testingButton}
        onClick={() =>
          this.setState({
            entriesShown: Math.max(3, this.state.entriesShown - 10),
          })
        }
        disabled={this.state.entriesShown <= 3}
      >
        Show{" "}
        {this.state.entriesShown - Math.max(3, this.state.entriesShown - 10)}{" "}
        Fewer
      </button>
    );

    let showArchiveData = (
      <button
        className={styles.testingButton}
        onClick={() =>
          this.setState({
            priorTestingShown: !this.state.priorTestingShown,
          })
        }
      >
        {this.state.priorTestingShown ? "Hide" : "Show"} Archived Data
      </button>
    );

    let showMoreRowsArchiveButton = (
      <button
        style={{ marginRight: "1rem", marginTop: "0.5rem" }}
        className={styles.testingButton}
        onClick={() =>
          this.setState({
            // Pick nearest multiple of 10 or maximum number of rows
            archiveEntriesShown: Math.min(
              this.state.archiveEntriesShown + 10,
              this.state.fetchedTestingData.length
            ),
          })
        }
        disabled={
          this.state.archiveEntriesShown >= this.state.fetchedTestingData.length
        }
      >
        Show{" "}
        {Math.max(
          0,
          Math.min(
            this.state.archiveEntriesShown + 10,
            this.state.fetchedTestingData.length
          ) - this.state.archiveEntriesShown
        )}{" "}
        More
      </button>
    );

    let showFewerRowsArchiveButton = (
      <button
        // style={{ marginRight: "1rem", marginTop: "0.5rem" }}
        className={styles.testingButton}
        onClick={() =>
          this.setState({
            archiveEntriesShown: Math.max(
              3,
              this.state.archiveEntriesShown - 10
            ),
          })
        }
        disabled={this.state.archiveEntriesShown <= 3}
      >
        Show{" "}
        {this.state.archiveEntriesShown -
          Math.max(3, this.state.archiveEntriesShown - 10)}{" "}
        Fewer
      </button>
    );

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
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable
                                      )}
                                    >
                                      <p>Date of Sample Collection</p>
                                    </th>
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable
                                      )}
                                    >
                                      <p>Total Tests Administered</p>
                                    </th>
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable,
                                        styles.separator
                                      )}
                                    >
                                      <p>Total Positive Cases</p>
                                    </th>
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable
                                      )}
                                    >
                                      <p>Basking Ridge Students</p>
                                    </th>
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable,
                                        styles.dottedRight
                                      )}
                                    >
                                      <p>Basking Ridge Faculty & Staff</p>
                                    </th>
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable
                                      )}
                                    >
                                      <p>Short Hills Students</p>
                                    </th>
                                    <th
                                      className={cx(
                                        styles.tableHeader,
                                        styles.hoverable
                                      )}
                                    >
                                      <p>Short Hills Faculty & Staff</p>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className={styles.smallerText}>
                                  {this.state.fetchedUpdatedTestingData.map(
                                    (entry, i) => {
                                      const date = new Date(entry.date);
                                      return (
                                        <tr
                                          style={{
                                            display:
                                              i < this.state.entriesShown
                                                ? "table-row"
                                                : "none",
                                          }}
                                          key={i}
                                        >
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable
                                            )}
                                          >
                                            {date.getMonth() +
                                              1 +
                                              "/" +
                                              date.getDate()}
                                          </td>
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable
                                            )}
                                          >
                                            {this.formatNum(entry.numTests)}
                                          </td>
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable,
                                              styles.separator
                                            )}
                                          >
                                            {this.formatNum(
                                              entry.totalPositiveCases
                                            )}
                                          </td>
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable
                                            )}
                                          >
                                            {this.formatNum(
                                              entry.baskingRidgeStudents
                                            )}
                                          </td>
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable,
                                              styles.dottedRight
                                            )}
                                          >
                                            {this.formatNum(
                                              entry.baskingRidgeFacultyStaff
                                            )}
                                          </td>
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable
                                            )}
                                          >
                                            {this.formatNum(
                                              entry.shortHillsStudents
                                            )}
                                          </td>
                                          <td
                                            className={cx(
                                              styles.smallPadding,
                                              styles.hoverable
                                            )}
                                          >
                                            {this.formatNum(
                                              entry.shortHillsFacultyStaff
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
                      </div>
                      {showMoreRowsButton}
                      {showFewerRowsButton}
                      <br />
                      {showArchiveData}

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

                <Col md={9} lg={7} className={styles.center}>
                  <Card
                    style={{
                      display: this.state.priorTestingShown ? "flex" : "none",
                    }}
                  >
                    <Card.Body>
                      <h6 className={cx("mb-4", styles.smallmargin)}>
                        COVID-19 Testing - Archived Data
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
                                        <tr
                                          style={{
                                            display:
                                              i < this.state.archiveEntriesShown
                                                ? "table-row"
                                                : "none",
                                          }}
                                          key={i}
                                        >
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
                      {showMoreRowsArchiveButton}
                      {showFewerRowsArchiveButton}
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
                {/* <TestingChart testingData={this.state.fetchedTestingData} /> */}

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
