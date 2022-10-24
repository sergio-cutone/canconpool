import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cancon-pool';
  constructor(private playerService: PlayerService) {}

  name: any;
  points: any;
  fwd1: any;
  fwd2: any;
  fwd3: any;
  def1: any;
  def2: any;
  goal: any;
  coach: any;
  teams: any[] = [];
  team: any;

  owners: any[] = [
    {
      owner: 'Barry',
      f1: 8481540,
      f2: 8477934,
      f3: 8480801,
      d1: 8476853,
      d2: 8477504,
      g: 8474593,
      teamid: 23,
      coach: 'Boudreau',
    },
    {
      owner: 'Gary',
      f1: 8478402,
      f2: 8477496,
      f3: 8482116,
      d1: 8482087,
      d2: 8480145,
      g: 8477967,
      teamid: 10,
      coach: 'Keefe',
    },
    {
      owner: 'Jerry',
      f1: 8479318,
      f2: 8478398,
      f3: 8480012,
      d1: 8478469,
      d2: 8475227,
      g: 8475789,
      teamid: 20,
      coach: 'Sutter',
    },
    {
      owner: 'Larry',
      f1: 8480018,
      f2: 8478396,
      f3: 8479337,
      d1: 8480800,
      d2: 8475166,
      g: 8476945,
      teamid: 22,
      coach: 'Woodcroft',
    },
    {
      owner: 'Sherry',
      f1: 8478483,
      f2: 8476456,
      f3: 8476468,
      d1: 8482964,
      d2: 8480803,
      g: 8476341,
      teamid: 52,
      coach: 'Bowness',
    },
  ];

  teamStats: any[] = [];

  expandTeam(id:any = ''){
    document.getElementById(id)!.classList.toggle("on");
  }

  ngOnInit() {
    this.owners.forEach((owner) => {
      this.playerService.getTeam(owner)
      .pipe(
        finalize(() => {
          this.teamStats.sort((a:any,b:any) => {
            return (parseInt(b.total) - parseInt(a.total))
          })
        })
      ).subscribe((response) => {
        this.name = JSON.stringify(response);
        this.name = response;
        const people = [
          {
            name: this.name.f1Name.people[0].fullName,
            position: 'FWD',
            points:
              this.name.f1Stats.stats[0].splits[0].stat.assists +
              this.name.f1Stats.stats[0].splits[0].stat.goals,
            team: this.name.f1Name.people[0].currentTeam.name
          },
          {
            name: this.name.f2Name.people[0].fullName,
            position: 'FWD',
            points:
              this.name.f2Stats.stats[0].splits[0].stat.assists +
              this.name.f2Stats.stats[0].splits[0].stat.goals,
              team: this.name.f2Name.people[0].currentTeam.name
          },
          {
            name: this.name.f3Name.people[0].fullName,
            position: 'FWD',
            points:
              this.name.f3Stats.stats[0].splits[0].stat.assists +
              this.name.f3Stats.stats[0].splits[0].stat.goals,
              team: this.name.f3Name.people[0].currentTeam.name
          },
          {
            name: this.name.d1Name.people[0].fullName,
            position: 'DEF',
            points:
              this.name.d1Stats.stats[0].splits[0].stat.assists +
              this.name.d1Stats.stats[0].splits[0].stat.goals,
              team: this.name.d1Name.people[0].currentTeam.name
          },
          {
            name: this.name.d2Name.people[0].fullName,
            position: 'DEF',
            points:
              this.name.d2Stats.stats[0].splits[0].stat.assists +
              this.name.d2Stats.stats[0].splits[0].stat.goals,
              team: this.name.d2Name.people[0].currentTeam.name
          },
          {
            name: this.name.gName.people[0].fullName,
            position: 'GOL',
            points: this.name.gStats.stats[0].splits[0].stat.wins * 2,
            team: this.name.gName.people[0].currentTeam.name
          },
          {
            name: owner.coach,
            position: 'COA',
            points: this.name.coach.teams[0].teamStats[0].splits[0].stat.wins,
            team: this.name.coach.teams[0].name
          }
        ]
        this.team = {
          teamName: owner.owner,
          people: people.sort((a,b) => b.points - a.points),
          total:
            parseInt(this.name.f1Stats.stats[0].splits[0].stat.assists +
            this.name.f1Stats.stats[0].splits[0].stat.goals +
            this.name.f2Stats.stats[0].splits[0].stat.assists +
            this.name.f2Stats.stats[0].splits[0].stat.goals +
            this.name.f3Stats.stats[0].splits[0].stat.assists +
            this.name.f3Stats.stats[0].splits[0].stat.goals +
            this.name.d1Stats.stats[0].splits[0].stat.assists +
            this.name.d1Stats.stats[0].splits[0].stat.goals +
            this.name.d2Stats.stats[0].splits[0].stat.assists +
            this.name.d2Stats.stats[0].splits[0].stat.goals +
            (this.name.gStats.stats[0].splits[0].stat.wins * 2) +
            this.name.coach.teams[0].teamStats[0].splits[0].stat.wins)
        };
        this.teamStats.push(this.team);
      });
    });
  }
}
