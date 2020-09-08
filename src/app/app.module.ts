import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShowsComponent } from './components/shows/shows.component';
import { FoundShowsComponent } from './components/found-shows/found-shows.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http/';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { showsService } from './services/showsService';
import { youtubeService } from './services/youtubeService';

import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { rating } from './pipes/rating.pipe';
import { videoUrl } from './pipes/safeUrl.pipe';
import { FormsModule } from '@angular/forms';
import { CardsTvShowComponentComponent } from './components/cards-tv-show-component/cards-tv-show-component.component';
import { ErrorPageComponent } from './components/error-page/error-page.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShowsComponent,
    FoundShowsComponent,
    ShowDetailComponent,
    LoadingComponentComponent,
    rating,
    videoUrl,
    CardsTvShowComponentComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule
  ],
  providers: [showsService ,youtubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
