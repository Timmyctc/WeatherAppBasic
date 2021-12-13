import { Component } from '@angular/core';
import { NavController,  } from 'ionic-angular';
import {SettingsPage} from '../settings/settings';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private studentNumber: string = 'G00398297';
  private weather;
  private city: string;
  constructor(public navCtrl: NavController, private storage: Storage, private weatherProvider: WeatherProvider) {

  }



  // ngOnInit() {
  //   if (this.storage.get('city') === null) this.weather = "No city selected";
  //   else {

  //     this.storage.get('city').then((val) => {
  //       if (val != null) {
  //         this.weatherProvider.getWeatherFromApiCity(val, "metric").subscribe(weather => {
  //           this.weather = weather;
  //         });
  //       }
  //     }

  //     );
  //   }
  // }
  displayThings(){
    this.storage.get('weatherInfo').then((val) => {
      console.log(val);
    });

    this.storage.get('countryNews').then((val) => {
      console.log(val);
    });
  }

  goToSettings() { 
    this.navCtrl.push(SettingsPage);
  }

}
