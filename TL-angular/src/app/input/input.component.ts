import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  verticalSquares: number = 1;
  horizontalSquares: number = 1;
  totalInput: number = 4;
  Array = Array
  formatLabel(isVertical: boolean) {
    return (value: number): string => {
      if (isVertical) {
        this.verticalSquares = value;
      } else {
        this.horizontalSquares = value;
      }
    
      if (value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }
      console.log(this.verticalSquares, this.horizontalSquares)
      this.totalInput = (this.verticalSquares+1)*(this.horizontalSquares+1)
      console.log(this.totalInput)
      return `${value}`;
    };
  }
}
