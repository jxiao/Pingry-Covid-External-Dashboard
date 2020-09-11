import React from "react";
import styles from "./Status.module.css";
import cx from "classnames";
import { Col, Row } from "react-bootstrap";

const Status = function (props) {
  /**
   * The following block handles the text and background color of the "Short Hills" status
   */
  var shortHillsText = "School Status";
  var shortHillsBg = styles.default;
  switch (props.shortHills) {
    case 1:
      shortHillsText = "Level 1: Campus is Open";
      shortHillsBg = styles.low;
      break;
    case 2:
      shortHillsText = "Level 2: Reduced Density";
      shortHillsBg = styles.moderate;
      break;
    case 3:
      shortHillsText = "Level 3: Fully Remote";
      shortHillsBg = styles.veryHigh;
      break;
    default:
      console.log("Unaccount status found.");
  }

  /**
   * The following block handles the text and background color of the "Basking Ridge" status
   */
  var baskingRidgeText = "School Status";
  var baskingRidgeBg = styles.default;
  switch (props.baskingRidge) {
    case 1:
      baskingRidgeText = "Level 1: Campus is Open";
      baskingRidgeBg = styles.low;
      break;
    case 2:
      baskingRidgeText = "Level 2: Reduced Density";
      baskingRidgeBg = styles.moderate;
      break;
    case 3:
      baskingRidgeText = "Level 3: Fully Remote";
      baskingRidgeBg = styles.veryHigh;
      break;
    default:
      console.log("Unaccount status found.");
  }

  return (
    <Row className={styles.statusRow}>
      <Col md={6} className={styles.col}>
        <div>
          <h3>Short Hills</h3>
        </div>
        <div
          data-tip={props.shortHillsMessage}
          className={cx(styles.roundRectangle, shortHillsBg)}
          xl={6}
          md={12}
        >
          <div className={styles.text}>{shortHillsText}</div>
        </div>
      </Col>
      <Col md={6} className={styles.col}>
        <div>
          <h3>Basking Ridge</h3>
        </div>
        <div
          data-tip={props.baskingRidgeMessage}
          className={cx(styles.roundRectangle, baskingRidgeBg)}
          xl={6}
        >
          <div className={styles.text}>{baskingRidgeText}</div>
        </div>
      </Col>
    </Row>
  );
};

export default Status;
