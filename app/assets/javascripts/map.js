var map;

function init(){
  map = new L.Map('cartodb-map', {
    center: [0,0],
    zoom: 2
  })
  map.game = new Game();

  L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
    attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
  }).addTo(map);

  var layerUrl = 'https://tlantz.cartodb.com/api/v2/viz/9bd62f5e-3a38-11e6-ac85-0e98b61680bf/viz.json';

  console.log(newQuery(map.game));
  var subLayerOptions = {
    sql: newQuery(map.game)
  }

  cartodb.createLayer(map, layerUrl)
    .addTo(map)

    .on('done', function(layer) {

      var sublayer = layer.getSubLayer(0);

      sublayer.set(subLayerOptions);
      sublayer.infowindow.set({
        template: $('#infowindow_template').html(),
        sanitizeTemplate: false
      });

    sublayer.on('featureClick', function(e, latlng, pos, data) {
      var id_query = "SELECT nasaid FROM rows WHERE (cartodb_id = " + data["cartodb_id"] + ")";
      var nasaidGetUrl = `https://tlantz.cartodb.com/api/v2/sql?q=${id_query}`;

      $.getJSON(nasaidGetUrl, function(data) {
        var nasaId = data["rows"][0]["nasaid"];
        var currentMeteorite = findCurrentMeteorite(nasaId, map.game.meteorites);
        renderInfo(currentMeteorite);
        $('#win-button').on('click', function() {
          map.game.defeat(currentMeteorite);
          renderInfo(currentMeteorite);
          console.log(map.game.meteorites);
          sublayer.setSQL(newQuery(map.game));
        });
      });
    });

    }).on('error', function() {
      console.log("some error occurred");
  });

}

var findCurrentMeteorite = function(nasaId, meteorites) {
  for (var i = 0; i < meteorites.length; i++) {
    if (meteorites[i].nasaId == nasaId) {
      return meteorites[i];
    }
  }
}

var renderInfo = function(meteorite) {
  $("#name").text(meteorite.name);
  $("#story").text(meteorite.tellStory());
}

var newQuery = function(game) {
  var yearFrom = "'0860-12-24T14:26:40-06:00'"
  var lastMeteorite = map.game.meteorites[map.game.meteorites.length -1];
  var yearTo = `'${lastMeteorite.year}'`;
  return "SELECT * FROM rows WHERE (year >= (" + yearFrom + ") AND year <= (" + yearTo + "))"
}
