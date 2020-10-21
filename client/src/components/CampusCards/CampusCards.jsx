import React from "react";
import { Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import CountUp from "react-countup";
import Pingry from "../../assets/images/Pingry";
import styles from "./CampusCards.module.css";
import cx from "classnames";

const CampusCards = function (props) {
  // const shortHillsPercentage = props.internal.shortHills7DayIsolationQuarantine;

  // const baskingRidgePercentage =
  //   props.internal.baskingRidge7DayIsolationQuarantine;

  const shortHillsPercentage =
    props.detailedStats.shortHills7DayIsolationQuarantine;

  const baskingRidgePercentage =
    props.detailedStats.baskingRidge7DayIsolationQuarantine;

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
                  %
                </h3>
              </div>

              <div className={cx("col-3", styles.icon)}>
                <Pingry />
              </div>
            </div>
            <div>
              7 day average of % Short Hills campus individuals in isolation or
              quarantine
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
                  %
                </h3>
              </div>

              <div className={cx("col-3", styles.icon)}>
                <Pingry />
              </div>
            </div>
            <div>
              7 day average of % Basking Ridge campus individuals in isolation
              or quarantine
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Aux>
  );
};

export default CampusCards;
