import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { showsService } from 'src/app/services/showsService';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-found-shows',
  templateUrl: './found-shows.component.html'
})
export class FoundShowsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, null) viewport: CdkVirtualScrollViewport;

  shows: any[] = [];
  actors: any[] = [];

  searchedName;//query name

  //variables for pagination
  totalPages;
  previousDisabled = false;
  nextDisabled = false;

  loading = true;//enable or disable splash loading

  page = 1;//the pagination starts in 1


  constructor(private activatedRoute: ActivatedRoute,
    private showService: showsService,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      this.searchedName = params["show"];
      this.showService.searchTvShows(params["show"])
        .subscribe((data: any) => {
          this.shows = data.results;
          //knowing number of pages to enable or disable buttons
          this.totalPages = data.total_pages;
          if (this.page >= this.totalPages) {
            this.nextDisabled = true;
          } else {
            this.nextDisabled = false;
          }
          if (this.page >= 1) {
            this.previousDisabled = true;
          }
          this.loading = false;

        },
          (err: HttpErrorResponse) => {
            if (err.status == 401) {
              this.router.navigate(["error"]);
              console.log('Client-side error occured.');
            }
          });
    });
  }


  //PREVIOUS AND NEXT SHOWS
  goNext() {
    if (this.page > this.totalPages) {
      this.nextDisabled = true;
    } else {
      this.loading = true;
      this.nextDisabled = false;
      this.page++;
      this.searchTvShowsHttp()
        .subscribe((data: any) => {
          this.shows = data.results;
          this.previousDisabled = false;
          this.loading = false;
        });
      if (this.page == this.totalPages) {
        this.nextDisabled = true;
      }
    }
  }

  goPrevious() {
    if (this.totalPages >= this.page) {
      if (this.page >= 1) {
        this.loading = true;
        this.page--;
        this.searchTvShowsHttp()
          .subscribe((data: any) => {
            this.shows = data.results;
            this.loading = false;
          });
        this.nextDisabled = false;

        if (this.page == 1) {
          this.previousDisabled = true
        }
      }
    } else {
      this.previousDisabled = false;
    }
  }
  //----------------------
  searchTvShowsHttp() {
    return this.showService.searchTvShowsPager(this.searchedName, this.page);
  }
}
