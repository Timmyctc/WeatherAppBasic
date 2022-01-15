import { Component } from '@angular/core';
import { NavController, } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { NewsPage } from '../news/news';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Fields
  private studentNumber: string = 'G00398297';
  private city: string = "";
  private units: string;
  private Weather: any = [];
  private cityInfo = [];
  private countryNews = [];
  private titleString: string = '';
  private hide: boolean = false;
  private unit: string;


  constructor(public navCtrl: NavController, private ds: DataServiceProvider, private weatherProvider: WeatherProvider, private storage: Storage) {

  }

  ionViewDidEnter() {
    //City Name
    this.storage.get("city").then((data) => {
      if (data) {
        this.city = data;
        this.titleString = "News and Weather for ";
        console.log(data);
      } else {
        this.hide = true;
        console.log("City not in storage")
      }
    }).catch((err) => {
      console.log(err);
    });

    

    //Units
    this.storage.get("units").then((data) => {
      if (data) {
        this.units = data;
        console.log(data);

      } else {
        console.log("Units Not in storage yet");
      }
    }).catch((err) => {
      console.log(err);
    });

    //Weather Information
    this.storage.get("weatherInfo").then((data) => {
      if (data) {
        this.Weather = data;
        console.log(data);

      } else {
        console.log("Weather Info Not in storage yet");
      }
    }).catch((err) => {
      console.log(err);
    });

    //City Information
    this.storage.get("cityInfo").then((data) => {
      if (data) {
        this.cityInfo = data;
        console.log(data);
      } else {
        console.log("City Info Not in storage yet");
      }
    }).catch((err) => {
      console.log(err);
    });

    //Country News
    this.storage.get("countryNews").then((data) => {
      if (data) {
        this.countryNews = data;
        console.log(data);
      } else {
        console.log("City Info Not in storage yet");
      }
    }).catch((err) => {
      console.log(err);
    });


  }

  displayUnit() {
    if (this.city == "") this.hide = true;
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  goToNews() {
    this.navCtrl.push(NewsPage);
  }

}