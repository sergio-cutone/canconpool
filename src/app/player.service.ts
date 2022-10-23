import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { forkJoin, merge } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
 
  constructor(private httpClient: HttpClient) { }

  setTeam(lineup){
    return forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        f1Stats: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.f1}/stats?stats=statsSingleSeason&season=20222023`),
        f1Name: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.f1}/`),
        f2Stats: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.f2}/stats?stats=statsSingleSeason&season=20222023`),
        f2Name: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.f2}/`),
        f3Stats: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.f3}/stats?stats=statsSingleSeason&season=20222023`),
        f3Name: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.f3}/`),
        d1Stats: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.d1}/stats?stats=statsSingleSeason&season=20222023`),
        d1Name: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.d1}/`),
        d2Stats: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.d2}/stats?stats=statsSingleSeason&season=20222023`),
        d2Name: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.d2}/`),
        gStats: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.g}/stats?stats=statsSingleSeason&season=20222023`),
        gName: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/people/${lineup.g}/`),
        coach: this.httpClient.get(`https://statsapi.web.nhl.com/api/v1/teams/${lineup.teamid}/?expand=team.stats`)
      }
    )
  }

  //subscribe = this.setTeam(8481540).subscribe(val => console.log(val));
  
  getTeam(id:number){
    return this.setTeam(id);
  }

  getPoints(){
    // return this.httpClient.get(this.points);
  }
  
}