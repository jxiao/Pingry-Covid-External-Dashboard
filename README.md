# Pingry COVID-19 Dashboard (External)

External, public-facing dashboard for the Pingry community regarding COVID-19 cases at state, county, and school levels.

Statistics of cases at the state and county levels are provided by [The New York Times](https://github.com/nytimes/covid-19-data/blob/master/us-counties.csv), [The Covid Tracking Project](https://covidtracking.com/), and [CovidActNow.org](https://www.covidactnow.org/). Detailed statistics involving the Pingry community are monitored both internally and alongside local health departments.

Link here: [Pingry COVID-19 Dashboard - External](https://pingry-covid-metrics.herokuapp.com/)

## Primary Features

### Overview Cards

Displays the at-large statistics regarding infection rate, case rate, and percentage quarantined/isolated within local and Pingry counties.  All data present is calculated based on a 7 or 14 day moving average.

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
