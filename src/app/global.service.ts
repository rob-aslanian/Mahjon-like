import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public card: Subject<number[]> = new Subject<number[]>();

  constructor() { }

  private _randomPrimeNumber(min: number = 1, max: number = 15): number {
    let number = Math.floor(Math.random() * max) + min;
    while (!this._isPrime(number)) {
      number = this._randomPrimeNumber();
    }

    return number;
  }

  private _isPrime(value: number): boolean {
    return value % 2 !== 0 || value === 2;
  }

  public generate(count: number = 24): number[] {
    let arr = [];
    for (let i = 0; i < count; i++) {
      let number = this._randomPrimeNumber();

      if (arr.length >= count / 2) {
        arr[i] = arr[i - (count / 2)]
      } else {
        arr.push(number);
      }
    }

    return this._shuffle(arr);

  }

  private _shuffle(arr) {
    let currentIndex = arr.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    return arr;
  };




}
