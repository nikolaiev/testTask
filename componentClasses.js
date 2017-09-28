'use strict'

class Component{
	constructor(){
		if(this.target=="Component")
			throw new Error("Abstract class");
	}
	/**
	 * Calculate value of tree
	 * @return calculated value
	 */
	calculate (){
		throw "Unimplemented exception";
	}
}

/**
 * Returns Operation - Component objects
 */
class OperationFactory {
	
	constructor(){
		if (this.constructor !== OperationFactory) {
		  throw new Error('Subclassing is not allowed')
		}
	}
	
	static getOperationComponent(/*char*/ c,/*Component*/ c1,/*Component*/ c2){
		switch (c){
			case '+': return new OperationPlus(c1,c2);
			case '-': return new OperationSub(c1,c2);
			case '*': return new OperationMult(c1,c2);
			case '^': return new OperationPow(c1,c2);
			case '/': return new OperationDiv(c1,c2);
			default: throw "Invalid input expression";
		}
	}
}


/**
 * Component that represents number
 */
class Digit extends Component {
	/**
	 * Constructor
	 * @param val number value
	 */
	constructor(val){
		super();
		this.val=val;
	}
	
	calculate() {
		return this.val;
	}
}



/**
 * Division operation Component
 */
class OperationDiv extends Component {
	/**
	 * Constructor
	 * @param leftCompoennt left multiplier
	 * @param rightCompoment right multiplier
	 */
	constructor(/*Component*/ leftCompoennt, /*Component*/ rightCompoment) {
		super();
		
		this.left = leftCompoennt;
		this.right = rightCompoment;
	}
	
	calculate() {
		return this.left.calculate() / this.right.calculate();
	}
}

/**
 * Multiply operation Component
 */
class OperationMult extends Component {
	/**
	 * Constructor
	 * @param leftCompoennt left multiplier
	 * @param rightCompoment right multiplier
	 */
	constructor(/*Component*/ leftCompoennt, /*Component*/ rightCompoment) {
		super();
		
		this.left = leftCompoennt;
		this.right = rightCompoment;
	}
	
	calculate() {
		return this.left.calculate() * this.right.calculate();
	}
}


/**
 * Plus operation Component
 */
class OperationPlus  extends Component {
	/**
	 * Constructor
	 * @param leftCompoennt left multiplier
	 * @param rightCompoment right multiplier
	 */
	constructor(/*Component*/ leftCompoennt, /*Component*/ rightCompoment) {
		super();
		
		this.left = leftCompoennt;
		this.right = rightCompoment;
	}
	
	calculate() {
		return this.left.calculate() + this.right.calculate();
	}
}


/**
 * Pow  operation Component
 */
class OperationPow   extends Component {
	/**
	 * Constructor
	 * @param leftCompoennt left multiplier
	 * @param rightCompoment right multiplier
	 */
	constructor(/*Component*/ leftCompoennt, /*Component*/ rightCompoment) {
		super();
		
		this.left = leftCompoennt;
		this.right = rightCompoment;
	}
	
	calculate() {
		return Math.pow(this.left.calculate(),this.right.calculate());
	}
}


/**
 * Substraction  operation Component
 */
class OperationSub    extends Component {
	/**
	 * Constructor
	 * @param leftCompoennt left multiplier
	 * @param rightCompoment right multiplier
	 */
	constructor(/*Component*/ leftCompoennt, /*Component*/ rightCompoment) {
		super();
		
		this.left = leftCompoennt;
		this.right = rightCompoment;
	}
	
	calculate() {
		return this.left.calculate() - this.right.calculate();
	}
}		

/*exports*/
module.exports.Digit = Digit;
module.exports.OperationSub = OperationSub;
module.exports.OperationPlus = OperationPlus;
module.exports.OperationMult = OperationMult;
module.exports.OperationPow = OperationPow;
module.exports.OperationFactory = OperationFactory;


