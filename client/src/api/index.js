import axios from "axios";

// const corsProxy = "https://cors-anywhere.herokuapp.com/";
// const njStatewideURL = "https://localcoviddata.com/covid19/v1/cases/covidTracking?state=NJ&daysInPast=7";
// const countyURLBase = "https://localcoviddata.com/covid19/v1/cases/newYorkTimes?";

// export const fetchNJStatewideData = (async function() {
//   try {
//     const res = await axios.get(corsProxy+njStatewideURL);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const fetchCountyData = (async function(zipcode) {
//   try {
//     const res = await axios.get(`${corsProxy}${countyURLBase}zipCode=${zipcode}&daysInPast=7`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// })

// URL of the backend server -- used to reach endpoints and access relevant data
// const backendServerUrl = "http://localhost:3000";
// ${backendServerUrl}

/**
 * Fetches the relevant NJ Statewide statistics from database
 */
export const fetchNJStatewideDataDB = async function () {
  try {
    const res = await axios.get(`/statewides`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches the relevant NJ county statistics from database
 * These stats include all 21 counties (and 7 day historical info)
 */
export const fetchCountyDataDB = async function () {
  try {
    const res = await axios.get(`/counties`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches the relevant NJ county totals from the database (including 7 day increase)
 */
export const fetchCountyTotalsDB = async function () {
  try {
    const res = await axios.get(`/countyTotals`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// /**
//  * Fetches the relevant NJ county history (7 day rolling period)
//  * NOTE: DEPRECATED - /countyHistories is no longer a valid route
//  */
// export const fetchCountyHistoryDB = (async function() {
//   try {
//     const res = await axios.get(`/countyHistories`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// })

/**
 * Fetches the relevant internal Pingry data (3 day rolling period)
 */
export const fetchInternalPingryDB = async function () {
  try {
    const res = await axios.get(`/pingryInternals`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches the relevant internal Pingry data (3 day rolling period)
 */
export const fetchCountyProjectionsDB = async function () {
  try {
    const res = await axios.get(`/countyProjections`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches the relevant internal Pingry data (3 day rolling period)
 */
export const fetchDetailedStats = async function () {
  try {
    const res = await axios.get(`/detailedstats`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches Pingry's Testing Data
 */
export const fetchTestings = async function () {
  try {
    const res = await axios.get(`/testing`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
