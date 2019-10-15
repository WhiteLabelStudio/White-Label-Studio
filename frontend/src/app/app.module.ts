import 'pace';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';


import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http' 
import { PipesModule } from 'w-ng5';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLf9Ywk47zipEtorDewwMmB3JtuXdzYL4'
    }),
    ToastrModule.forRoot(),   
    routing,
    HttpClientModule,
    HttpModule  
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }