import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { WeatherProvider } from '../providers/weather/weather';
import { HttpClientModule } from '@angular/common/http';
import { CityDataProvider } from '../providers/city-data/city-data';
import { CountryNewsProvider } from '../providers/country-news/country-news';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { NewsPage } from '../pages/news/news';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    NewsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    NewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WeatherProvider,
    CityDataProvider,
    CountryNewsProvider,
    DataServiceProvider,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
