import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import styles from "./CovidActNowCard.module.css";
import { Col, Form, Card } from "react-bootstrap";

const BASE_SRC_URL = "https://covidactnow.org/embed/us/";
const COUNTY_OPTIONS = [
  "Atlantic",
  "Bergen",
  "Burlington",
  "Camden",
  "Cape May",
  "Cumberland",
  "Essex",
  "Gloucester",
  "Hudson",
  "Hunterdon",
  "Mercer",
  "Middlesex",
  "Monmouth",
  "Morris",
  "Ocean",
  "Passaic",
  "Salem",
  "Somerset",
  "Sussex",
  "Union",
  "Warren",
];

class CovidActNowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ending: props.default || "nj",
    };
  }

  reload(val) {
    this.setState({
      ending: val,
    });
  }

  render() {
    return (
      <Aux>
        <Col md={6} xl={4} className={styles.back}>
          <Card className={styles.background}>
            <Card.Body>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>
                  Select NJ or a county for detailed statistics
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => this.reload(event.target.value)}
                >
                  <option key={-1} value={"nj"}>
                    New Jersey
                  </option>
                  {COUNTY_OPTIONS.map((opt, i) => {
                    return (
                      <option key={i} value={`county/${34001 + 2 * i}`}>
                        {opt}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <iframe
                src={`${BASE_SRC_URL}${this.state.ending}`}
                title="Covid Act Now"
                width="350"
                height="370"
                frameBorder="0"
                scrolling="no"
                className={styles.frame}
                style={{ backgroundColor: "none" }}
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Aux>
    );
  }
}

export default CovidActNowCard;
