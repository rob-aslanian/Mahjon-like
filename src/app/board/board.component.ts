import { Component, OnInit, ViewChildren, ComponentRef, QueryList } from '@angular/core';
import { GlobalService } from '../global.service';
import { pairwise } from "rxjs/operators"
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChildren(CardComponent) cards: QueryList<CardComponent>

  cardList: number[] = [];

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.cardList = this.globalService.generate();

    this.detectCardChaneges();
  }

  detectCardChaneges() {
    this.globalService
      .card
      .pipe(pairwise())
      .subscribe(([prevValue, currentValue]) => {
        if (prevValue && currentValue) {
          let prevIndex = prevValue[0],
            currIndex = currentValue[0],
            cardArr = this.cards.toArray();

          if (prevIndex !== currIndex) {

            if (prevValue[1] === currentValue[1]) {
              cardArr[currIndex].state = "vissible";
              cardArr[prevIndex].state = "vissible";

            } else {
              setTimeout(() => {
                cardArr[currIndex].state = "hidden";
                cardArr[prevIndex].state = "hidden";
              }, 1000)
            }

            this.globalService.card.next();
          }
        }
      })
  }




}
