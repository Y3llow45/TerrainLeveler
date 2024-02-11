import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  verticalSquares: number = 2;
  horizontalSquares: number = 2;
  inputData: Array<number> = [];
  Array = Array
  avarageH1: String = "";
  avarageH2: String = "";
  avarageH4: String = "";
  avarageHeight: String = "";

  formatLabel(isVertical: boolean) {
    return (value: number): string => {
      if (isVertical) {
        this.verticalSquares = value;
      } else {
        this.horizontalSquares = value;
      }
      return `${value}`;
    };
  }

  calc() {
    this.inputData = [];
    for(let i = 0; i < (this.verticalSquares+1)*(this.horizontalSquares+1); i++) {
      let inputField = document.getElementById(`H${i}`)
      let inputValue = (inputField as HTMLInputElement).value;
      this.inputData.push(Number(inputValue))
    }
    console.log(this.inputData)
    this.calcHk()
  }

  calcHk() {
    let h1_1 = this.inputData[0];
    let h1_2 = this.inputData[this.verticalSquares];
    let h1_3 = this.inputData[((this.verticalSquares+1)*this.horizontalSquares)];
    let h1_4 = this.inputData[this.inputData.length-1];
    this.avarageH1 = `∑H₁ = ${h1_1} + ${h1_2} + ${h1_3} + ${h1_4} = ${h1_1+h1_2+h1_3+h1_4}`;

    let h2_1 = 0;
    let h2_2 = 0;
    let h2_3 = 0;
    let h2_4 = 0;

    for(let i = 1; i < this.verticalSquares; i++){
      h2_1 += this.inputData[i];
    }
    for(let i = ((this.verticalSquares+1)*this.horizontalSquares)+1; i < this.inputData.length-1; i++){
      h2_4 += this.inputData[i];
    }
    for(let i = this.verticalSquares+1; i < ((this.verticalSquares+1)*this.horizontalSquares); i+=this.verticalSquares+1){
      h2_2 += this.inputData[i];
    }
    for(let i = ((this.verticalSquares+1)*2)-1; i < this.inputData.length-1; i+=this.verticalSquares+1){
      h2_3 += this.inputData[i];
    }
    this.avarageH2 = `∑H₂ = ${h2_1} + ${h2_2} + ${h2_3} + ${h2_4} = ${h2_1+h2_2+h2_3+h2_4}`;
    
    let h4 = [];

    for(let h = this.verticalSquares+2; h < (this.verticalSquares*2)+1; h++) {
      for(let v = h; v < (this.verticalSquares+1)*this.horizontalSquares; v+=this.verticalSquares+1) {
        h4.push(this.inputData[v])
      }
    }

    this.avarageH4 = `∑H₄ = ${h4.join('+')} = ${h4.reduce((sum, value) => sum + value, 0)}`;
    this.avarageHeight = `H₀ = ( ${h1_1+h1_2+h1_3+h1_4} + 2*${h2_1+h2_2+h2_3+h2_4} + 4*${h4.reduce((sum, value) => sum + value, 0)} ) / 4*${this.verticalSquares*this.horizontalSquares} =  ${(h1_1+h1_2+h1_3+h1_4+(2*(h2_1+h2_2+h2_3+h2_4))+(4*(h4.reduce((sum, value) => sum + value, 0))))/(4*this.verticalSquares*this.horizontalSquares)}`;
    

  }






}
