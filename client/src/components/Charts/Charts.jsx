import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card, Col } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import styles from "./Charts.module.css";
import cx from "classnames";

am4core.useTheme(am4themes_animated);
class Charts extends Component {
  async componentDidMount() {
    let IRchart = am4core.create("infectionratediv", am4charts.XYChart);

    IRchart.paddingRight = 20;

    let data = [];
    for (let i = 0; i < this.props.IRAverages.length; i++) {
      data.push({
        date: this.props.IRAverages[i].date,
        value: this.props.IRAverages[i].Rt,
      });
    }

    IRchart.data = data;

    let dateAxis = IRchart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = IRchart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.min = 0.5;
    valueAxis.max = 1.4;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 25;

    let series = IRchart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 3;

    series.tooltipText = "{valueY.value}";
    IRchart.cursor = new am4charts.XYCursor();
    IRchart.cursor.lineY.disabled = true;
    IRchart.cursor.behavior = "none";

    this.IRchart = IRchart;

    /**
     * CASE RATE CHART
     */
    let CRchart = am4core.create("caseratediv", am4charts.XYChart);

    CRchart.paddingRight = 20;

    data = [];
    for (let i = 0; i < this.props.CRAverages.length; i++) {
      data.push({
        date: this.props.CRAverages[i].date,
        value: this.props.CRAverages[i].caseRate,
      });
    }

    CRchart.data = data;

    dateAxis = CRchart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    valueAxis = CRchart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.min = 0;
    valueAxis.max = 40;
    valueAxis.strictMinMax = true;

    series = CRchart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 3;

    series.tooltipText = "{valueY.value}";
    CRchart.cursor = new am4charts.XYCursor();
    CRchart.cursor.lineY.disabled = true;
    CRchart.cursor.behavior = "none";

    this.CRchart = CRchart;
  }

  componentWillUnmount() {
    if (this.IRchart) {
      this.IRchart.dispose();
    }

    if (this.CRchart) {
      this.CRchart.dispose();
    }
  }

  render() {
    return (
      <Aux>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h6
                className={cx("mb-4", styles.title)}
                style={{ display: "inline-block" }}
              >
                Pingry Counties - Infection Rate (Historical)
              </h6>
              <div className={styles.description}>
                14 day average of individuals infected by 1 case, weighted based
                on Pingry distribution across NJ counties
              </div>
              <div
                id="infectionratediv"
                style={{ width: "100%", height: "250px" }}
              ></div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <h6
                className={cx("mb-4", styles.title)}
                style={{ display: "inline-block" }}
              >
                Pingry Counties - Case Rate per 100,000 (Historical)
              </h6>
              <div className={styles.description}>
                14 day average of new daily cases per 100,000, weighted based on
                Pingry distribution across NJ counties
              </div>
              <div
                id="caseratediv"
                style={{ width: "100%", height: "250px" }}
              ></div>
            </Card.Body>
          </Card>
        </Col>
      </Aux>
    );
  }
}

export default Charts;
