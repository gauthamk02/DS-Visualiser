import React from 'react'
import '../styles/Stack.css'
import '../styles/styles.css'

class Stack extends React.Component {
    constructor(props) {
        super(props)
        this.colorCounter = 0;
        this.items = []
        this.count = 0
        this.state = {
            StackState: [this.createStackItem(12), this.createStackItem(87), this.createStackItem(64)],
            lastOperation: {},
        }

        this.steps = {
            insertAtIndex: {
                title: `Insert Element at Index {index}`,
                steps: [
                    "Create a new Array with size {n}.",
                    "Copy all the elements from the old Array till index {index} to the new Array .",
                    "Insert the new element at index {index} of the new Array.",
                    "Copy all the elements from the old Array from index {index+1} till end to the new Array .",
                ]
            }
        }
    }

    createStackItem = (val) => {
        let bgcolors = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#FD7272"];
        let color = bgcolors[this.colorCounter % bgcolors.length];
        this.colorCounter++;
        return new StackItem(val, color);
    }

    clearStack = () => {
        this.setState({ StackState: [] });
    }
    pushElement = (val) => {
        if (this.state.StackState.length === 9) {
            alert("Cant create Stack with length more than 9");
            return;
        }
        if (val === "" || val === null) return;
        let stack = this.state.StackState;
        stack.push(this.createStackItem(val));
        this.setState({ StackState: stack });

    }
    peek() {
        return this.items[this.items.length - 1];
    }

    popElement = () => {
        if (Stack === null) {
            alert("Invalid Operation!!");
            return;
        }
        this.state.StackState.splice(-1);
        this.setState({ StackState: this.state.StackState });
    }

    createStack = () => {
        let size = prompt("Enter the size of the Stack");
        this.clearStack();
        if (size > 10) {
            alert("Cant create Stack with length more than 10");
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
                        <div className="col-6">
                            <div className='container canvas' style={{ height: "600px", width: "55%"}}>
                                {
                                    this.state.StackState.length > 0 ? (
                                        <table className='stack-table'>
                                            {this.state.StackState.reverse().map((item, index) => {
                                                return <tr><td className='stack-item' >
                                                    <div className='item-container' style={{ backgroundColor: item.color }}>
                                                        <div style={{ margin: "auto", position: "relative" }}>
                                                            <b>{item.val}</b>
                                                        </div>
                                                    </div>
                                                </td>
                                                </tr>
                                            })}
                                        </table>) : (<h4 style={{ margin: "auto auto" }}>Stack is Empty</h4>)
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row workspace" style={{ borderBottom: "4px solid black" }}>
                                <div className="d-flex justify-content-center m-3">
                                    <button type="button" className="btn btn-info me-3" onClick={() => {
                                        const val = prompt("Enter the value");
                                        this.pushElement(val)
                                    }}>Push Element in the Stack</button>
                                </div>
                                <div className="d-flex justify-content-center m-3">
                                    <button type="button" className="btn btn-warning me-3" onClick={() => { this.popElement(-1) }}>POP Element from the Stack</button>
                                </div>
                                <div className="d-flex justify-content-center m-3">
                                    <button type="button" className="btn btn-danger me-3" onClick={this.clearStack}>Clear Stack</button>
                                    <button type="button" className="btn btn-success me-3" onClick={this.peek}>Peek</button>
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
    constructor(val, color) {
        this.val = val;
        this.color = color;
    }
}

export default Stack;