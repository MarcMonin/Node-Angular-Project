import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import{WelcomeComponent} from "./welcome/welcome.component";
import {HelppageComponent} from "./helppage/helppage.component";
import { WeatherCityComponent } from './weather-city/weather-city.component';
import { ForecastComponent } from './forecast/forecast.component';
import { FavoritesGridComponent } from './favorites-grid/favorites-grid.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path:'help', component: HelppageComponent},
  {path:'weather', component: WeatherCityComponent},
  {path:'weather/:city', component: WeatherCityComponent},
  {path:'forecast', component: ForecastComponent},
  {path:'favorites', component: FavoritesGridComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
