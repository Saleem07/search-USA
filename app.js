const cities = [];
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function doMatch(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function showMatch() {
  const matched = doMatch(this.value, cities);
  console.log(matched);
  const html = matched
    .map((place) => {
      return `<li class="suggestions"> 
                    <span>
                     <i class="fa fa-bar-chart"> ${place.rank}</i>  
                     <i class="fas fa-user-friends">${place.population}</i> <br>
                    </span> 
                 <span> ${place.state}, ${place.city} </span>
              </li>`;
    })
    .join();

  result.innerHTML = html;
}

//selecting input-box and the parent list
const inputSearch = document.querySelector(".search");
const result = document.querySelector(".suggestions");

//adding event handlers

inputSearch.addEventListener("keyup", showMatch);
inputSearch.addEventListener("change", showMatch);
