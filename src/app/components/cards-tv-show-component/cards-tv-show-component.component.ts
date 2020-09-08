import { Component, OnInit, Input } from '@angular/core';
import { showsService } from 'src/app/services/showsService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-tv-show-component',
  templateUrl: './cards-tv-show-component.component.html'
})
export class CardsTvShowComponentComponent implements OnInit {
  @Input()shows : any[] = [];
  actors : any[] = [];

  constructor(private showService: showsService,
    private router: Router) { }
    
  ngOnInit() {
  }


  
  onPreInformation(showId: string){
    this.showService.getShowCredits(showId)
      .subscribe((data : any)=>{
        this.actors = data.cast; 
        this.actors.splice(3,this.actors.length-2);
    });
  }
  //master detail pattern
  detail(showId: string) {
    this.router.navigate(['showDetail', showId]);
  }

}
