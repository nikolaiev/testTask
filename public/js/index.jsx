import React from 'react'
import ReactDOM from 'react-dom'
import '../css/style.css'

/**
*	Display component
*/
class CalculatorDisplay extends React.Component {
  render() {   	
	const displayValue=this.props.value.displayValue;
	const onPress=this.props.onPress;
	const language = navigator.language || 'en-US'
	
    return (
	<div className="top">
		<CalculatorKey onPress={onPress} className="clear">AC</CalculatorKey>
		<div className="screen">{displayValue}</div>
	</div>
    )
  }
}

/**
*	Calculator's key component
*/
class CalculatorKey extends React.Component {
  render() {
    const onPress=this.props.onPress;
    const className=this.props.className;
    
    return (
        <span onClick={onPress} className={className} >
			{this.props.children}
		</span>
      
    )
  }
}

/**
*	Main component
*/
class Calculator extends React.Component {
	constructor(props){
		super(props)
		
	     this.state = {
			displayValue: '0'
		  };
	}
	
	/*Clears display inputs*/
	clearDisplay() {
		this.setState({
			displayValue: '0'
		})
	}
  
	/*Remove last entered symbol from dysplay*/
	clearOne() {
		const { displayValue } = this.state
		
		let newDisplayValue=displayValue.substring(0, displayValue.length - 1);
		newDisplayValue=newDisplayValue==''?'0':newDisplayValue;
		
		this.setState({
			displayValue: newDisplayValue
		})
	}
	
	/*Get expression result from server*/
	getAnswer() {
		let that=this;  
		const { displayValue } = this.state
		
		/*making request for answer*/
		fetch('/calculate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				expression: displayValue
			})
		})
		.then((res)=>{
			return res.json()
		})
		.then((res)=> {		
			that.setState({
				displayValue	:	res.result,
				isError	:	res.isError
			})
		})
		.catch((e)=>{
				that.setState({
				  displayValue: 'invalid expression'
				})
			}
		);
	}
  
	/*Write single sing info display*/
	inputSign(sign) {
		const { displayValue ,isError} = this.state
		
		if(isError){
			this.setState({
				displayValue: String(sign),
				isError:false
			});   	
		}
		else{
			let newDisplayValue=displayValue==0?sign:(displayValue+sign);
			
			this.setState({
				displayValue: String(newDisplayValue),
			});  
		}	
	}
  
  
	render() {
		const  displayValue  = this.state

		return (
			<div id="calculator">
				<CalculatorDisplay value={displayValue} onPress={()=>this.clearDisplay()}/>
				<div className="keys">
					<CalculatorKey onPress={() => this.inputSign(7)}>7</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(8)}>8</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(9)}>9</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign('+')} className="operator">+</CalculatorKey>
				
					<CalculatorKey onPress={() => this.inputSign(4)}>4</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(5)}>5</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(6)}>6</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign('-')} className="operator">-</CalculatorKey>

					<CalculatorKey onPress={() => this.inputSign(1)}>1</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(2)}>2</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(3)}>3</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign('/')} className="operator">/</CalculatorKey>

					<CalculatorKey onPress={() => this.inputSign(0)}>0</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign('.')}>.</CalculatorKey>			
					<CalculatorKey onPress={() => this.getAnswer()} className="eval">=</CalculatorKey>
					<CalculatorKey onPress={() => this.clearOne()} className="clear">c</CalculatorKey>

					<CalculatorKey onPress={() => this.inputSign('*')} className="operator">*</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign('(')} className="operator">(</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign(')')} className="operator">)</CalculatorKey>
					<CalculatorKey onPress={() => this.inputSign('^')} className="operator">^</CalculatorKey>
				</div>
			</div>
		)
	}
}

/*Rendering calculator component*/
ReactDOM.render(
  <Calculator/>,
  document.getElementById('app')
)