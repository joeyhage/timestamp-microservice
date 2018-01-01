'use strict';

const express = require('express'),
      app = express();
  
app.route('/*').get((req, res) => {
  const dateString = unescape(req.path.substring(1));
  const unix = Number(dateString);
  const response = {unix: null, natural: null};
  
  try {
    const date = new Date(unix || dateString);
    const unixMilliseconds = Number(date) / 1000;
    const humanReadable = toHumanReadableFormat(date);
    if (!Number.isNaN(date) && !Number.isNaN(unixMilliseconds) && humanReadable) {
      response.unix = unixMilliseconds;
      response.natural = humanReadable;
      return res.status(200).json(response);
    }
  } catch (err) {
    console.error(err, 'Error parsing timestamp from ' + unix || dateString);
    return res.status(500).json(response);
  }
  return res.status(400).json(response);
});

const toHumanReadableFormat = date => {
  const month = toHumanReadableMonth(date.getMonth());
  return month ? `${toHumanReadableMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}` : null;
};

const toHumanReadableMonth = month => {
  switch (month) {
    case 0: return 'January';
    case 1: return 'February';
    case 2: return 'March';
    case 3: return 'April';
    case 4: return 'May';
    case 5: return 'June';
    case 6: return 'July';
    case 7: return 'August';
    case 8: return 'September';
    case 9: return 'October';
    case 10: return 'November';
    case 11: return 'December';
    default: return null;
  }
};

app.listen(process.env.PORT || 3000, () => {});

