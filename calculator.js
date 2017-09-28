let comp=require('./componentClasses.js');

module.exports= class Calculator {
    
    /**
     * Constructor     
     */
    constructor(){        
    }

    /**
     * calculates expression
	 * @param expression expresion to calculate
     * @return component tree calculation result
     */
    calculate(/*String */ expression){
		expression=expression.replace(" ","");
        this.expression=expression;
        
		this.createTree();
		
        return this.component.calculate();
    }

    /**
     * Creates component tree from expression
     */
    createTree(){
        /*Array*/
		let components=new Array();        //components stack
        let tempComponent="";                                    //temp component string representation value
        /*Array*/
		let operStack=new Array();                   //operations stack
		const expression=this.expression;
		
		
        /*for each character in expression*/
        for(let i=0;i<expression.length;i++){
            /*char*/
			let tempChar=expression.charAt(i);

            //check if a digit
            if(this.isDigit(tempChar)){
                //read all number
                while(!this.isOperator(tempChar) && i+1<=expression.length){
                    tempComponent+=tempChar;
                    i++;

                    if(i!=expression.length)
                        tempChar=expression.charAt(i); //go to next symbol
                }

                //add Digit component to component stack
                components.push(new comp.Digit(parseInt(tempComponent))); //add new Component to stack

                //clean temp value
                tempComponent = "";

                //if end of expression is not reached
                if(i!=expression.length)
                    tempChar = expression.charAt(--i);// return to previous symbol
            }

            /*if the operator*/
            if(this.isOperator(tempChar)){

                if(tempChar=='(')               //if symbol is open bracket
                    operStack.push(tempChar);
                else {
                    if (tempChar == ')') {           //if symbol is close bracket
                        /*char*/
						let s = operStack.pop();

                        while (s != '(') {
                            /*char*/
							let operation = s;
                            this.makeComponentFromStack(operation, components);   //create component from stack
                            s = operStack.pop();
                        }
                    } else {                          //if any another operator
                        if (operStack.length > 0)      //if stack contains elements
                            if (this.getPriority(tempChar) <= this.getPriority(operStack[operStack.length-1])) {
                                /*char*/
								let operation = operStack.pop();
                                this.makeComponentFromStack(operation, components);
                            }
                        operStack.push(tempChar);

                    }// if temp char
                }

            } // if isOperator

        }// for each cycle

        /*if operation stack is nto empty*/
        while (!operStack.length==0){
            /*char*/
			let operation=operStack.pop();
            this.makeComponentFromStack(operation,components);   //create new component
        }
        this.component=components[0]; //set component value
    }

    /**
     * Replace old Components with new Component obj from component stack and operation type
     * @param tempChar  operation type
     * @param components    components' stack
     */
    makeComponentFromStack(/*char*/ tempChar,/*Array*/ components){
		/*Component*/
		let rightComp=components.pop();
        /*Component*/
		let leftComp=components.pop();
        

        /*Component*/ 
		let component=
                comp.OperationFactory.getOperationComponent(tempChar,leftComp,rightComp);
				
        components.push(component);
    }
	
	
	/**
	*@return true if string contains only digit
	*/
	isDigit(str){
		return /^\d+$/.test(str);
	}

    /**
     * Gives the priority of operation
     * @param s operation char representation
     * @return priority of operation
     */
    getPriority(/*char*/ s){
        switch (s)
        {
            case '(': return 0;
            case ')': return 1;
            case '+': return 2;
            case '-': return 3;
            case '*': return 4;
            case '/': return 4;
            case '^': return 5;
            default: return 6;
        }
    }

    /**
     * Check if character is operator char representation
     * @param c character to check
     * @return  true if c is operator
     */
    isOperator(/*char*/ c){
        if (("+-/*^()".indexOf(c) != -1))
            return true;
        return false;
    }
}