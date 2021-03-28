import axios from "axios";

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

/**
 * Fetches Pingry's Updated Testing Data
 */
export const fetchUpdatedTestings = async function () {
  try {
    const res = await axios.get(`/updatedTesting`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches Pingry's Statuses
 */
export const fetchStatuses = async function () {
  try {
    const res = await axios.get(`/statuses`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
