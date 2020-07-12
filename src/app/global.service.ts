import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StateType } from './models/mj.types';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public card:Subject<number[]> = new Subject<number[]>();

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

  public generate(count: number = 24): number[]{
    let arr = [];
    for (let i = 0; i < count; i++) {
      let number = this._randomPrimeNumber();
      arr.push(number);
    }

    return arr;

  }


}
