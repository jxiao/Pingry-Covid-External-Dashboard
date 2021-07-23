import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card, Col } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import styles from "./VaccinationCharts.module.css";
import cx from "classnames";

am4core.useTheme(am4themes_animated);

class VaccinationCharts extends Component {
  static LAST_UPDATED_DATE = "September 1, 2021";
  static VACCINATED_COLOR = "#2873b0";
  static UNVACCINATED_COLOR = "#dc6888";
  static STUDENTS_DATA = [570, 270]; // [Vaccinated, Unvaccinated]
  static FACULTY_DATA = [580, 176]; // [Vaccinated, Unvaccinated]
  async componentDidMount() {
    /**
     * STUDENTS
     */
    let studentChart = am4core.create("students", am4charts.PieChart);
    const student_data = [
      {
        status: "Vaccinated",
        percentage: VaccinationCharts.STUDENTS_DATA[0],
        color: am4core.color(VaccinationCharts.VACCINATED_COLOR),
      },
      {
        status: "Unvaccinated",
        percentage: VaccinationCharts.STUDENTS_DATA[1],
        color: am4core.color(VaccinationCharts.UNVACCINATED_COLOR),
      },
    ];
    studentChart.data = student_data;

    // Add and configure Series
    let pieSeries = studentChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "percentage";
    pieSeries.dataFields.category = "status";
    let as = pieSeries.slices.template.states.getKey("active");
    as.properties.shiftRadius = 0;
    studentChart.legend = new am4charts.Legend();
    pieSeries.labels.template.text = "";
    pieSeries.slices.template.propertyFields.fill = "color";

    /**
     * FACULTY & STAFF
     */
    let facultyChart = am4core.create("faculty", am4charts.PieChart);
    const faculty_data = [
      {
        status: "Vaccinated",
        percentage: VaccinationCharts.FACULTY_DATA[0],
        color: am4core.color(VaccinationCharts.VACCINATED_COLOR),
      },
      {
        status: "Unvaccinated",
        percentage: VaccinationCharts.FACULTY_DATA[1],
        color: am4core.color(VaccinationCharts.UNVACCINATED_COLOR),
      },
    ];
    facultyChart.data = faculty_data;

    // Add and configure Series
    pieSeries = facultyChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "percentage";
    pieSeries.dataFields.category = "status";
    as = pieSeries.slices.template.states.getKey("active");
    as.properties.shiftRadius = 0;
    facultyChart.legend = new am4charts.Legend();
    pieSeries.labels.template.text = "";
    pieSeries.slices.template.propertyFields.fill = "color";
  }
  componentWillUnmount() {}
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
                Vaccination Status - Eligible Students
              </h6>
              <div className={styles.description}>
                Percentages as of {VaccinationCharts.LAST_UPDATED_DATE}
              </div>
              <div
                id="students"
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
                Vaccination Status - Faculty & Staff
              </h6>
              <div className={styles.description}>
                Percentages as of {VaccinationCharts.LAST_UPDATED_DATE}
              </div>
              <div
                id="faculty"
                style={{ width: "100%", height: "250px" }}
              ></div>
            </Card.Body>
          </Card>
        </Col>
      </Aux>
    );
  }
}

export default VaccinationCharts;
