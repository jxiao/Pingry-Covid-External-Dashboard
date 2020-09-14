import React from "react";
import { Col, Card } from "react-bootstrap";

import styles from "./CountyTable.module.css";
import cx from "classnames";
var ReactFitText = require("react-fittext");

// Morris, Essex, Hudson, Hunterdon, Somerset and Union
const indicesOfHighlightedCounties = [6, 8, 9, 13, 17, 19];

const CountyTable = function (props) {
  // Not done fetching data --> don't display table/table headers
  if (
    !props.data ||
    props.data.length === 0 ||
    !props.countyData ||
    props.countyData.length === 0
  ) {
    return null;
  }

  const d1 = props.countyData[0].counties[0].historicData[0];
  const d7 = props.countyData[0].counties[0].historicData[6];
  const d8 = props.countyData[0].counties[0].historicData[7];
  const d14 = props.countyData[0].counties[0].historicData[13];

  return (
    <Col md={12} xl={8} className={styles.table}>
      <Card className={styles.noBottom}>
        <Card.Header>
          <Card.Title as="h5" className={styles.large}>
            Breakdown by NJ Counties
          </Card.Title>
          <p className={styles.paragraph}>
            Highlighted rows indicate heavy Pingry residence
          </p>
        </Card.Header>
        <Card.Body className={cx("px-0 py-2", styles.noTopPadding)}>
          <table className={cx("table", styles.noBottom, styles.tableFixed)}>
            <thead className={styles.theadTable}>
              <tr className={styles.trTable}>
                <th className={cx(styles.thTable, styles.one)}>
                  <ReactFitText compressor={0}>
                    <p>County</p>
                  </ReactFitText>
                </th>
                <th className={cx(styles.thTable, styles.two)}>
                  <ReactFitText compressor={0}>
                    <p>Total Cases</p>
                  </ReactFitText>
                </th>
                <th className={cx(styles.thTable, styles.three)}>
                  <ReactFitText compressor={0}>
                    <p>
                      New Cases ({removeYear(d1.date)} - {removeYear(d7.date)})
                    </p>
                  </ReactFitText>
                </th>
                <th className={cx(styles.thTable, styles.four)}>
                  <ReactFitText compressor={0}>
                    <p>
                      New Cases ({removeYear(d8.date)} - {removeYear(d14.date)})
                    </p>
                  </ReactFitText>
                </th>
                <th className={cx(styles.thTable, styles.five)}>
                  <ReactFitText compressor={0}>
                    <p data-tip={"Average # of new infections per infected"}>
                      14-day Average Infection Rate
                    </p>
                  </ReactFitText>
                </th>
              </tr>
            </thead>
            <tbody className={styles.tbodyTable}>
              {props.data.map((county, i) => {
                const highlight = indicesOfHighlightedCounties.includes(i);
                const currSeven =
                  props.countyData[i].counties[0].historicData[0].positiveCt -
                  props.countyData[i].counties[0].historicData[6].positiveCt;
                const prevSeven =
                  props.countyData[i].counties[0].historicData[7].positiveCt -
                  props.countyData[i].counties[0].historicData[13].positiveCt;

                var infectionRate14DayWeightedAverage =
                  props.fetchedCountyProjections[0].data[i].infectionRates[0]
                    .Rt;

                return (
                  <tr
                    key={i}
                    className={cx(
                      highlight ? styles.highlight : "",
                      styles.trTable
                    )}
                  >
                    <td className={styles.tdTable}>
                      <h6 className={cx("mb-1", styles.small)}>
                        {county.name}
                      </h6>
                    </td>
                    <td className={styles.tdTable}>
                      <h6 className={cx("text-muted", styles.small)}>
                        {county.totalCases.toLocaleString("en-US")} cases
                      </h6>
                    </td>
                    <td className={styles.tdTable}>
                      <h6 className={cx("text-muted", styles.small)}>
                        {currSeven < 0 ? "-" : "+"}
                        {currSeven.toLocaleString("en-US")}
                      </h6>
                    </td>
                    <td className={styles.tdTable}>
                      <h6 className={cx("text-muted", styles.small)}>
                        {prevSeven < 0 ? "-" : "+"}
                        {prevSeven.toLocaleString("en-US")}
                      </h6>
                    </td>
                    <td className={styles.tdTable}>
                      <h6 className={cx("text-muted", styles.small)}>
                        {infectionRate14DayWeightedAverage.toFixed(2)}
                      </h6>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* </Table> */}
          </table>
        </Card.Body>
      </Card>
    </Col>
  );
};

function removeYear(date) {
  return `${parseInt(date.substring(5, 7))}/${parseInt(date.substring(8, 10))}`;
}

export default CountyTable;
