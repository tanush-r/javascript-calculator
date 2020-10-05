class Calculator{
    constructor(inputSmallText, inputMainText){
        this.inputSmallText = inputSmallText;
        this.inputMainText = inputMainText;
        this.clearText();
    }

    clearText(){
        this.inputMain = "0";
        this.inputSmall = "0";
        this.firstOp = 0;
    }

    appendText(number) {
        if (this.inputMainText.innerText == 0) this.inputMainText.innerText = "";
        if (this.inputMainText.innerText.includes(".") && number === ".") return
        this.inputMain = this.inputMainText.innerText.toString() + number.toString();
    }


    operate(operation) {
        if(this.inputMain == 0) return
        if (this.inputSmall == 0) {
            //first time compute
            this.inputSmall = "";
            this.operation = operation;
            this.firstOp = this.inputMainText.innerText;
            this.inputSmall = this.firstOp + operation;
            this.inputMain = "0";
        } else {
            //next times this.operation is known....
            let len = this.inputSmallText.innerText.length - 1;
            this.firstOp = this.inputSmallText.innerText.substring(0, len);
            this.compute();
            this.inputSmall = this.firstOp.toString() + operation;
            this.inputMain = "0";
        }
        
    }


    compute(){
        this.secondOp = this.inputMainText.innerText;
        this.firstOp = this.firstOp.toString();
        if(this.firstOp.includes(".") || this.secondOp.includes(".") ){
            this.firstOp = parseFloat(this.firstOp);
            this.secondOp = parseFloat(this.secondOp);
        } else {
            this.firstOp = parseInt(this.firstOp);
            this.secondOp = parseInt(this.secondOp);
        }
       
        switch(this.operation){
            case "+":
                this.firstOp += this.secondOp;
                break;
            case "-":
                this.firstOp -= this.secondOp;
                break;
            case "*":
                this.firstOp *= this.secondOp;
                break;
            case "/":
                this.firstOp /= this.secondOp;
                break;
            
        }
    }

    percentOperation(){
        this.inputMain = (this.inputMain.includes(".")) ? parseFloat(this.inputMain)/100.0 : parseInt(this.inputMain)/100;
        this.inputMain = this.inputMain.toString();
    }


    gstOperation(){
        this.inputMain =  parseFloat(this.inputMain);
        this.inputMain += 0.18 * this.inputMain;
        this.inputMain = this.inputMain.toString();

    }

    showValue(){
        this.compute();
        this.inputSmall = "0";
        this.inputMain = this.firstOp;
    }


    clearSingle(){
        this.l = this.inputMain.length - 1  ;
        this.inputMain = this.inputMain.substring(0,this.l);
        if(this.inputMain === "") this.inputMain = 0;
    }


    updateDisplay(){
        this.inputMainText.innerText = this.inputMain;
        this.inputSmallText.innerText = this.inputSmall;
    }
    
}


const numberButtons = document.querySelectorAll('[btn-num]');
const operationButtons = document.querySelectorAll('[btn-op]');
const acButton = document.querySelector('[btn-ac]');
const cButton = document.querySelector('[btn-c]');
const gstButton = document.querySelector('[btn-gst]');
const equalsButton = document.querySelector('[btn-eq]');
const perButton = document.querySelector('[btn-per]')

const inputSmallText = document.querySelector('[input-sm]');
const inputMainText = document.querySelector('[input-main]');

const calculator = new Calculator(inputSmallText, inputMainText);

numberButtons.forEach( button => {
    button.addEventListener("click", () => {
        calculator.appendText(button.innerText);
        calculator.updateDisplay();
    });
});


operationButtons.forEach( button => {
    button.addEventListener("click", () => {
        calculator.operate(button.innerText);
        calculator.updateDisplay();
    });
});


acButton.addEventListener("click", () => {
    calculator.clearText();
    calculator.updateDisplay();
})

cButton.addEventListener("click", () => {
    calculator.clearSingle();
    calculator.updateDisplay();
})

equalsButton.addEventListener("click", () => {
    calculator.showValue();
    calculator.updateDisplay();

})

perButton.addEventListener("click", () => {
    calculator.percentOperation();
    calculator.updateDisplay();

})

gstButton.addEventListener("click", () => {
    calculator.gstOperation();
    calculator.updateDisplay();

})

