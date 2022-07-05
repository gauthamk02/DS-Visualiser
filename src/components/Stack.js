import React from 'react'
import '../styles/Stack.css'
import '../styles/styles.css'

class Stack extends React.Component {
    
    constructor(props) {
        super(props);
        this.colorCounter = 0;
        this.items = [];
        this.idCounter = 0;
        this.state = {
            StackState: [this.createStackItem(12), this.createStackItem(87), this.createStackItem(64)],
            lastOperation: {},
        }
    }
    
    createStackItem = (val) => {
        let bgcolors = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#FD7272"];
        let color = bgcolors[this.colorCounter % bgcolors.length];
        this.colorCounter++;
        return new StackItem(this.idCounter++ ,val, color);
    }
    
    clearStack = () => {
        this.setState({ StackState: [] , lastOperation: StackSteps.clearStack()});
    }
    
    pushElement = (val) => {
        if (this.state.StackState.length === 9) {
            alert("Cant create Stack with length more than 9");
            return;
        }
        if (val === "" || val === null) return;
        let stack = this.state.StackState;
        stack.push(this.createStackItem(val));
        this.setState({ StackState: stack, lastOperation: StackSteps.pushElement() });
    }
    
    peekStack=()=> {
        if (this.state.StackState.length === 0) {
            alert("Stack is Empty!");
            return;
        }
        let lastElement = this.state.StackState[this.state.StackState.length - 1];
        alert(`Peek Value: ${lastElement.val}`)
    }
    
    popElement = () => {
        if (this.state.StackState.length === 0) {
            alert("Stack is Empty!");
            return;
        }
        let temp = this.state.StackState.pop();
        this.setState({ StackState: this.state.StackState , lastOperation: StackSteps.popElement()});
        alert(`The popped value is ${temp.val}`)
    }
    
    createStack = () => {
        let size = prompt("Enter the size of the Stack");
        this.clearStack();
        if (size > 10) {
            alert("Cant create Stack with length more than 9");
            return;
        }
        let stack = [];
        while (size--) {
            stack.push(this.createStackItem(0));
        }
        this.setState({ StackState: stack });
    }

    render() {
        return (
            <>
                <h2>Stack</h2>
                <div className="container">
                    <div className='row'>
                        <div className="col-5">
                            <div className='container canvas' style={{ height: "600px", width: "60%", margin: "auto auto"}}>
                                {
                                    this.state.StackState.length > 0 ? (
                                        <table className='stack-table'>
                                            <tbody>
                                            {this.state.StackState.reverse().map((item, index) => {
                                                return <tr key={item.id}><td className='stack-item' >
                                                    <div className='item-container' style={{ backgroundColor: item.color }}>
                                                        <div style={{ margin: "auto", position: "relative" }}>
                                                            <b>{item.val}</b>
                                                        </div>
                                                    </div>
                                                </td>
                                                </tr>
                                            })}
                                            </tbody>
                                        </table>) : (<h4 style={{ margin: "auto auto" }}>Stack is Empty</h4>)
                                }
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="row workspace" style={{ borderBottom: "4px solid black" }}>
                                <div className="d-flex justify-content-center m-3">
                                    <button type="button" className="btn btn-info me-3" onClick={() => {
                                        const val = prompt("Enter the value");
                                        this.pushElement(val)
                                    }}>Push Element in the Stack</button>
                                </div>
                                <div className="d-flex justify-content-center m-3">
                                    <button type="button" className="btn btn-warning me-3" onClick={() => { 
                                        this.popElement()
                                     }}>POP Element from the Stack</button>
                                </div>
                                <div className="d-flex justify-content-center m-3">
                                    <button type="button" className="btn btn-danger me-3" onClick={this.clearStack}>Clear Stack</button>
                                    <button type="button" className="btn btn-secondary" onClick={this.peekStack}>Peek</button>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    !(Object.keys(this.state.lastOperation).length === 0) ? (
                                        <>
                                            <b>Last Operation: {this.state.lastOperation.title}</b>
                                            <br />
                                            <b>Steps:</b>
                                            <ol className="step-ol" >
                                                    {this.state.lastOperation.steps.map((step, index) => {
                                                        return <li key={index} className="step-li">{step}</li>;
                                                    })}
                                            </ol>
                                        </>
                                    ) : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class StackItem {
    constructor(id, val, color) {
        this.id = id;
        this.val = val;
        this.color = color;
    }
}
export default Stack;
class StackSteps {
    static pushElement() {
        return {
            title: `Element pushed in the Stack`,
            steps: [`Checks if the stack is full.`,
            `If the stack is full, produces an error and exit.`,
            `If the stack is not full, increments top to point next empty space.`,
            `Adds data element to the stack location, where top is pointing.`
                
            ]
        }
    }
    static popElement() {
        return {
            title: `Element popped out of Stack`,
            steps: [
              `Checks if the stack is empty.`,
              `If the stack is empty, produces an error and exit.`,
              `If the stack is not empty, accesses the data element at which top is pointing.`,
              `Decreases the value of top by 1.`
            ]
        }
    }
    static clearStack() {
        return {
            title: `Clear Stack`,
            steps: [
                `Stack is Deleted.`
            ]
        }
    }
    static createStack(size) {
        return {
            title: `Create Stack with size ${size}`,
            steps: [
                `Create a new Stack with size ${size}.`,
            ]
        }
    }
}