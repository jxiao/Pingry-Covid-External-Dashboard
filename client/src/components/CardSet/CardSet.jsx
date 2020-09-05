import React from 'react';
import {Col, Card} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import CountUp from 'react-countup';
import Local from '../../assets/images/Local';
import Pingry from '../../assets/images/Pingry';
import styles from './CardSet.module.css';
import cx from 'classnames';

const CardSet = (function (props) {

    const pingryInfectionRate = props.fetchedCountyProjections[0].pingryCountiesInfectionRate;
    const pingryInfectionRateIcon = (props.fetchedCountyProjections[0].averages[1].Rt - pingryInfectionRate < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
        (props.fetchedCountyProjections[0].averages[1].Rt - pingryInfectionRate > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5");


    const pingryCaseRate = props.fetchedCountyData.pingryCountiesCaseRate;
    const pingryCaseRateIcon = (props.fetchedCountyData.averages[1].caseRate - pingryCaseRate < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
        (props.fetchedCountyData.averages[1].caseRate - pingryCaseRate > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5"); 


    const shortHillsPercentage = props.internal.shortHills7DayIsolationQuarantine;
    const shortHillsPercentageIcon = (props.internal.averages[1].shortHillsIsolationQuarantine - shortHillsPercentage < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
    (props.internal.averages[1].shortHillsIsolationQuarantine - shortHillsPercentage > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5"); 


    const baskingRidgePercentage = props.internal.baskingRidge7DayIsolationQuarantine;
    const baskingRidgePercentageIcon = (props.internal.averages[1].baskingRidgeIsolationQuarantine - baskingRidgePercentage < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
    (props.internal.averages[1].baskingRidgeIsolationQuarantine - baskingRidgePercentage > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5"); 
    

    return (
        <Aux>
        <Col sm={12} className={styles.center}><h3>COVID-19 Tracking Dashboard</h3><h6 className={styles.smallerText}>Data Sources: The New York Times, CovidActNow.org, Pingry's Internal Tracking Database</h6></Col>
        <Col md={6}>
            <Card>
                <Card.Body>
                    <h6 className='mb-4' >Pingry Counties - Infection Rate</h6>
                    <div className="row d-flex align-items-center">
                        <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className={pingryInfectionRateIcon}/> <CountUp decimals={2} start={0} end={pingryInfectionRate} duration={2} separator=","/></h3>
                        </div>
                        <div className={cx("col-3", styles.icon)}>
                            <Local />
                        </div>
                    </div>
                    <div>
                        14 day average, weighted based on Pingry student distribution across NJ counties
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
            <Card>
                <Card.Body>
                    <h6 className='mb-4' style={{display: "inline-block"}}>Pingry Counties - Case Rate per 100,000</h6>
                    <div className="row d-flex align-items-center">
                        <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className={pingryCaseRateIcon}/> <CountUp decimals={2} start={0} end={pingryCaseRate} duration={2} separator=","/></h3>
                        </div>

                        <div className={cx("col-3", styles.icon)}>
                            <Local />
                        </div>
                    </div>
                    <div>
                        7 day average, weighted based on Pingry student distribution across NJ counties
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
            <Card>
                <Card.Body>
                    <h6 className='mb-4'>% Campus in Isolation or Quarantine (Short Hills)</h6>
                    <div className="row d-flex align-items-center">
                        <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className={shortHillsPercentageIcon}/> <CountUp decimals={2} start={0} end={shortHillsPercentage} duration={2} separator=","/>%</h3>
                        </div>

                        <div className={cx("col-3", styles.icon)}>
                            <Pingry />
                        </div>
                    </div>
                    <div>
                        7 day average, based on Pingry's Internal Tracking Database
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
            <Card>
                <Card.Body>
                    <h6 className='mb-4' style={{display: "inline-block"}}>% Campus in Isolation or Quarantine (Basking Ridge)</h6>
                    <div className="row d-flex align-items-center">
                        <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className={baskingRidgePercentageIcon}/> <CountUp decimals={2} start={0} end={baskingRidgePercentage} duration={2} separator=","/>%</h3>
                        </div>

                        <div className={cx("col-3", styles.icon)}>
                            <Pingry />
                        </div>
                    </div>
                    <div>
                        7 day average, based on Pingry's Internal Tracking Database
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Aux>
    );
});

export default CardSet;