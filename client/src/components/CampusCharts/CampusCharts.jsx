import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card, Col } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import styles from "./CampusCharts.module.css";
import cx from "classnames"

am4core.useTheme(am4themes_animated);
class CampusCharts extends Component {
  async componentDidMount() {
    /**
     * SHORT HILLS CHART
     */
    let SHchart = am4core.create("shorthillsdiv", am4charts.XYChart);

    SHchart.paddingRight = 20;

    let data = [];
    for (let i = 0; i < this.props.internal.averages.length; i++) {
      data.push({
        date: this.props.internal.averages[i].date,
        value: this.props.internal.averages[i].shortHills,
      });
    }

    // let data = [];
    // for (let i = 1; i < this.props.detailedStats.averages.length; i++) {
    //   data.push({
    //     date: this.props.detailedStats.averages[i].date,
    //     value: this.props.detailedStats.averages[i].shortHills,
    //   });
    // }

    SHchart.data = data;

    let dateAxis = SHchart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = SHchart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.min = 0;
    valueAxis.max = 25;
    valueAxis.strictMinMax = true;

    let series = SHchart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 3;

    series.tooltipText = "{valueY.value}";
    SHchart.cursor = new am4charts.XYCursor();
    SHchart.cursor.lineY.disabled = true;
    SHchart.cursor.behavior = "none";

    this.SHchart = SHchart;

    /**
     * BASKING RIDGE CHART
     */
    let BRChart = am4core.create("baskingridgediv", am4charts.XYChart);

    BRChart.paddingRight = 20;

    data = [];
    for (let i = 0; i < this.props.internal.averages.length; i++) {
      data.push({
        date: this.props.internal.averages[i].date,
        value: this.props.internal.averages[i].baskingRidge,
      });
    }

    // data = [];
    // for (let i = 1; i < this.props.detailedStats.averages.length; i++) {
    //   data.push({
    //     date: this.props.detailedStats.averages[i].date,
    //     value: this.props.detailedStats.averages[i].baskingRidge,
    //   });
    // }

    BRChart.data = data;

    dateAxis = BRChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    valueAxis = BRChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.min = 0;
    valueAxis.max = 25;
    valueAxis.strictMinMax = true;

    series = BRChart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 3;

    series.tooltipText = "{valueY.value}";
    BRChart.cursor = new am4charts.XYCursor();
    BRChart.cursor.lineY.disabled = true;
    BRChart.cursor.behavior = "none";

    this.BRChart = BRChart;
  }

  componentWillUnmount() {
    if (this.SHChart) {
      this.SHChart.dispose();
    }

    if (this.BRChart) {
      this.BRChart.dispose();
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
                Isolation or Quarantine - Short Hills (Historical)
              </h6>
              <div className={styles.description}>
                7 day average of % Short Hills campus individuals in isolation
                or quarantine
              </div>
              <div
                id="shorthillsdiv"
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
                Isolation or Quarantine - Basking Ridge (Historical)
              </h6>
              <div className={styles.description}>
                7 day average of % Basking Ridge campus individuals in isolation
                or quarantine
              </div>
              <div
                id="baskingridgediv"
                style={{ width: "100%", height: "250px" }}
              ></div>
            </Card.Body>
          </Card>
        </Col>
      </Aux>
    );
  }
}

export default CampusCharts;
