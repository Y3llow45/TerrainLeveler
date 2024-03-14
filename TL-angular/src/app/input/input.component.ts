import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  verticalSquares: number = 2;
  horizontalSquares: number = 2;
  squareSize: number = 50;
  inputData: Array<number> = [];
  Ho: number = 50;

  avarageH1: String = "";
  avarageH2: String = "";
  avarageH4: String = "";
  avarageHeight: String = "";
  Array = Array

  lineX1: number = 50;
  lineY1: number = 0;
  lineX2: number = 50;
  lineY2: number = 100;
  direction: string = 'left';
  HoPoints!: Array<string>;

  drawLine(a:number, b:number, c:number, d:number, color:string) {
    const canvas = this.canvas.nativeElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }
    ctx.beginPath();
    ctx.moveTo(a, b); // 50, 0
    ctx.lineTo(c, d); // 50, 100
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  updateCanvas() {
    const canvas = this.canvas.nativeElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }
    canvas.width = (this.verticalSquares) * this.squareSize;
    canvas.height = (this.horizontalSquares) * this.squareSize;

    for (let v = 0; v <= this.horizontalSquares; v++) {
      for (let h = 0; h <= this.verticalSquares; h++) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(h * this.squareSize, v * this.squareSize, this.squareSize, this.squareSize);
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(h * this.squareSize, v * this.squareSize, this.squareSize, this.squareSize);
      }
    }
  }
  formatLabel(isVertical: boolean) {
    return (value: number): string => {
      if (isVertical) {
        this.verticalSquares = value;
      } else {
        this.horizontalSquares = value;
      }
      this.updateCanvas();
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
  loadDummy() {
    this.inputData = [45, 55, 62, 47, 57, 64, 49, 58, 65];
    console.log(this.inputData)
    this.calcHk()
  }
  loadHomework() {
    this.inputData = [ 55.24, 53.24, 49.04, 45.04,
                       60.54, 58.54, 55.04, 48.84,
                       67.64, 65.64, 59.64, 49.94 ]
    console.log(this.inputData)
    this.Ho = 52;
    this.calcZeroLine()
  }
  loadSecondTest() {
    this.inputData = [ 3, 5, 7, 12,
                       3, 5, 7, 12,
                       3, 5, 8, 13 ]
    console.log(this.inputData)
    this.calcHk()
  }
  loadThirdTest() { 
    this.inputData = [ 12, 8, 7, 2,
                       12, 8, 7, 2,
                       12, 8, 7, 2]
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
    this.avarageHeight = `H₀ = ( ${h1_1+h1_2+h1_3+h1_4} + 2*${h2_1+h2_2+h2_3+h2_4} + 4*${h4.reduce((sum, value) => sum + value, 0)} ) / 4*${this.verticalSquares*this.horizontalSquares} =  ${((h1_1+h1_2+h1_3+h1_4+(2*(h2_1+h2_2+h2_3+h2_4))+(4*(h4.reduce((sum, value) => sum + value, 0))))/(4*this.verticalSquares*this.horizontalSquares)).toFixed(2)}`;
    this.Ho = Number(((h1_1+h1_2+h1_3+h1_4+(2*(h2_1+h2_2+h2_3+h2_4))+(4*(h4.reduce((sum, value) => sum + value, 0))))/(4*this.verticalSquares*this.horizontalSquares)).toFixed(2));
    this.calcZeroLine()
  }
  /*calcZeroLine() {
    let crossedSides = [];
    for(let i = 0; i < (this.verticalSquares+1)*(this.horizontalSquares+1); i++){
      if(this.inputData[i] <= this.Ho) {
        let distanceToHo = (Math.abs(this.squareSize*(this.inputData[i-1]-this.Ho)) / Math.abs(this.inputData[i-1]-this.inputData[i])).toFixed(2);
        crossedSides.push(distanceToHo);
      }
    }
    console.log(crossedSides)
    this.drawRedLine(85,0,85,120);
  }*/
  calcZeroLine() {
    let crossedSides = [];
    let crossedSidesLevel = [];
    console.log(`Size horizontal: ${this.verticalSquares} vertical: ${this.horizontalSquares}`)
    let a = this.horizontalSquares;
    this.horizontalSquares = this.verticalSquares;
    this.verticalSquares = a;
    //let crossedVSides = [];
    //let crossedVSidesLevel = [];
    for(let v = 0; v < this.verticalSquares+1; v++){
      for(let h = 0; h < this.horizontalSquares+1; h++){
        let i = (v*(this.horizontalSquares+1)) + h;
        console.log(`${this.inputData[i]} <= ${this.Ho} && ${this.inputData[i+1]} >= ${this.Ho} && ${i%(this.horizontalSquares+1)}`)
        console.log(`h is ${h} !== ${this.horizontalSquares}    also i = ${i}  v=${v}`)
        if(this.inputData[i] <= this.Ho && this.inputData[i+1] >= this.Ho && i !== this.horizontalSquares && h!== this.horizontalSquares) {
          console.log(`${i} !== ${this.horizontalSquares}`)
          //let distanceFromI = (this.squareSize - Math.abs(this.squareSize*(this.inputData[i] - this.Ho)) / Math.abs(this.inputData[i]-this.inputData[i+1]) ).toFixed(2);
          let distanceFromI2 = (h*this.squareSize+(((this.Ho - this.inputData[i])*this.squareSize)/(this.inputData[i+1]-this.inputData[i]))).toFixed(2);
          //console.log(`${this.squareSize} - ${this.squareSize} * ( ${this.inputData[i]} - ${this.Ho}) / ${this.inputData[i]} - ${this.inputData[i+1]}`)
          //console.log(`${this.Ho} - ${this.inputData[i]} * ${this.squareSize} / ${this.inputData[i+1]} - ${this.inputData[i]}`)
          //console.log(`${h}*${v} ${i}`)
          console.log(`${h}*${this.squareSize}+(((${this.Ho} - ${this.inputData[i]})*${this.squareSize})/(${this.inputData[i+1]}-${this.inputData[i]}))`);
          console.log(distanceFromI2);
          //console.log(((v*(h+1))+h))
          //console.log(`${v} * (${h} + ${1}) + ${h}`)
          //console.log(`${h*this.squareSize}+(((${this.Ho} - ${this.inputData[i]})*${this.squareSize})/(${this.inputData[i+1]}-${this.inputData[i]}))`)
          crossedSides.push(distanceFromI2);
          crossedSidesLevel.push(v)
        }else if(this.inputData[i] > this.Ho && this.inputData[i+1] < this.Ho && i !== this.horizontalSquares && h!== this.horizontalSquares){
          let distanceFromI2 = ((h+1)*this.squareSize-(((this.Ho - this.inputData[i+1])*this.squareSize)/Math.abs(this.inputData[i] - this.inputData[i+1]))).toFixed(2);
          console.log(`(${h}+1)*${this.squareSize}-(((${this.Ho} - ${this.inputData[i+1]})*${this.squareSize})/Math.abs(${this.inputData[i]} - ${this.inputData[i+1]}))`)
          console.log(distanceFromI2);
          crossedSides.push(distanceFromI2);
          crossedSidesLevel.push(v)
        }
        /*if(i <= (this.horizontalSquares+1)*this.verticalSquares){
          if(this.inputData[i] <= this.Ho && this.inputData[i+1+this.horizontalSquares] >= this.Ho) {
            let distanceFromI2 = (v*this.squareSize+(((this.Ho - this.inputData[i])*this.squareSize)/(this.inputData[i+1+this.horizontalSquares]-this.inputData[i]))).toFixed(2);
            crossedVSides.push(distanceFromI2);
            crossedVSidesLevel.push(v)
          }
        }*/
        // TODO if for all vertical sides
        // For all this.horizontalSquares+1 => For => if v*(this.horizontalSquares+1)) + h and (v+1)*(this.horizontalSquares+1)) + h
      }
    }
    for(let i = 0; i < crossedSides.length-1; i++) {
      this.drawLine(Number(crossedSides[i]),Number(crossedSidesLevel[i])*this.squareSize,Number(crossedSides[i+1]),Number(crossedSidesLevel[i+1])*this.squareSize, 'red');
    }
    console.log(crossedSides)
    this.HoPoints = crossedSides
    this.drawTriangles(crossedSides)
  }

  drawTriangles(crossedSides: Array<string>) {
    let straight = true;
    for(let i = 0; i < crossedSides.length; i++) {
      if(Number(crossedSides[i]) < Number(crossedSides[i+1])) {
        straight = false;
        for(let h = 0; h <= this.horizontalSquares; h++){
          for(let v = 0; v <= this.verticalSquares; v++) {
            this.drawLine((h)*this.squareSize, v*this.squareSize, (h*this.squareSize)+this.squareSize, (v*this.squareSize)+this.squareSize, 'green')
          }
        }
      }else if(Number(crossedSides[i]) > Number(crossedSides[i+1])){
        straight = false;
        this.direction = 'right'
        for(let h = 0; h <= this.horizontalSquares; h++){
          for(let v = 0; v <= this.verticalSquares; v++) {
            console.log(`(${h}+1)*this.squareSize, ${v}*this.squareSize, (${h}*${this.squareSize})+this.squareSize, (${v}*${this.squareSize})+this.squareSize, 'green'`)
            this.drawLine((h+1)*this.squareSize, v*this.squareSize, h*this.squareSize, (v*this.squareSize)+this.squareSize, 'green')
          }
        }
      }
    }
    if(straight) {
      for(let h = 0; h <= this.horizontalSquares; h++){
        for(let v = 0; v <= this.verticalSquares; v++) {
          this.drawLine((h)*this.squareSize, v*this.squareSize, (h*this.squareSize)+this.squareSize, (v*this.squareSize)+this.squareSize, 'green')
        }
      }
    }
    this.findIntersected()
  }

  findIntersected( ) {
    
  }
}
//Array(12) [ 55.24, 53.24, 49.04, 45.04, 60.54, 58.54, 55.04, 48.84, 67.64, 65.64, 59.64, 49.94 ]
// [ 3, 5, 7, 12, 3, 5, 7, 12, 3, 5, … ]