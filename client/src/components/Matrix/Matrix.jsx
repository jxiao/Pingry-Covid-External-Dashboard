import React from 'react';
import Aux from "../../hoc/_Aux";
import {Table, Col} from 'react-bootstrap';
import styles from "./Matrix.module.css";
var ReactFitText = require('react-fittext');


/**
 * 
 * @param {*} props Object containing 2 arrays (shortHills, baskingRidge)
 * Each array contains 3 values from 1 to 3 (inclusive), where each val is 
 * an indicator:
 * 1 ==> Safe
 * 2 ==> Warning
 * 3 ==> Shutdown
 */

const Matrix = (function (props) {
  // Not done fetching data --> don't display matrix
  if (!props.shortHills || !props.shortHills.length || !props.baskingRidge || !props.baskingRidge.length) {
    return null; 
  }
  return (<Aux>
    <Col md={6} xl={4}>
      <Table bordered className={styles.table}>
        <thead>
          <tr>
            <th className={styles.campus}><ReactFitText compressor={0}><p>SHORT HILLS</p></ReactFitText></th>
            <th><ReactFitText compressor={0}><p>14-day Average Infection Rate</p></ReactFitText></th>
            <th><ReactFitText compressor={0}><p>7-day Average Case Rate per 100,000</p></ReactFitText></th>
            <th><ReactFitText compressor={0}><p>% Campus in Isolation or Quarantine</p></ReactFitText></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{verticalAlign: "middle"}} className={styles.levels}><ReactFitText compressor={0}><p>Safe</p></ReactFitText></td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[0] === 1 ? styles.safe : ""}>{String.fromCharCode(60)} {props.thresholds[0][0]}</td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[1] === 1 ? styles.safe : ""}>{String.fromCharCode(60)} {props.thresholds[1][0]}</td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[2] === 1 ? styles.safe : ""}>{String.fromCharCode(60)} {props.thresholds[2][0]}%</td>
          </tr>
          <tr>
            <td style={{verticalAlign: "middle"}} className={styles.levels}><ReactFitText compressor={0}><p>Warning</p></ReactFitText></td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[0] === 2 ? styles.warning : ""}>{props.thresholds[0][0]} to {props.thresholds[0][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[1] === 2 ? styles.warning : ""}>{props.thresholds[1][0]} to {props.thresholds[1][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[2] === 2 ? styles.warning : ""}>{props.thresholds[2][0]}% to {props.thresholds[2][1]}%</td>
          </tr>
          <tr>
            <td style={{verticalAlign: "middle"}} className={styles.levels}><ReactFitText compressor={0}><p>Shutdown</p></ReactFitText></td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[0] === 3 ? styles.shutdown : ""}>{String.fromCharCode(8805)} {props.thresholds[0][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[1] === 3 ? styles.shutdown : ""}>{String.fromCharCode(8805)} {props.thresholds[1][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.shortHills[2] === 3 ? styles.shutdown : ""}>{String.fromCharCode(8805)} {props.thresholds[2][1]}%</td>
          </tr>
        </tbody>
      </Table>
    </Col>



    <Col md={6} xl={4}>
      <Table bordered className={styles.table}>
        <thead>
          <tr>
            <th className={styles.campus}><ReactFitText compressor={0}><p>BASKING RIDGE</p></ReactFitText></th>
            <th><ReactFitText compressor={0}><p>14-day Average Infection Rate</p></ReactFitText></th>
            <th><ReactFitText compressor={0}><p>7-day Average Case Rate per 100,000</p></ReactFitText></th>
            <th><ReactFitText compressor={0}><p>% Campus in Isolation or Quarantine</p></ReactFitText></th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{verticalAlign: "middle"}} className={styles.levels}><ReactFitText compressor={0}><p>Safe</p></ReactFitText></td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[0] === 1 ? styles.safe : ""}>{String.fromCharCode(60)} {props.thresholds[0][0]}</td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[1] === 1 ? styles.safe : ""}>{String.fromCharCode(60)} {props.thresholds[1][0]}</td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[2] === 1 ? styles.safe : ""}>{String.fromCharCode(60)} {props.thresholds[2][0]}%</td>
          </tr>
          <tr>
            <td style={{verticalAlign: "middle"}} className={styles.levels}><ReactFitText compressor={0}><p>Warning</p></ReactFitText></td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[0] === 2 ? styles.warning : ""}>{props.thresholds[0][0]} to {props.thresholds[0][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[1] === 2 ? styles.warning : ""}>{props.thresholds[1][0]} to {props.thresholds[1][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[2] === 2 ? styles.warning : ""}>{props.thresholds[2][0]}% to {props.thresholds[2][1]}%</td>
          </tr>
          <tr>
            <td style={{verticalAlign: "middle"}} className={styles.levels}><ReactFitText compressor={0}><p>Shutdown</p></ReactFitText></td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[0] === 3 ? styles.shutdown : ""}>{String.fromCharCode(8805)} {props.thresholds[0][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[1] === 3 ? styles.shutdown : ""}>{String.fromCharCode(8805)} {props.thresholds[1][1]}</td>
            <td style={{verticalAlign: "middle"}} className={props.baskingRidge[2] === 3 ? styles.shutdown : ""}>{String.fromCharCode(8805)} {props.thresholds[2][1]}%</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  </Aux>)
});

export default Matrix;