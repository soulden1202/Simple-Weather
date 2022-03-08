let divmain = document.getElementById("content");

const clicked = () => {
  let str = document.getElementById("city_state");

  let text = str.value;

  text = text.replace(/\s/g, "");

  let url =
    "http://open.mapquestapi.com/geocoding/v1/address?key=vJa0aCXvvm00EJSiA6pnUokPu3vvkMeF&location=" +
    text;
  getAPI(url);
};

const getAPI = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();

    let lat = data.results[0].locations[0].displayLatLng.lat;
    let lng = data.results[0].locations[0].displayLatLng.lng;
    let city = data.results[0].locations[0].adminArea5;

    getWeater(lat, lng);
  } catch (e) {
    alert("Wrong input!");
  }
};

const getWeater = async (lat, lng) => {
  let url = "https://api.weather.gov/points/" + lat + "," + lng;
  try {
    let res = await fetch(url);
    let data = await res.json();

    getPerdiction(data.properties.forecast);
  } catch (e) {
    alert("Please try using city.");
  }
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const getPerdiction = async (url) => {
  try {
    let display = document.getElementById("display");

    let res = await fetch(url);
    let data = await res.json();

    let forcast = data.properties.periods;

    if (display.hasChildNodes()) {
      removeAllChildNodes(display);
    }
    forcast.forEach((element) => {
      let name = element.name;
      let isDaylight = element.isDaytime;
      let tempeture = element.temperature;
      let perdic = element.shortForecast;

      let container = document.createElement("div");
      container.classList.add("col");
      container.classList.add("m4");
      container.setAttribute("name", "check");

      let card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("large");

      let imgcontainer = document.createElement("div");
      imgcontainer.classList.add("card-image");
      imgcontainer.classList.add("center-align");
      imgcontainer.classList.add("resize-img");

      let img = document.createElement("img");

      let icon = document.createElement("i");
      icon.classList.add("card-title");
      icon.classList.add("material-icons");
      let lowercase = perdic.toLowerCase();

      if (lowercase.includes("sunny")) {
        img.src = "./pictures/sunny.jpg";
        icon.innerHTML = "sunny";
      } else if (lowercase.includes("clear") && isDaylight) {
        img.src = "./pictures/clear_sky.jpg";
        icon.innerHTML = "sunny";
      } else if (lowercase.includes("clear") && !isDaylight) {
        img.src = "./pictures/moon.jpg";
        icon.innerHTML = "nightlight";
      } else if (lowercase.includes("rain")) {
        img.src = "./pictures/rain.jpg";
        icon.innerHTML = "water_drop";
      } else if (lowercase.includes("snow")) {
        img.src = "./pictures/snow.jpg";
        icon.innerHTML = "ac_unit";
      } else if (lowercase.includes("cloudy") && isDaylight) {
        img.src = "./pictures/day_cloud.jpg";
        icon.innerHTML = "wb_cloudy";
      } else if (lowercase.includes("cloudy") && !isDaylight) {
        img.src = "./pictures/night_cloudy.jpg";
        icon.innerHTML = "wb_cloudy";
      }

      let content = document.createElement("div");
      content.classList.add("card-content");
      content.classList.add("center-align");
      let temptext = document.createElement("h5");
      temptext.innerHTML = tempeture + "°";

      let datetext = document.createElement("h6");
      datetext.innerHTML = name;

      let predictext = document.createElement("h6");
      predictext.innerHTML = perdic;

      display.append(container);
      container.appendChild(card);

      card.append(imgcontainer);
      imgcontainer.appendChild(img);

      card.append(content);
      content.append(temptext);
      content.append(icon);
      content.append(datetext);
      content.append(predictext);
    });
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".carousel");
    var instance = M.Carousel.init(elems, {
      fullWidth: true,
    });
  });
};
