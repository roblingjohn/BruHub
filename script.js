$(document).ready(function () {

  $("#search-btn").on("click", searchCity);
  $("#button2").on("click", renderJoke);
  $("#button1").on("click", renderMeme);

  function showResultsBox() {
    $("#search-results").attr("class", "container-1 row");
  }

  function hideWelcome() {
    $("#welcome").attr("class", "hide");
  }

  function hideResults() {
    $("#search-results").attr("class", "hide");
  }

  function searchCity(event) {
    event.preventDefault();
    showResultsBox();
    hideWelcome();
    $("#joke").empty();
    var cityInput = $("#search-text").val();
    cityInput = cityInput.split(" ").join("_");
    runOpenBrewAPI(cityInput);
  }

  function getRandomIndex(arr){



    return Math.floor(Math.random() * arr.length);
  }

  function runOpenBrewAPI(city) {
    var OpenBrewAPIURL =
      "https://api.openbrewerydb.org/breweries?by_city=" + city;
    $.ajax({
      url: OpenBrewAPIURL,
      method: "GET",
    }).then(function (response) {
      $("#search-results").empty();
      var searchResults = $("#search-results");
      var htmlStr = "";
      var randNum = getRandomIndex(response)
      var breweryList = response[randNum].name;
      var breweryWebsites = response[randNum].website_url.replace(
        "http:",
        "https:"
      );
      console.log(breweryWebsites);
      var breweryStreetAddress = response[randNum].street;
      var breweryState = response[randNum].state;
      breweryZip = response[randNum].postal_code;
      breweryPhone = response[randNum].phone;
      var website = breweryWebsites
        ? `<a href="${breweryWebsites}" target="_blank" class="card-link">Go to Their Website</a>`
        : `<p> Sorry Couldn't find their website.</p>`;
      htmlStr += `
          <div class="card col" style="width: 18rem;">
          <div class="card-body ">
          <h5 class="card-title">${breweryList}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${breweryStreetAddress} <br>
          ${breweryState}, ${breweryZip} <br>
          Phone: ${breweryPhone}
          </h6>
          ${website}
          <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" src="${breweryWebsites}" allowfullscreen></iframe>
        </div>
         </div>
        </div>`;
      searchResults.html(htmlStr);
    });
  }

  // RENDER JOKE FUNCTION
  function renderJoke() {
    $("#search-results").empty();
    hideResults();
    hideWelcome();
    $.ajax({
      url: "https://official-joke-api.appspot.com/random_joke",
      method: "get",
    }).then(function (response) {
      $("#joke").empty();
      
      // var jokeResponse = document.createElement("div");
      var jokeResponse = $("<div>");
      jokeResponse.html(
        response.setup + "<br><br><br><br>" + response.punchline
      );
      jokeResponse.attr("color", "white");
      $("#joke").append(jokeResponse);
    });
  }

  //  RENDER MEME FUNCTION
  function renderMeme() {
    $("#search-results").empty();
    hideResults();
    hideWelcome();
    $.ajax({
      url: "https://meme-api.herokuapp.com/gimme",
      method: "get",
    }).then(function (response) {
      $("#joke").empty();

      var memeResponse = $("<img>");
      memeResponse.attr("src", response.url);
      memeResponse.attr("color", "white");
      memeResponse.attr("class", "meme-image");
      $("#joke").append(memeResponse);
    });
  }
});


