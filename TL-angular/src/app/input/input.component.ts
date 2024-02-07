import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  verticalSquares: number = 1;
  horizontalSquares: number = 1;
  Array = Array

  renderTerrain(v:number, h:number) {
    console.log(v,h)
  }

  formatLabel(isVertical: boolean) {
    return (value: number): string => {
      if (isVertical) {
        this.verticalSquares = value;
      } else {
        this.horizontalSquares = value-1;
      }
    
      if (value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }
      console.log(this.verticalSquares, this.horizontalSquares)
      this.renderTerrain(this.verticalSquares, this.horizontalSquares)
      return `${value}`;
    };
  }
}
