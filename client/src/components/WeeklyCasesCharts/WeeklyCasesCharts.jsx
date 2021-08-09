import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card, Col } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import styles from "./WeeklyCasesCharts.module.css";
import cx from "classnames";

am4core.useTheme(am4themes_animated);
class WeeklyCasesCharts extends Component {
  async componentDidMount() {
    // Default max axis
    let axis_max = 15;
    const ENTRIES_SHOWN = 5;

    /**
     * SHORT HILLS DATA FETCHING
     */
    let SHchart = am4core.create("shweeklycases", am4charts.XYChart);

    SHchart.paddingRight = 20;
    console.log(this.props.fetchedUpdatedTestingData);

    let sh_data = [];
    for (
      let i = 0;
      i < Math.min(this.props.fetchedUpdatedTestingData.length, ENTRIES_SHOWN);
      i++
    ) {
      const value =
        this.props.fetchedUpdatedTestingData[i].shortHillsStudents +
        this.props.fetchedUpdatedTestingData[i].shortHillsFacultyStaff;
      axis_max = Math.ceil(Math.max(axis_max, 1.05 * value) / 5) * 5;
      sh_data.push({
        date: this.props.fetchedUpdatedTestingData[i].date,
        value: value,
      });
    }

    const sh_data_temp = [
      { date: new Date(2021, 7, 30), value: 1 },
      { date: new Date(2021, 8, 6), value: 9 },
      { date: new Date(2021, 8, 13), value: 8 },
      { date: new Date(2021, 8, 20), value: 12 },
      { date: new Date(2021, 8, 27), value: 2 },
    ];

    /**
     * BASKING RIDGE DATA FETCHING
     */
    let BRChart = am4core.create("brweeklycases", am4charts.XYChart);

    BRChart.paddingRight = 20;

    let br_data = [];
    for (
      let i = 0;
      i < Math.min(this.props.fetchedUpdatedTestingData.length, ENTRIES_SHOWN);
      i++
    ) {
      const value =
        this.props.fetchedUpdatedTestingData[i].baskingRidgeStudents +
        this.props.fetchedUpdatedTestingData[i].baskingRidgeFacultyStaff;
      axis_max = Math.ceil(Math.max(axis_max, 1.05 * value) / 5) * 5;
      br_data.push({
        date: this.props.fetchedUpdatedTestingData[i].date,
        value: value,
      });
    }

    axis_max = 15;
    const br_data_temp = [
      { date: new Date(2021, 7, 30), value: 2 },
      { date: new Date(2021, 8, 6), value: 12 },
      { date: new Date(2021, 8, 13), value: 3 },
      { date: new Date(2021, 8, 20), value: 0 },
      { date: new Date(2021, 8, 27), value: 7 },
    ];

    /**
     * SHORT HILLS CHART MOUNTING
     */
    SHchart.data = sh_data;
    // SHchart.data = sh_data_temp;

    let dateAxis = SHchart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = SHchart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.min = 0;
    valueAxis.max = axis_max;
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
     * BASKING RIDGE CHART MOUNTING
     */
    BRChart.data = br_data;
    // BRChart.data = br_data_temp;

    dateAxis = BRChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    valueAxis = BRChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.min = 0;
    valueAxis.max = axis_max;
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
                New Weekly Cases - Short Hills
              </h6>
              {/* <div className={styles.description}>
                7 day average of % Short Hills campus individuals in isolation
                or quarantine, subject to change based on backdated entries
              </div> */}
              <div
                id="shweeklycases"
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
                New Weekly Cases - Basking Ridge
              </h6>
              {/* <div className={styles.description}>
                7 day average of % Basking Ridge campus individuals in isolation
                or quarantine, subject to change based on backdated entries
              </div> */}
              <div
                id="brweeklycases"
                style={{ width: "100%", height: "250px" }}
              ></div>
            </Card.Body>
          </Card>
        </Col>
      </Aux>
    );
  }
}

export default WeeklyCasesCharts;
