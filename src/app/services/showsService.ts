import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class showsService {

    constructor(private httpClient : HttpClient){}

    getHeader(){
        var header = {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmFhNWRhMTNkZGNiMTEyMjBjMDg1YzdiN2Q3OGE2ZCIsInN1YiI6IjVmMGRkZWJkMWY5OGQxMDAzODFmMzc2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UUV3WZMfkfN-p-cYwCk8EYN4_r09Oa7KkV7fQXdm80Y"
        }
        return header;
    }

    getPopularTvShows(page){
        var headers = this.getHeader();
        return this.httpClient.get(`https://api.themoviedb.org/3/tv/popular?page=${page}`, { headers });
    }

    searchTvShows(name){
        var headers = this.getHeader();
        return this.httpClient.get(`https://api.themoviedb.org/3/search/tv?page=1&query=${name}`, { headers });
    }

    searchTvShowsPager(name,page){
        var headers = this.getHeader();
        return this.httpClient.get(`https://api.themoviedb.org/3/search/tv?page=${page}&query=${name}`, { headers });
    }

    getShowByID(showId : string){
        var headers = this.getHeader();
        return this.httpClient.get('https://api.themoviedb.org/3/tv/'+showId, { headers });
    }

    getEpisodesBySeason(season : number,showId : string){
        var headers = this.getHeader();
        return this.httpClient.get('https://api.themoviedb.org/3/tv/'+showId+'/season/'+season, { headers });
    }

    getShowCredits(showId : string){
        var headers = this.getHeader();
        return this.httpClient.get('https://api.themoviedb.org/3/tv/'+showId+'/credits', { headers });
    }
}