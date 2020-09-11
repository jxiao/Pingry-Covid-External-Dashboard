import React from "react";
import { Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import CountUp from "react-countup";
import Local from "../../assets/images/Local";
import styles from "./CardSet.module.css";
import cx from "classnames";

const CardSet = function (props) {
  const pingryInfectionRate =
    props.fetchedCountyProjections[0].pingryCountiesInfectionRate;

  const pingryCaseRate = props.fetchedCountyData.pingryCountiesCaseRate;

  return (
    <Aux>
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
                </h3>
              </div>
              <div className={cx("col-3", styles.icon)}>
                <Local />
              </div>
            </div>
            <div>
              14 day average of individuals infected by 1 case, weighted based
              on Pingry distribution across NJ counties
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
                </h3>
              </div>

              <div className={cx("col-3", styles.icon)}>
                <Local />
              </div>
            </div>
            <div>
              7 day average of new daily cases per 100,000, weighted based on
              Pingry distribution across NJ counties
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Aux>
  );
};

export default CardSet;
