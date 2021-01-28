import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { NgZone } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { StoreModel } from 'src/app/utils/models/Store.model';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { ModalPage } from '../components/modal-page/modal-page.page';
interface IgMarker {
  storeMarker: any;
  lat: any;
  long: any;
}
interface IStoreFilter {
  city: any;
  brand: any;
}
declare var google;
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})

export class StorePage extends Base implements OnInit {
  @ViewChild('map', { static: true }) mapContainer: ElementRef;
  map: any;

  selectedTab = "mapView";
  storeList: StoreModel[] = [];

  gMarker: IgMarker[] = [];
  myLatitude;
  myLongitude;

  directionsService;
  directionsDisplay;

  showMap: boolean = true;

  storeFilter: IStoreFilter = {} as IStoreFilter;
  searchTxt: any = "";

  cityList: any = [];
  brandsList: any = [];

  constructor(injector: Injector,
    private launchNavigator: LaunchNavigator, private _ngZone: NgZone,
    private geolocation: Geolocation) {
    super(injector);

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.storeFilter.brand = "";
    this.storeFilter.city = "";
  }

  ngOnInit() {
    this.getStores();
    this.getBrands();
    this.getCities()
  }

  displayGoogleMap() {
    let mapSetting = environment.mapSetting;
    var styledMapType = new google.maps.StyledMapType(mapSetting, { name: 'Styled Map' });
    this.geolocation.getCurrentPosition().then(pos => {
      this.myLatitude = '' + pos.coords.latitude;
      this.myLongitude = '' + pos.coords.longitude;
      //const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      const latLng = new google.maps.LatLng("25.0641671", "55.1368409");
      const mapOptions = {
        center: latLng,
        disableDefaultUI: true,
        zoom: 12,
        zoomControl: true,
        overviewMapControl: true,
        mapTypeId: google.maps.MapTypeId.TRANSIT
      };


      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

      this.map.mapTypes.set('styled_map', styledMapType);
      this.map.setMapTypeId('styled_map');


      setTimeout(() => {
        this.addUserLocationToMap(this.myLatitude, this.myLongitude);
        //this.getDistance(this.storeList);
        this.getMarkers(this.storeList);
      });
    });
  }
  getStores() {
    this.apiService.getStoresList(this.storeFilter.city, this.storeFilter.brand).subscribe(res => {
      this.storeList = res;
      //this.getDistance(this.storeList);
      this.displayGoogleMap();
      if (this.storeFilter.city == "" && this.storeFilter.brand == "") {
        this.storageService.setStores(res);
        this.storeList = res;
      }
    })
  }

  addUserLocationToMap(latitude, longitude) {
    //const position = new google.maps.LatLng(latitude, longitude);
    const position = new google.maps.LatLng("25.0641671", "55.1368409");
    const storeMarker = new google.maps.Marker({
      position, icon: {
        url: "../../assets/images/user-loc.png",
        scaledSize: new google.maps.Size(70, 70)
      }
    });

    storeMarker.setMap(this.map);
  }

  getDistance(storeList: StoreModel[]) {

    for (let i = 0; i < storeList.length; i++) {
      let store: StoreModel = storeList[i];
      let origin = new google.maps.LatLng(this.myLatitude, this.myLongitude);
      let destination = new google.maps.LatLng(store.Lattitude, store.Longitude);
      var that = this;

      this.directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, (res, status) => {
        if (res.routes.length) {
          var point = res.routes[0].legs[0];
          store.Distance = point.distance.text
          store.Time = point.duration.text

          var txt = store.Distance;
          var numb = Number(txt.replace(/[^0-9\.]+/g, ""));

          // if (numb > 25) {
          //   store.isVisible = false;
          // } else {
          //   store.isVisible = true;
          // }
        }
      });
    }
  }

  launchMap(descLatitude, descLongitud) {
    var source = [this.myLatitude, this.myLongitude];
    var destination = [descLatitude, descLongitud];
    let options: LaunchNavigatorOptions = {
      start: source,
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    this.launchNavigator.navigate(destination, options).then(
      success => { console.log('Launched navigator') },
      error => { console.log('Error launching navigator', error) }
    );
  }

  getMarkers(storeList: StoreModel[]) {
    for (let _i = 0; _i < storeList.length; _i++)
      this.addMarkersAllToMap(storeList[_i]);

  }

  clearAllMarkers() {
    for (let i = 0; i < this.gMarker.length; i++)
      this.gMarker[i].storeMarker.setVisible(false)

    // for (let _i = 0; _i < this.storeList.length; _i++) {
    //   this.storeList[_i].isVisible = false;
    // }
  }

  addMarkersAllToMap(store: StoreModel) {
    let marker: IgMarker = {} as IgMarker;
    const position = new google.maps.LatLng(store.Lattitude, store.Longitude);
    const storeMarker = new google.maps.Marker({
      position, icon: {
        url: "../../assets/images/store-loc.png",
        scaledSize: new google.maps.Size(30, 30)
      }
    });
    var infowindow = new google.maps.InfoWindow();
    storeMarker.setMap(this.map);

    google.maps.event.addListener(storeMarker, 'click', (function (marker, i) {
      return function () {
        var htmlCOntent = `<p style='font-size: 16px;color: #337ab7'
        onclick="window.angularComponentRef.zone.run(() =>
        {
          window.angularComponentRef.component.launchMap(${store.Lattitude, store.Longitude});
        })">${store.StoreName}</p>
        <p>${store.StreetAddress1}  </p>
        <p>${store.StreetAddress2}  </p>
        <p>${store.WorkTimings}  </p>
        `;

        if (this.prevInfoWindow) {
          this.prevInfoWindow.close();
        }
        infowindow.setContent(htmlCOntent);
        this.prevInfoWindow = infowindow;
        infowindow.open(this.map, storeMarker);
      }
    })(storeMarker, 1));

    marker.storeMarker = storeMarker;
    marker.lat = store.Lattitude;
    marker.long = store.Longitude;
    this.gMarker.push(marker);
  }
  viewOnMap(store: StoreModel) {
    this.launchMap(store.Lattitude, store.Longitude);
  }

  filter() {
    this.getTrans("storeFilterTitle").then(title => {
      this.openModal(ModalPage, title, this.storeFilter, "storeFilter", {
        brands: this.brandsList,
        city: this.cityList
      }).then((res: any) => {
        this.storeFilter.brand = res.brand;
        this.storeFilter.city = res.city;
        this.getStores()
      })
    })
  }

  getBrands() {
    this.apiService.getBrands().subscribe(res => {
      this.brandsList = res;
    })
  }
  getCities() {
    this.apiService.getEmirates().subscribe((res: any) => {
      this.cityList = res;
    })
  }
}
