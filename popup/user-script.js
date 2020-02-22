
  function init()
  {
    L.Control.Button = L.Control.extend({
      options: {
        position: 'bottomright',
      },
      initialize: function (options) {
        this._button = {};
        this.setButton(options);
      },
      onAdd: function (map) {
        this._map = map;
        var container = L.DomUtil.create('div', 'leaflet-control-button');
        this._container = container;
        this._update();
        return this._container;
      },
      onRemove: function (map) {
      },
      setButton: function (options) {
        var button = {
          'text': options.text,                 //string
          'iconUrl': options.iconUrl,           //string
          'onClick': options.onClick,           //callback function
          'hideText': !!options.hideText,         //forced bool
          'maxWidth': options.maxWidth || 70,     //number
          'doToggle': options.toggle,			//bool
          'toggleStatus': false					//bool
        };
        this._button = button;
        this._update();
      },
      getText: function () {
        return this._button.text;
      },
      getIconUrl: function () {
        return this._button.iconUrl;
      },
      destroy: function () {
        this._button = {};
        this._update();
      },
      toggle: function (e) {
        if(typeof e === 'boolean'){
          this._button.toggleStatus = e;
        }
        else{
          this._button.toggleStatus = !this._button.toggleStatus;
        }
        this._update();
      },
      _update: function () {
        if (!this._map) {
          return;
        }
        this._container.innerHTML = '';
        this._makeButton(this._button);
      },
      _makeButton: function (button) {
        var newButton = L.DomUtil.create('div', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus)
          L.DomUtil.addClass(newButton,'leaflet-buttons-control-toggleon');
        var image = L.DomUtil.create('img', 'leaflet-buttons-control-img', newButton);
        image.setAttribute('src',button.iconUrl);
        if(button.text !== ''){
          L.DomUtil.create('br','',newButton);  //there must be a better way
          var span = L.DomUtil.create('span', 'leaflet-buttons-control-text', newButton);
          var text = document.createTextNode(button.text);  //is there an L.DomUtil for this?
          span.appendChild(text);
          if(button.hideText)
            L.DomUtil.addClass(span,'leaflet-buttons-control-text-hide');
        }
        L.DomEvent
            .addListener(newButton, 'click', L.DomEvent.stop)
            .addListener(newButton, 'click', button.onClick,this)
            .addListener(newButton, 'click', this._clicked,this);
        L.DomEvent.disableClickPropagation(newButton);
        return newButton;
      },
      _clicked: function () {  //'this' refers to button
        if(this._button.doToggle){
          if(this._button.toggleStatus) {	//currently true, remove class
            L.DomUtil.removeClass(this._container.childNodes[0],'leaflet-buttons-control-toggleon');
          }
          else{
            L.DomUtil.addClass(this._container.childNodes[0],'leaflet-buttons-control-toggleon');
          }
          this.toggle();
        }
        return;
      }
    });
    var map = L.map('mapid').setView([7, 32], 5);
    function start()
    {
      console.log("Starting");


      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiaXphZ2FuYW1pIiwiYSI6ImNrMzFoaGR2MjA4aGQzbHMydDFldnd4bmQifQ.LLsXS-A7H9SmXUjLQ0vfhg'
      }).addTo(map);

    }
    start();
    return map;
  }

//Test loading
  window.addEventListener("load", function(event) {
      console.log("Toutes les ressources sont chargées !");
      map=init();
    });


  function launch()
  {

  function onFulfilled(bookmarks)
  {
    for(var i=0;i<bookmarks.length;i++)
    {
      let lon=parseFloat(/(?<=-lon:)(\w[0-9][.,][0-9]*)/.exec(bookmarks[i].title));
      let lat=parseFloat(/(?<=-lat:)(\w[0-9][.,][0-9]*)/.exec(bookmarks[i].title));

      if(isNaN(lon)==false && isNaN(lat)==false)
      {
        drawmarker(lon,lat);
      }
    }
  }

  function onRejected(error) {
    console.log(`An error: ${error}`);
  }

  function drawmarker(lon,lat)
  {
    var icon=L.icon(
        {
          iconUrl: 'http://localhost/FirefoxExtension/popup/leaf-green.png',
          iconSize: [38,95],
          iconAnchor: [lon,lat]
        }
    );
    var opt =
      {
          'maxWidth': '400',
          'width': '200',
          'className' : 'popup3',
      };
    var marker= L.marker([bookmarkgeoloc.longitude, bookmarkgeoloc.latitude], {icon: icon});
    map.addLayer(marker);
    marker.on('click',function ()
    {
        browser.tabs.create(
          {url:bookmarkgeoloc.url}
      );
    });


      marker.bindPopup(String(bookmarkgeoloc.url));
    marker.on('mouseover',function ()
    {
      marker.openPopup();

    });
    marker.on('mouseout',function ()
    {
      marker.closePopup();

    });


  }

  let gettingBookmarks = browser.bookmarks.getRecent(100);// add "" to specify id
  gettingBookmarks.then(onFulfilled, onRejected);


  };
  launch();


















  function test()
  {
  function drawmarker(bookmarkgeoloc)
  {
    var icon=L.icon(
        {
          iconUrl: 'http://localhost/FirefoxExtension/popup/leaf-green.png',
          iconSize: [38,95],
          iconAnchor: [bookmarkgeoloc.longitude,bookmarkgeoloc.latitude]
        }
    );
    var opt =
      {
          'maxWidth': '400',
          'width': '200',
          'className' : 'popup3',
      };
    var marker= L.marker([bookmarkgeoloc.longitude, bookmarkgeoloc.latitude], {icon: icon});
    map.addLayer(marker);
    marker.on('click',function ()
    {
        browser.tabs.create(
          {url:bookmarkgeoloc.url}
      );
    });


      marker.bindPopup(String(bookmarkgeoloc.url));
    marker.on('mouseover',function ()
    {
      marker.openPopup();

    });
    marker.on('mouseout',function ()
    {
      marker.closePopup();

    });


  }



  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      var myObj = JSON.parse(this.responseText);
      var i;
      for(i=0;i<myObj.length;i++)
      {
        drawmarker(myObj[i])
      }


    }
  };
    xmlhttp.open("GET", "http://localhost/FirefoxExtension/popup/ajax.php", true);
    xmlhttp.send();
  };
  test();
