import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform , NavParams } from 'ionic-angular';

import { Geolocation, Keyboard } from 'ionic-native';


import { Weather } from '../../providers/weather';
import { ForecastDetailPage } from './forecast-detail/forecast-detail';

/*
  Generated class for the Weather page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
  providers: [[Weather]]  // need [[]]
})
export class WeatherPage {

  searchInput: string = '';

  degreeStr: string = ' degrees (C)';
  //an empty object (for now) to store our location data passed to the API
  currentLoc: any = {};
  //current weather items array
  c_items: Array<any> = [];

  currentMode: string = 'weather';
  displayMode: string = this.currentMode;
  f_items: Array<any> = [];
  days: Array<string> = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'firday', 'saturday'];

  constructor(public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public platform: Platform,
    public weather: Weather) {}

  ionViewDidLoad() {
    //Once the main view loads
    //and after the platform is ready...
    this.platform.ready().then(() => {
      //Setup a resume event listener
      document.addEventListener('resume', () => {
        this.displayMode = this.currentMode;
        //Get the local weather when the app resumes
        this.getLocalWeather();
      });
      //Populate the form with the current location data
      this.getLocalWeather();
    });
  }

  setZipCode() {
    Keyboard.close();
    this.currentLoc = { 'zip': this.searchInput };
    this.searchInput = '';
    this.showWeather();
  }

  refreshPage() {
    if (this.displayMode === this.currentMode) {
      this.showWeather();
    } else {
      this.showForecast();
    }

  }

  getLocalWeather() {
    let locOptions = { 'maximumAge': 3000, 'timeout': 5000, 'enableHighAccuracy': true };
    Geolocation.getCurrentPosition(locOptions).then(pos => {
      //Store our location object for later use
      this.currentLoc = { 'lat': pos.coords.latitude, 'long': pos.coords.longitude };
      //and ask for the weather for the current location
      this.showWeather();
    }).catch(e => {
      console.error('Unable to determine current location');
      if (e) {
        console.log('%s: %s', e.code, e.message);
        console.dir(e);
      }
    })
  }

  showWeather() {
    //clear out the previous array contents
    this.c_items = [];
    //Create the loading indicator
    let loader = this.loadingCtrl.create({
      content: "Retrieving current conditions..."
    });
    //Show the loading indicator
    loader.present();
    this.weather.getCurrent(this.currentLoc).then(
      data => {
        //Hide the loading indicator
        loader.dismiss();
        //Now, populate the array with data from the weather service
        if (data) {
          //We have data, so lets do something with it
          this.c_items = this.formatWeatherData(data);
        } else {
          //This really should never happen
          console.error('Error retrieving weather data: Data object is empty');
        }
      },
      error => {
        //Hide the loading indicator
        loader.dismiss();
        console.error('Error retrieving weather data');
        console.dir(error);
        this.showAlert(error);
      }
    );
  }

  showForecast() {
    //clear out the previous array contents
    this.f_items = [];
    //Create the loading indicator
    let loader = this.loadingCtrl.create({
      content: "Retrieving forecast..."
    });
    //Show the loading indicator
    loader.present();
    this.weather.getForecast(this.currentLoc).then(
      data => {
        //Hide the loading indicator
        loader.dismiss();
        //Now, populate the array with data from the weather service
        //Do we have some data?
        if (data) {
          //Then lets build the results array we need
          //Process each forecast period in the array
          for (let period of data.list) {
            //Create a 'record' consisting of a time period's results
            let weatherValues: any = this.formatWeatherData(period);
            //Append this, along with the time period information, into the forecast
            //items array.
            //Get the forecast date as a date object
            let d = new Date(period.dt_txt);
            //Determe the day of the week
            let day = this.days[d.getDay()];
            //And the time
            let tm = d.toLocaleTimeString();
            //Create a new object in the results array for this period
            this.f_items.push({ 'period': day + ' at ' + tm, 'values': weatherValues });
          }
        } else {
          //This really should never happen
          console.error('Error displaying weather data: Data object is empty');
        }
      },
      error => {
        //Hide the loading indicator
        loader.dismiss();
        console.error("Error retrieving weather data");
        console.dir(error);
        this.showAlert(error);
      }
    );
  }

  private formatWeatherData(data): any {
    //create a blank array to hold our results
    let tmpArray = [];
    //Add the weather data values to the array
    if (data.name) {
      //Location name will only be available for current conditions
      tmpArray.push({ 'name': 'Location', 'value': data.name });
    }
    tmpArray.push({ 'name': 'Temperature', 'value': data.main.temp + this.degreeStr });
    tmpArray.push({ 'name': 'Low', 'value': data.main.temp_min + this.degreeStr });
    tmpArray.push({ 'name': 'High', 'value': data.main.temp_max + this.degreeStr });
    tmpArray.push({ 'name': 'Humidity', 'value': data.main.humidity + '%' });
    tmpArray.push({ 'name': 'Pressure', 'value': data.main.pressure + ' hPa' });
    tmpArray.push({ 'name': 'Wind', 'value': data.wind.speed + ' mph' });
    //Do we have visibility data?
    if (data.visibility) {
      tmpArray.push({ 'name': 'Visibility', 'value': data.visibility + ' meters' });
    }
    //do we have sunrise/sunset data?
    if (data.sys.sunrise) {
      var sunriseDate = new Date(data.sys.sunrise * 1000);
      tmpArray.push({ 'name': 'Sunrise', 'value': sunriseDate.toLocaleTimeString() });
    }
    if (data.sys.sunset) {
      var sunsetDate = new Date(data.sys.sunset * 1000);
      tmpArray.push({ 'name': 'Sunset', 'value': sunsetDate.toLocaleTimeString() });
    }
    //Do we have a coordinates object? only if we passed it in on startup
    if (data.coord) {
      //Then grab long and lat
      tmpArray.push({ 'name': 'Latitude', 'value': data.coord.lat });
      tmpArray.push({ 'name': 'Longitude', 'value': data.coord.lon });
    }
    //Return the new array to the calling function
    return tmpArray;
  }

  showAlert(message: string) {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Source: Weather Service',
      message: message,
      buttons: [{ text: 'Sorry' }]
    });
    alert.present();
  }

  viewForecast(item) {
    this.nav.push(ForecastDetailPage, { 'forecast': item });
  }

}
