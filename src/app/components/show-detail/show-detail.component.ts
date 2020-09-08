import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { showsService } from 'src/app/services/showsService';
import { youtubeService } from 'src/app/services/youtubeService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html'
})
export class ShowDetailComponent implements OnInit {

  show: any = {};
  episodes: any[] = [];
  showId;
  trailerVideo;//id of the video 

  constructor(private activatedRoute: ActivatedRoute,
    private showService: showsService,
    private youtubeService: youtubeService,
    private router: Router) { }

  ngOnInit() {
    this.getShowDetail();
  }

  getShowDetail() {
    this.activatedRoute.params.subscribe((params) => {
      this.showId = params['id'];

      this.showService.getShowByID(params['id']).subscribe((data: any) => {
        this.show = data;
        //removing the specials episodes from a tv serie
        if (this.show.seasons[0].name == "Specials") {
          this.show.seasons.splice([0], 1);
        }

        //searching video of the show
         this.youtubeService.getShowVideo(this.show.name + " trailer")
           .subscribe((data: any) => {
             this.trailerVideo = data.items[0].id.videoId
           },
           (err: HttpErrorResponse) => {
             if (err.status == 403) {
               alert("We cannot show the video because your key is incorrect or it has been used the limit times, we're sorry!");
               console.error("key is incorrect or it has been used the limit times");
               console.error(err); 
             }
           });
    //----------------------------------------------------------------------------
        this.getSeason(1);

      },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            this.router.navigate(["error"]);
            console.log('Client-side error occured.');
          }
        });
    });
  }


  getSeason(season: number) {
    this.showService.getEpisodesBySeason(season, this.showId).subscribe((data: any) => {
      this.episodes = data.episodes;
    },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigate(["error"]);
          console.log('Client-side error occured.');
        }
      });
  }

}
