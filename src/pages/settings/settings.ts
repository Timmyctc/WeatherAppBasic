import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';
import { CityDataProvider } from '../../providers/city-data/city-data';
import { CountryNewsProvider} from '../../providers/country-news/country-news';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

//instance vars
  private cityName: string;
  private units: string ;
  private title: string = 'Settings';
  buttonDisabled: boolean = true;

  //TODO
  private loadedCity: string;

  constructor(private navCtrl: NavController, private storage: Storage, private weatherService: WeatherProvider, private cityDataService: CityDataProvider,
    private newsProvider: CountryNewsProvider) {
  }

  ionViewDidLoad() {

  }

  saveSettings() {

    //TODO
    // this.loadedCity = this.cityName;

    //Put City/Units in storage (not necesssary?) Set will overwrite each time 
    this.storage.set('city', this.cityName);
    this.storage.set('units', this.units);

    //use weatherService to get weather data for each city from the API using cityname and units as params
    this.cityDataService.getCityDataFromAPI(this.cityName);

    this.storage.get("cityInfo").then((val) => {
      console.log(val);
      let cityInfo = val;
      // return val;
      this.weatherService.getWeatherFromApiCoordinates(val.lat, val.lng, this.units);
    }).catch((err) => {
      console.log(err);
    });


    //TODO
     this.newsProvider.getCountryNewsFromAPI("gb");

  } //end saveSettings

//   getLatLonFromCityName(): any {
//     let latlng = this.storage.get("cityInfo").then((val) => {
//       return val;
//     }).catch((err) => {
//       console.log(err);
//     });
// }


  

//------------------------------------------Sleep Function--------------------------------------------------------------------

  // sleep(milliseconds) {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }

  //------------------------------------------------------Alert Box------------------------------------------------------
  // openAlertDialog() {
  //   const dialogRef = this.dialog.open(AlertDialogComponent,{
  //     data:{
  //       message: 'HelloWorld',
  //       buttonText: {
  //         cancel: 'Done'               Making the alert dialog popup for null city ref
  //       }
  //     }
  //   }
  // }

}

