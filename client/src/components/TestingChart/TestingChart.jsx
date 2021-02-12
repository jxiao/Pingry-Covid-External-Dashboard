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
      <th className={styles.tableHeader} key={i}>
        <p>{date.getMonth() + 1 + "/" + date.getDate()}</p>
      </th>
    );
    totalTestsAdministered.push(
      <td className={styles.smallPadding} key={i}>
        {props.testingData[i].numTests}
      </td>
    );
    numberPositiveCases.push(
      <td className={styles.smallPadding} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    baskingRidgeStudents.push(
      <td className={styles.smallPadding} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    baskingRidgeFacultyStaff.push(
      <td className={styles.smallPadding} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    shortHillsStudents.push(
      <td className={styles.smallPadding} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
    shortHillsFacultyStaff.push(
      <td className={styles.smallPadding} key={i}>
        {Math.floor(Math.random() * 50)}
      </td>
    );
  }
  return (
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
                            styles.rowTitle
                          )}
                        >
                          Total tests administered
                        </td>
                        {totalTestsAdministered}
                      </tr>
                      <tr>
                        <td
                          className={cx(
                            styles.smallPadding,
                            styles.tableHeader,
                            styles.rowTitle
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
                            styles.rowTitle
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
                            styles.rowTitle
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
                            styles.rowTitle
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
                            styles.rowTitle
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
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TestingChart;
