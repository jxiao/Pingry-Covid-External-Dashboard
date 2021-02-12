import React from "react";
import styles from "./TestingChart.module.css";
import { Col, Card } from "react-bootstrap";
import cx from "classnames";

const TestingChart = function (props) {
  let headers = [];
  let totalTestsAdministered = [];
  let numberPositiveCases = [];
  let baskingRidgeStudents = [];
  let baskingRidgeFacultyStaff = [];
  let shortHillsStudents = [];
  let shortHillsFacultyStaff = [];

  for (var i = 6; i >= 0; i--) {
    const date = new Date(props.testingData[i].date);
    headers.push(
      <th className={cx(styles.tableHeader, styles.hoverable)} key={i}>
        <p>{date.getMonth() + 1 + "/" + date.getDate()}</p>
      </th>
    );
    totalTestsAdministered.push(
      <td className={cx(styles.smallPadding, styles.hoverable)} key={i}>
        {props.testingData[i].numTests}
      </td>
    );
    numberPositiveCases.push(
      <td className={cx(styles.smallPadding, styles.hoverable)} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    baskingRidgeStudents.push(
      <td className={cx(styles.smallPadding, styles.hoverable)} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    baskingRidgeFacultyStaff.push(
      <td className={cx(styles.smallPadding, styles.hoverable)} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    shortHillsStudents.push(
      <td className={cx(styles.smallPadding, styles.hoverable)} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    shortHillsFacultyStaff.push(
      <td className={cx(styles.smallPadding, styles.hoverable)} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
  }
  return (
    <>
      <Col md={9} lg={7} className={styles.center}>
        <Card>
          <Card.Body>
            <h6 className={cx("mb-4", styles.smallmargin)}>
              Pingry's Return-to-School COVID-19 Testing Cycle
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
                            className={styles.labelColumn}
                            style={{ borderTop: "none" }}
                          ></th>
                          {headers}
                        </tr>
                      </thead>
                      <tbody className={styles.smallerText}>
                        <tr>
                          <td
                            className={cx(
                              styles.smallPadding,
                              styles.tableHeader,
                              styles.rowTitle,
                              styles.hoverable
                            )}
                          >
                            Total Tests Administered
                          </td>
                          {totalTestsAdministered}
                        </tr>
                        <tr>
                          <td
                            className={cx(
                              styles.smallPadding,
                              styles.tableHeader,
                              styles.rowTitle,
                              styles.hoverable
                            )}
                          >
                            Number of Positive Cases
                          </td>
                          {numberPositiveCases}
                        </tr>
                        <tr>
                          <td
                            className={cx(styles.smallPadding, styles.empty)}
                          ></td>
                        </tr>
                        <tr>
                          <td
                            className={cx(
                              styles.smallPadding,
                              styles.tableHeader,
                              styles.rowTitle,
                              styles.hoverable
                            )}
                          >
                            Basking Ridge Students
                          </td>
                          {baskingRidgeStudents}
                        </tr>
                        <tr>
                          <td
                            className={cx(
                              styles.smallPadding,
                              styles.tableHeader,
                              styles.rowTitle,
                              styles.hoverable
                            )}
                          >
                            Basking Ridge Faculty & Staff
                          </td>
                          {baskingRidgeFacultyStaff}
                        </tr>
                        <tr>
                          <td
                            className={cx(styles.smallPadding, styles.empty)}
                          ></td>
                        </tr>
                        <tr>
                          <td
                            className={cx(
                              styles.smallPadding,
                              styles.tableHeader,
                              styles.rowTitle,
                              styles.hoverable
                            )}
                          >
                            Short Hills Students
                          </td>
                          {shortHillsStudents}
                        </tr>
                        <tr>
                          <td
                            className={cx(
                              styles.smallPadding,
                              styles.tableHeader,
                              styles.rowTitle,
                              styles.hoverable
                            )}
                          >
                            Short Hills Faculty & Staff
                          </td>
                          {shortHillsFacultyStaff}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </h3>
              </div>
            </div>
            <br />
            <div>Updated upon receipt of results from Mirimus Labs</div>
            <div>
              <a
                href="https://pingryanywhere.org/health-safety/covid-19-testing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Detailed information regarding Pingry's COVID-19 Testing
              </a>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TestingChart;
