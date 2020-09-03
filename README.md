# Pingry COVID-19 Dashboard

Public facing dashboard for the Pingry community regarding campus reopening statuses and COVID-19 cases at state, county, and school levels.  

Statistics of cases at the state and county levels are provided by [The New York Times](https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv), [The Covid Tracking Project](https://covidtracking.com/), and [CovidActNow.org](https://www.covidactnow.org/). Detailed statistics involving the Pingry community are monitored both internally and alongside local health departments.

## Screenshots

## Primary Features

### Status

The most prominent components on the front page, the two statuses (one for the Short Hills campus, the other for the Basking Ridge campus) show the reopening status of the school.  Based off of the NJ Department of Health's color coding recommendations, the three options are:

* Green: Low Risk (Hybrid Model)
* Yellow: Moderate Risk (Reduced Density)
* Red: High Risk (Fully Remote)

### Overview Cards

Displays the at-large statistics regarding new/total cases in NJ, local counties (Essex, Morris, Somerset, Union), and Pingry.  The latter three cards display slightly more specific data regarding active cases by campus.

### Campus Reopening Decision Matrices

With the philosophy of full transparency in mind, the two matrices show the reasoning behind the status for each campus.  Based on several categories and thresholds, the matrix updates regularly when new data is fetched (also updates the status components on change, as necessary).

### NJ County Heatmap

A visual addition to the dashboard showing total cases for each county. Pingry campuses are highlighted with map pins.

### CovidActNow NJ State/County Detailed Stats

A snapshot showing more unique, key statistics in determining the reopening status of campuses (i.e. infection rate).  Specify the state or NJ county or more specific details.

### NJ County Breakdown Table

Compiling most of the data from the heatmap and CovidActNow snippet, the table shows total cases, new cases in the last 7 days, new cases in the prior 7 days, and the infection rate by NJ's 21 counties.

## Tech/Frameworks Used

### Frontend
* React
* CSS 3

### Backend
* Node.js
* Express

### Databases/Deployment
* MongoDB/Mongoose
* Heroku
