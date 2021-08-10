import React from "react";
import { Col, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import CountUp from "react-countup";
import Pingry from "../../assets/images/Pingry";
import styles from "./VaccinationCards.module.css";
import cx from "classnames";

const VaccinationCards = ({ fetchedVaccinations }) => {
  const studentsPercentage =
    fetchedVaccinations.length > 0 ? fetchedVaccinations[0].students : "N/A";
  const facultyStaffPercentage =
    fetchedVaccinations.length > 0
      ? fetchedVaccinations[0].facultyStaff
      : "N/A";

  const date =
    fetchedVaccinations.length > 0
      ? new Date(fetchedVaccinations[0].date).toLocaleDateString(
          {},
          { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
        )
      : "N/A";

  return (
    <Aux>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h6 className="mb-4">Percentage Vaccinated - Eligible Students</h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  &nbsp;
                  <CountUp
                    decimals={1}
                    start={0}
                    end={studentsPercentage}
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
            <div>Percentages as of {date}.</div>
            <div>
              Eligibility for students is determined by age as well as religious
              or medical exemptions.
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h6 className="mb-4" style={{ display: "inline-block" }}>
              Percentage Vaccinated - Faculty & Staff
            </h6>
            <div className="row d-flex align-items-center">
              <div className="col-9">
                <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  &nbsp;
                  <CountUp
                    decimals={1}
                    start={0}
                    end={facultyStaffPercentage}
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
            <div>Percentages as of {date}.</div>
            <div>
              Some faculty and staff are exempt due to religious or medical
              exemptions.
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Aux>
  );
};

export default VaccinationCards;
