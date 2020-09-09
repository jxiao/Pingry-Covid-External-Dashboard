import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import styles from "./Charts.module.css";
import { Card, Col } from "react-bootstrap";
import Aux from "../../hoc/_Aux";

am4core.useTheme(am4themes_animated);
class Charts extends Component {
  async componentDidMount() {
    let IRchart = am4core.create("infectionratediv", am4charts.XYChart);

    IRchart.paddingRight = 20;

    let data = [];
    let date = new Date();
    for (let i = 0; i < this.props.IRAverages.length; i++) {
      data.push({
        date: new Date(date),
        value: this.props.IRAverages[i].Rt,
      });
      date.setDate(date.getDate() - 1);
    }

    IRchart.data = data;

    let dateAxis = IRchart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = IRchart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

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
    date = new Date();
    date.setDate(date.getDate() - 2);
    for (let i = 0; i < this.props.CRAverages.length; i++) {
      data.push({
        date: new Date(date),
        value: this.props.CRAverages[i].caseRate,
      });
      date.setDate(date.getDate() - 1);
    }

    CRchart.data = data;

    dateAxis = CRchart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    valueAxis = CRchart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

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
              <h6 className="mb-4" style={{ display: "inline-block" }}>
                Average Infection Rate of Pingry Counties
              </h6>
              <div
                id="infectionratediv"
                style={{ width: "100%", height: "250px" }}
                className={styles.chart}
              ></div>
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
                Average Case Rate of Pingry Counties
              </h6>
              <div
                id="caseratediv"
                style={{ width: "100%", height: "250px" }}
                className={styles.chart}
              ></div>
              <div>
                7 day average, weighted based on Pingry student distribution
                across NJ counties
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Aux>
    );
  }
}

export default Charts;
