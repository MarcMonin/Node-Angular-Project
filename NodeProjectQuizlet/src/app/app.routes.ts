import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import{WelcomeComponent} from "./welcome/welcome.component";
import {LearningComponent} from "./learning/learning.component";
import {QuizComponent} from "./quiz/quiz.component";
import {StatsComponent} from "./stats/stats.component";
import {ProfilComponent} from "./profil/profil.component";
import {HelppageComponent} from "./helppage/helppage.component";
import { WeatherCityComponent } from './weather-city/weather-city.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'learning', component: LearningComponent},
  {path: 'quiz', component: QuizComponent},
  {path:'stats', component: StatsComponent},
  {path: 'profile', component: ProfilComponent},
  {path:'help', component: HelppageComponent},
  {path:'weather', component: WeatherCityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
