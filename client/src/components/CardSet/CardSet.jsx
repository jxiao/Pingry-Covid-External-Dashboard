import React from "react";
import { Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import CountUp from "react-countup";
import Local from "../../assets/images/Local";
import Pingry from "../../assets/images/Pingry";
import styles from "./CardSet.module.css";
import cx from "classnames";

const CardSet = function (props) {
  const pingryInfectionRate =
    props.fetchedCountyProjections[0].pingryCountiesInfectionRate;
  const changeIR = (
    props.fetchedCountyProjections[0].averages[1].Rt - pingryInfectionRate
  ).toFixed(2);
  const pingryInfectionRateIcon =
    changeIR < 0
      ? "feather icon-arrow-up text-c-red m-r-5"
      : changeIR > 0
      ? "feather icon-arrow-down text-c-green m-r-5"
      : "feather icon-activity text-c-blue m-r-5";

  const pingryCaseRate = props.fetchedCountyData.pingryCountiesCaseRate;
  const changeCaseRate = (
    props.fetchedCountyData.averages[1].caseRate - pingryCaseRate
  ).toFixed(2);
  const pingryCaseRateIcon =
    changeCaseRate < 0
      ? "feather icon-arrow-up text-c-red  m-r-5"
      : changeCaseRate > 0
      ? "feather icon-arrow-down text-c-green  m-r-5"
      : "feather icon-activity text-c-blue  m-r-5";

  const shortHillsPercentage = props.internal.shortHills7DayIsolationQuarantine;
  const changeShortHills =
    props.internal.averages[1].shortHillsIsolationQuarantine -
    shortHillsPercentage;
  const shortHillsPercentageIcon =
    changeShortHills < 0
      ? "feather icon-arrow-up text-c-red  m-r-5"
      : changeShortHills > 0
      ? "feather icon-arrow-down text-c-green  m-r-5"
      : "feather icon-activity text-c-blue  m-r-5";

  const baskingRidgePercentage =
    props.internal.baskingRidge7DayIsolationQuarantine;
  const changeBaskingRidge =
    props.internal.averages[1].baskingRidgeIsolationQuarantine -
    baskingRidgePercentage;
  const baskingRidgePercentageIcon =
    changeBaskingRidge < 0
      ? "feather icon-arrow-up text-c-red  m-r-5"
      : changeBaskingRidge > 0
      ? "feather icon-arrow-down text-c-green  m-r-5"
      : "feather icon-activity text-c-blue  m-r-5";

  return (
    <Aux>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h6 className="mb-4">
              Isolation or Quarantine - Short Hills Campus
            </h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  &nbsp;
                  <CountUp
                    decimals={2}
                    start={0}
                    end={shortHillsPercentage}
                    duration={2}
                    separator=","
                  />
                  % &nbsp; &nbsp;
                  <div className={styles.change}>
                    (
                    <i className={shortHillsPercentageIcon} />
                    {Math.abs(changeShortHills).toFixed(2)})
                  </div>
                </h3>
              </div>

              <div className={cx("col-3", styles.icon)}>
                <Pingry />
              </div>
            </div>
            <div>
              7 day average, based on Pingry's Internal Tracking Database
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h6 className="mb-4" style={{ display: "inline-block" }}>
              Isolation or Quarantine - Basking Ridge Campus
            </h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  &nbsp;
                  <CountUp
                    decimals={2}
                    start={0}
                    end={baskingRidgePercentage}
                    duration={2}
                    separator=","
                  />
                  % &nbsp; &nbsp;
                  <div className={styles.change}>
                    (
                    <i className={baskingRidgePercentageIcon} />
                    {Math.abs(changeBaskingRidge).toFixed(2)})
                  </div>
                </h3>
              </div>

              <div className={cx("col-3", styles.icon)}>
                <Pingry />
              </div>
            </div>
            <div>
              7 day average, based on Pingry's Internal Tracking Database
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h6 className="mb-4">Pingry Counties - Infection Rate</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  &nbsp;
                  <CountUp
                    decimals={2}
                    start={0}
                    end={pingryInfectionRate}
                    duration={2}
                    separator=","
                  />
                  &nbsp; &nbsp;
                  <div className={styles.change}>
                    (
                    <i className={pingryInfectionRateIcon} />
                    {Math.abs(changeIR).toFixed(2)})
                  </div>
                </h3>
              </div>
              <div className={cx("col-3", styles.icon)}>
                <Local />
              </div>
            </div>
            <div>
              14 day average, weighted based on Pingry student distribution
              across NJ counties
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h6 className="mb-4" style={{ display: "inline-block" }}>
              Pingry Counties - Case Rate per 100,000
            </h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  &nbsp;
                  <CountUp
                    decimals={2}
                    start={0}
                    end={pingryCaseRate}
                    duration={2}
                    separator=","
                  />
                  &nbsp; &nbsp;
                  <div className={styles.change}>
                    (
                    <i className={pingryCaseRateIcon} />
                    {Math.abs(changeCaseRate).toFixed(2)})
                  </div>
                </h3>
              </div>

              <div className={cx("col-3", styles.icon)}>
                <Local />
              </div>
            </div>
            <div>
              7 day average, weighted based on Pingry student distribution
              across NJ counties
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Aux>
  );
};

export default CardSet;
