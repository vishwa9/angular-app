import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HERO } from '../hero';
import {HEROES} from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeroesComponent implements OnInit {
  // heroes = HEROES;
  heroes : HERO[];

  constructor(private HeroService: HeroService) { }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.HeroService.addHero({ name } as HERO)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: HERO): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.HeroService.deleteHero(hero).subscribe();
  }
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.HeroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
