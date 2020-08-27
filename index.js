// Full documentation available at https://calendarific.com/api-documentation

// Set parameters here
const COUNTRY = 'GB'; // see list of supported countries here: https://calendarific.com/supported-countries
const YEAR = 2021;
const FILENAME = 'raw2021';
const API_KEY = process.env.CALENDARIFIC; // set API key as global variable

// External dependencies
const Calendarific = require('calendarific');
const fs = require('fs');

// Initialize with an API key
const apiCall = new Calendarific(API_KEY);

const parameters = {
  country: COUNTRY,
  year: YEAR,
};

apiCall.holidays(parameters, function(data) {
  const string = JSON.stringify(data);
  const responseCode = data.meta.code;
  fs.writeFile(`./out/${FILENAME}.json`, string, (err) => {
    if (err) console.error('Something went wrong with fs.writeFile:', err);
    else if (responseCode !== 200) console.error('The API returned an error:', data.meta);
    else console.log(`Success. Data written to ${FILENAME}.json in the 'out' directory`);
  });
});
