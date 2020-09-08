import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class youtubeService {

    constructor(private httpClient : HttpClient){}

    getShowVideo(show){
        var params = new HttpParams()
        .set('part','snippet')
        .set('q',show)
        .set('key','AIzaSyBS0tCeAAHvwZ0k_4QW_HBbi_n1oPk7CRo')
         .set('maxResults','2');
        //.set('order','rating')

        return this.httpClient.get("https://www.googleapis.com/youtube/v3/search", { params });
    }

}