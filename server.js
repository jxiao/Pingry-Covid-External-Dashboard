const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const axios = require("axios");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

/**
 * Setting up routers/routes
 *
 * Description of endpoints:
 *    Statewides: NJ State statistics (total cases, new cases)
 *    Counties: 21 NJ counties and 14 day historical data
 *    CountyTotals: abridged version of Counties - contains current total and 7 day increase
 *    PingryInternals: Statistics of cases within Pingry community - rolling 3 day period
 */
const statewidesRouter = require("./routes/statewides");
app.use("/statewides", statewidesRouter);

const countiesRouter = require("./routes/counties");
app.use("/counties", countiesRouter);

const countyTotalsRouter = require("./routes/countyTotals");
app.use("/countyTotals", countyTotalsRouter);

const pingryInternalsRouter = require("./routes/pingryInternals");
app.use("/pingryInternals", pingryInternalsRouter);

const countyProjectionsRouter = require("./routes/countyProjections");
app.use("/countyProjections", countyProjectionsRouter);

const summarystatsRouter = require("./routes/summarystats");
app.use("/summarystats", summarystatsRouter);

/**
 * Production mode ONLY
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Server is running on port: ${port}`);
});

/**
 * Description of backend routes and endpoints
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Each zipcode correlates to 1 county (all 21 NJ counties in alphabetic order)
const zipcodesNJ = [
  "08201",
  "07661",
  "08016",
  "08103",
  "08204",
  "08332",
  "07039",
  "08097",
  "07310",
  "08809",
  "08638",
  "08846",
  "07703",
  "07950",
  "08722",
  "07011",
  "08079",
  "08873",
  "07875",
  "07208",
  "07820",
];

const population = [
  263670,
  932202,
  445349,
  506471,
  92039,
  149527,
  798975,
  291636,
  672391,
  124371,
  367430,
  825062,
  618795,
  491845,
  607186,
  501826,
  62385,
  328934,
  140488,
  556341,
  105267,
];
const localCountyPopulation = 6351603;
const localCountiesIndices = [1, 10, 11, 13, 15, 17, 18, 19, 20, 3, 6, 8, 9];

const refetchArray = [
  repopulateStatewideCollection,
  repopulateCountyCollection,
  repopulatePingryCollection,
  repopulateCountyProjectionsCollection,
  repopulateSummarystats,
];
/**
 * Parent function to refetch the data at scheduled intervals
 */
async function refetchAll() {
  for (const fn of refetchArray) {
    await fn();
  }
  return `REFETCHING COLLECTIONS... (${new Date()})`;
}

/**
 * Repopulates the NJ Statewide data ONLY
 * Deletes old data upon insertion of new data
 */
async function repopulateStatewideCollection() {
  const Statewide = mongoose.model("Statewide");
  await axios
    .get(
      "https://localcoviddata.com/covid19/v1/cases/covidTracking?state=NJ&daysInPast=7"
    )
    .then((response) => {
      Statewide.replaceOne(
        { stateCode: `NJ` },
        response.data,
        { upsert: true },
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Finished repopulating statewide collection.");
          }
        }
      );
    })
    .catch((error) => console.log("error"));
}

/**
 * Repopulates all other substantial data, including current county data, historical data, and county totals
 */
async function repopulateCountyCollection() {
  const County = mongoose.model("County");
  const CountyTotal = mongoose.model("CountyTotal");
  var fips = 1;
  for (var i = 0; i < zipcodesNJ.length; i++) {
    await axios
      .get(
        `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipcodesNJ[i]}&daysInPast=7`
      )
      .then((response) => {
        const index = i;

        // Insert newest (daily) data into county DB
        County.updateOne(
          { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
          {
            $push: {
              [`data.${index}.counties.0.historicData`]: {
                $each: [response.data.counties[0].historicData[0]],
                $position: 0,
              },
            },
          },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Added newest data for ${zipcodesNJ[i]}`);
            }
          }
        );

        // Delete oldest (daily) data from county DB
        County.updateOne(
          { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
          { $pop: { [`data.${index}.counties.0.historicData`]: 1 } },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Deleted oldest data for ${zipcodesNJ[i]}`);
            }
          }
        );

        const name = response.data.counties[0].countyName;
        CountyTotal.updateOne(
          { id: 34000 + fips },
          {
            totalCases: response.data.counties[0].historicData[0].positiveCt,
            newCases:
              response.data.counties[0].historicData[0].positiveCt -
              response.data.counties[0].historicData[5].positiveCt,
          },
          { upsert: true },
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Finished updating county total for ${name}`);
            }
          }
        );

        fips += 2;
      })
      .catch((error) => console.log(error));
  }

  await County.findById(
    { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
    (err, resp) => {
      var cumulativeRate = 0;
      for (var i = 0; i < localCountiesIndices.length; i++) {
        // daily increase
        var individualRate =
          resp.data[i].counties[0].historicData[0].positiveCt -
          resp.data[i].counties[0].historicData[1].positiveCt;
        cumulativeRate += individualRate;
      }
      // rate per 100,000
      cumulativeRate = (cumulativeRate / localCountyPopulation) * 100000;

      County.updateOne(
        { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
        {
          $push: {
            averages: { $each: [{ caseRate: cumulativeRate }], $position: 0 },
          },
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Added newest data for County Averages`);
          }
        }
      );

      County.updateOne(
        { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
        { $pop: { averages: 1 } },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Deleted oldest data for County Averages`);
          }
        }
      );

      County.updateOne(
        { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
        { $set: { pingryCountiesCaseRate: cumulativeRate } },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Updated 7 Day Pingry Counties Case Rate`);
          }
        }
      );
    }
  );
  console.log("Finished repopulating county collections.");
}

/**
 * Repopulates Pingry's internal data ONLY
 * Stores up to 3 days (72 hours) of historical data
 */
async function repopulatePingryCollection() {
  const PingryInternal = mongoose.model("PingryInternal");
  await axios
    .get("https://tracking-db.pingryanywhere.org/api/v1/summarystats")
    .then((response) => {
      // Insert newest (daily) data into Pingry internal DB
      PingryInternal.updateOne(
        { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
        { $push: { data: { $each: [response.data], $position: 0 } } },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Added newest data for PingryInternal`);
          }
        }
      );
      // Delete oldest (daily) data from Pingry internal DB
      PingryInternal.updateOne(
        { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
        { $pop: { data: 1 } },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Deleted oldest data for PingryInternal`);
          }
        }
      );
      var weightedAveragePercentCampusSH = 0;
      var weightedAveragePercentCampusBR = 0;
      PingryInternal.findById(
        { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
        (err, resp) => {
          resp.data.forEach((date) => {
            weightedAveragePercentCampusSH +=
              date.percentShortHillsActiveIsolationOrQuarantine;
            weightedAveragePercentCampusBR +=
              date.percentBaskingRidgeActiveIsolationOrQuarantine;
          });
          weightedAveragePercentCampusSH /= 7;
          weightedAveragePercentCampusBR /= 7;
          const newDate = {
            shortHillsIsolationQuarantine: weightedAveragePercentCampusSH,
            baskingRidgeIsolationQuarantine: weightedAveragePercentCampusBR,
          };
          PingryInternal.updateOne(
            { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
            { $push: { averages: { $each: [newDate], $position: 0 } } },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`Added newest data for PingryInternal Averages`);
              }
            }
          );
          PingryInternal.updateOne(
            { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
            { $pop: { averages: 1 } },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`Deleted oldest data for PingryInternal Averages`);
              }
            }
          );
          PingryInternal.updateOne(
            { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
            {
              $set: {
                shortHills7DayIsolationQuarantine: weightedAveragePercentCampusSH,
                baskingRidge7DayIsolationQuarantine: weightedAveragePercentCampusBR,
              },
            },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`Updated 7 Day Isolation/Quarantine Percentage`);
              }
            }
          );
        }
      );
    })
    .catch((error) => console.log("error"));
}

/**
 * Repopulates the infection rates
 * Stores up to 14 day history
 */
async function repopulateCountyProjectionsCollection() {
  const CountyProjection = mongoose.model("CountyProjection");
  var fips = 34001;
  // for (var i = 0; i < zipcodesNJ.length; i++) {
  //   await axios
  //     .get(
  //       `https://data.covidactnow.org/latest/us/counties/${fips}.OBSERVED_INTERVENTION.json`
  //     )
  //     .then((response) => {
  //       const index = i;
  //       // Insert newest (daily) data into CountyProjection internal DB
  //       CountyProjection.updateOne(
  //         { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
  //         {
  //           $push: {
  //             [`data.${index}.infectionRates`]: {
  //               $each: [{ Rt: response.data.metrics.infectionRate }],
  //               $position: 0,
  //             },
  //           },
  //         },
  //         (err) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log(
  //               `Added newest data for CountyProjection (Fips Code: ${fips})`
  //             );
  //           }
  //         }
  //       );

  //       // Delete oldest (daily) data from CountyProjection internal DB
  //       CountyProjection.updateOne(
  //         { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
  //         { $pop: { [`data.${index}.infectionRates`]: 1 } },
  //         (err) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log(
  //               `Deleted oldest data for CountyProjection (Fips Code: ${fips})`
  //             );
  //           }
  //         }
  //       );

  //       fips += 2;
  //     })
  //     .catch((error) => console.log(error));
  // }

  await CountyProjection.findById(
    { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
    (err, resp) => {
      if (err) {
        console.log("Error.");
      } else {
        var cumulativeRate = 0;
        for (var i = 0; i < localCountiesIndices.length; i++) {
          var individualRate = resp.data[i].infectionRates[0].Rt;
          individualRate *= population[i];
          cumulativeRate += individualRate;
        }
        cumulativeRate /= localCountyPopulation;

        CountyProjection.updateOne(
          { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
          {
            $push: {
              averages: { $each: [{ Rt: cumulativeRate }], $position: 0 },
            },
          },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Added newest data for CountyProjection Averages`);
            }
          }
        );

        CountyProjection.updateOne(
          { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
          { $pop: { averages: 1 } },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Deleted oldest data for CountyProjection Averages`);
            }
          }
        );

        CountyProjection.updateOne(
          { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
          { $set: { pingryCountiesInfectionRate: cumulativeRate } },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Updated 14 Day Pingry Counties Infection Rate`);
            }
          }
        );
      }
    }
  );
}

/**
 * Repopulates the summary stats for Drew's internal dashboard/tracking system
 */
async function repopulateSummarystats() {
  const County = mongoose.model("County");
  const CountyProjection = mongoose.model("CountyProjection");
  const PingryInternal = mongoose.model("PingryInternal");
  const Summarystat = mongoose.model("Summarystat");
  County.findById(
    { _id: mongoose.Types.ObjectId(`5f591319ac41821082382d4b`) },
    (err, resp) => {
      const pingryCountiesCaseRate = resp.pingryCountiesCaseRate;
      CountyProjection.findById(
        { _id: mongoose.Types.ObjectId(`5f5022c41cf2675eca9c42d4`) },
        (err, resp) => {
          const pingryCountiesInfectionRate = resp.pingryCountiesInfectionRate;
          PingryInternal.findById(
            { _id: mongoose.Types.ObjectId(`5f4ec6920ece60f64d8cd6f6`) },
            (err, resp) => {
              const shortHills7DayIsolationQuarantine =
                resp.shortHills7DayIsolationQuarantine;
              const baskingRidge7DayIsolationQuarantine =
                resp.baskingRidge7DayIsolationQuarantine;
              const newData = {
                pingryCountiesCaseRate: pingryCountiesCaseRate,
                pingryCountiesInfectionRate: pingryCountiesInfectionRate,
                shortHills7DayIsolationQuarantine: shortHills7DayIsolationQuarantine,
                baskingRidge7DayIsolationQuarantine: baskingRidge7DayIsolationQuarantine,
              };

              Summarystat.replaceOne(
                { _id: mongoose.Types.ObjectId(`5f51c1f3ac1e6fe85e27b3da`) },
                newData,
                { upsert: true },
                function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(
                      "Finished repopulating summarystats collection."
                    );
                  }
                }
              );
            }
          );
        }
      );
    }
  );
}

module.exports = { refetchAll };

require("make-runnable");
