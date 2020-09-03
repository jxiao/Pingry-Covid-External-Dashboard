import React from 'react';
import {Col, Card} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import CountUp from 'react-countup';
import Local from '../../assets/images/Local';
import Pingry from '../../assets/images/Pingry';
import styles from './CardSet.module.css';
import cx from 'classnames';

const CardSet = (function (props) {

    var prev6IR = 0;
    props.fetchedCountyProjections[0].averages.forEach((average) => {
        prev6IR += average.Rt;
    })
    prev6IR = (prev6IR - props.fetchedCountyProjections[0].averages[0].Rt) / 13;

    const pingryInfectionRate = props.fetchedCountyProjections[0].pingryCountiesInfectionRate;
    const pingryInfectionRateIcon = (prev6IR - pingryInfectionRate < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
    (prev6IR - pingryInfectionRate > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5");

    var prev6CR = 0;
    props.fetchedCountyData.averages.forEach((average) => {
        prev6CR += average.caseRate;
    })
    prev6CR = (prev6CR - props.fetchedCountyData.averages[0].caseRate) / 6;
  
    const pingryCaseRate = props.fetchedCountyData.pingryCountiesCaseRate;
    const pingryCaseRateIcon = (prev6CR - pingryCaseRate < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
                    (prev6CR - pingryCaseRate > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5"); 

    const shortHillsPercentage = props.internal.shortHills7DayIsolationQuarantine;

    var prev6SH = 0;
    props.internal.averages.forEach((average) => {
        prev6SH += average.shortHillsIsolationQuarantine;
    })
    prev6SH = (prev6SH - props.internal.averages[0].shortHillsIsolationQuarantine) / 6;

    const shortHillsPercentageIcon = (prev6SH - shortHillsPercentage < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
    (prev6SH - shortHillsPercentage > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5"); 

    var prev6BR = 0;
    props.internal.averages.forEach((average) => {
        prev6BR += average.baskingRidgeIsolationQuarantine;
    })
    prev6BR = (prev6BR - props.internal.averages[0].baskingRidgeIsolationQuarantine) / 6;

    const baskingRidgePercentage = props.internal.baskingRidge7DayIsolationQuarantine;
    const baskingRidgePercentageIcon = (prev6BR - baskingRidgePercentage < 0) ? "feather icon-arrow-up text-c-red f-30 m-r-5" :
    (prev6BR - baskingRidgePercentage > 0 ? "feather icon-arrow-down text-c-green f-30 m-r-5" : "feather icon-activity text-c-blue f-30 m-r-5"); 
    

    return (
        <Aux>
        <Col sm={12} className={styles.center}><h3>Overview</h3></Col>
        
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
                        14 day moving average
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
                        7 day moving average
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
                        7 day moving average
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
                            7 day moving average
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        
        </Aux>
        
    );
});

export default CardSet;