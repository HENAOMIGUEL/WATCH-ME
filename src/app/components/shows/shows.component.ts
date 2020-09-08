import { Component, OnInit , ViewChild } from '@angular/core';
import { showsService } from 'src/app/services/showsService';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html'
})
export class ShowsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewport: CdkVirtualScrollViewport;


  shows: any[] = [];
  page = 1;//starts in number 1 so i ask for the first data round
  loading = true;

  constructor(private showService: showsService,
              private router : Router) { }

  ngOnInit() {
  }

  loadNextFilms() {
    this.showService.getPopularTvShows(this.page).subscribe((data: any) => {
      this.shows = this.shows.concat(data.results);
      this.loading = false;
      this.page++;

    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.router.navigate(["error"]);
        console.log('Client-side error occured.');
      }
    });
  }
//from html it detects the end of scroll action,  it asks again for new tv shows
  nextBatch(currIndex: number, items: any[]) {    
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end == total ) {
      this.loadNextFilms();
    }
  }

}
