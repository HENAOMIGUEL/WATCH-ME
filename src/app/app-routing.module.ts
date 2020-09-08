import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ShowsComponent } from './components/shows/shows.component';
import { FoundShowsComponent } from './components/found-shows/found-shows.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

/*
{ path: 'profile', component: ProfileComponent },
{ path: 'playlistcrud', component: PlaylistCrudComponent },
{ path: 'search/:song', component: SongsFoundComponent },
{ path: 'error', component: InformationComponent },
{ path: 'playlistDetail/:id', component: PlaylistDetailComponent },
{ path: '**',pathMatch:'full' ,redirectTo:'profile'}

*/
const routes: Routes = [
  
  { path: 'home', component: ShowsComponent },
  { path: 'search/:show', component: FoundShowsComponent },
  { path: 'showDetail/:id', component: ShowDetailComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', pathMatch:'full', redirectTo:'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
