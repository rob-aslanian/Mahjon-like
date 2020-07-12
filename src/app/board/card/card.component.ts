import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { StateType } from 'src/app/models/mj.types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() value:number;
  @Input() key:number;

  state:StateType;

  constructor(
    private globalService:GlobalService
  ) { }

  ngOnInit(): void {

  }

  public showCard() {
    this.state = "pennding";   
    this.globalService.card.next([this.key , this.value]);
  }


}
