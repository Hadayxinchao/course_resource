const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const apiKey = 'CVVZX7TM2LCS8EW3UM2GMRGCR';
const contentType = 'json';

async function getWeatherData(location) {
  try {
    const response = await fetch(`${baseUrl}${location}?key=${apiKey}&contentType=${contentType}`);
    const data = await response.json();
    return data;
  } catch {
    return { errorCode: 500, message: "An error occurred while fetching weather data" };
  }
}

export async function renderWeatherData(location) {
  const data = await getWeatherData(location);

  if (data.errorCode) {
    return data;
  }

  const days = data.days;

  return days.map(day => {
    return {
      date: day.datetime,
      conditions: day.conditions,
      temp: day.temp,
      precip: day.precip,
      humidity: day.humidity,
      wind: day.windspeed,
      icon: day.icon
    }
  });
}
