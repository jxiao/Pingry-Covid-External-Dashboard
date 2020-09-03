import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_region_usa_njHigh from "@amcharts/amcharts4-geodata/region/usa/njHigh";
import styles from './CountyMap.module.css';
import { fetchCountyTotalsDB } from '../../api';
import {Col} from 'react-bootstrap';



am4core.useTheme(am4themes_animated);

/**
 * Reference: https://www.amcharts.com/docs/v4/chart-types/map/
 */
class CountyMap extends Component {
  async componentDidMount() {

    var chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_region_usa_njHigh;

    // Set projection
    chart.projection = new am4maps.projections.Miller();
    
    // Disable zoom
    chart.maxZoomLevel = 1;

    // Disable panning
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;

    // // Title
    // var title = chart.titles.create();
    // title.text = "Totals Cases by County";
    // title.fontSize = 22;
    // title.bold = true;
    // title.align = "left";
    // title.wrap = true;
    // title.maxWidth = 100;


    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.dataFields.value = "totalCases";

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {totalCases}";
    polygonTemplate.fill = am4core.color("#74B266");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.3),
      logarithmic: true
    });

    // Create image series
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());

    // Create image
    var imageSeriesTemplate = imageSeries.mapImages.template;
    var marker = imageSeriesTemplate.createChild(am4core.Image);
    marker.href = "https://image.flaticon.com/icons/svg/787/787535.svg";
    marker.width = marker.height = 25;
    marker.nonScaling = true;
    marker.tooltipText = "{title}";
    marker.horizontalCenter = "middle";
    marker.verticalCenter = "bottom";

    // Set property fields
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    // Add data for the Pingry Upper School
    imageSeries.data = [{
      "latitude": 40.620030,
      "longitude": -74.567740,
      "title": "Basking Ridge Campus"
    }, {
      "latitude": 40.742600,
      "longitude": -74.336400,
      "title": "Short Hills Campus"
    }];

    // NOTE: REFACTOR TO MAKE CALL TO DATABASE IN APP RATHER THAN HERE
    const countyData = await fetchCountyTotalsDB();
    polygonSeries.data = countyData;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <Col md={6} xl={4}>
      <div id="chartdiv" className={styles.chart}></div>
      </Col>
    );
  }
}

export default CountyMap;