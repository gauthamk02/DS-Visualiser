import React from 'react'
import '../styles/Array.css'
import '../styles/styles.css'

class Array extends React.Component {
    constructor(props) {
        super(props)
        this.colorCounter = 0;
        this.state = {
            prevArrayState: [],
            arrayState: [this.createArrayItem(12), this.createArrayItem(87), this.createArrayItem(64)],
            lastOperation: {},
        }
    }

    createArrayItem = (val) => {
        let bgcolors = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#FD7272"];
        let color = bgcolors[this.colorCounter % bgcolors.length];
        this.colorCounter++;
        return new ArrayItem(val, color);
    }

    setPrevArrayState() {
        this.setState({
            prevArrayState: [...this.state.arrayState],
        })
    }

    clearArray = () => {
        this.setPrevArrayState();
        this.setState({ arrayState: [], lastOperaion: ArraySteps.clearArray() });
    }

    deleteAtIndex = (ind, steps) => {
        if (!this.isValidIndex(ind)) {
            alert("Invalid Index");
            return;
        }
        this.setPrevArrayState();
        this.state.arrayState.splice(ind, 1);
        this.setState({ arrayState: this.state.arrayState, lastOperation: steps });
    }

    insertAtIndex = (ind, val, steps) => {
        if (!this.isValidIndex(ind)) {
            alert("Invalid Index " + ind);
            return;
        }
        if (this.state.arrayState.length === 20) {
            alert("Cant create array with length more than 20");
            return;
        }
        if (ind === "" || val === "" || ind === null || val === null) return;
        this.setPrevArrayState();
        this.state.arrayState.splice(ind, 0, this.createArrayItem(val));
        this.setState({ arrayState: this.state.arrayState, lastOperation: steps });
    }

    insertAtEnd = (val) => {
        if (val === "" || val === null) return;
        let arr = this.state.arrayState;
        arr.push(this.createArrayItem(val));
        this.setPrevArrayState();
        this.setState({ arrayState: arr, lastOperation: ArraySteps.insertAtEnd(this.state.arrayState.length) });
    }

    createArray = () => {
        let size = prompt("Enter the size of the array");
        this.clearArray();
        if (size > 20) {
            alert("Cant create array with length more than 20");
            return;
        }
        let arr = [];
        while (size--) {
            arr.push(this.createArrayItem(0));
        }
        this.setState({ arrayState: arr });
    }

    changeVal = () => {
        let ind = prompt("Enter the index of the array");
        let val = prompt("Enter the value of the array");
        if (!this.isValidIndex(ind)) {
            alert("Invalid Index " + ind);
            return;
        }
        let arr = this.state.arrayState;
        arr[ind].val = val;
        this.setState({ arrayState: arr });
    }

    isValidIndex = (ind) => {
        return ind >= this.state.arrayState.length * -1 && ind < this.state.arrayState.length 
            && ind !== null && ind !== "" && ind !== undefined;
    }

    render() {
        return (
            <>
                <h2>Array</h2>
                <div className='container canvas'>
                    {
                        this.state.arrayState.length > 0 ? (
                            <table className='array-table'>
                                <tbody>
                                    <tr style={{alignContent: 'center'}}>
                                        {this.state.prevArrayState.map((item, index) => {
                                            return <td key={index} className='prev-array-item' >
                                                <p style={{ margin: "0 0 0 0" }}>{index}</p>
                                                <div className='item-container' style={{ backgroundColor: item.color }}>
                                                    <div style={{ margin: "auto", position: "relative" }}>
                                                        <b>{item.val}</b>
                                                    </div>
                                                </div>
                                            </td>
                                        })}
                                    </tr>
                                    <tr>
                                        {this.state.arrayState.map((item, index) => {
                                            return <td key={index} className='array-item' >
                                                <p style={{ margin: "0 0 0 0" }}>{index}</p>
                                                <div className='item-container' style={{ backgroundColor: item.color }}>
                                                    <div style={{ margin: "auto", position: "relative" }}>
                                                        <b>{item.val}</b>
                                                    </div>
                                                </div>
                                            </td>
                                        })}
                                    </tr>
                                </tbody>
                            </table>) : (<h4 style={{ margin: "auto auto" }}>Array is Empty</h4>)
                    }
                </div>
                <div className="row workspace">
                    <div className="col-7" style={{ borderRight: "4px solid black" }}>
                        <div className="d-flex justify-content-center m-3">
                            <button type="button" className="btn btn-info me-3" onClick={() => {
                                const ind = prompt("Enter the Index");
                                if(ind === "" || ind === null) {
                                    alert("Invalid Index");
                                    return;
                                };
                                const val = prompt("Enter the value");
                                this.insertAtIndex(ind, val, ArraySteps.insertAtIndex(ind, this.state.arrayState.length + 1))
                            }}>Insert Element at Index</button>
                            <button type="button" className="btn btn-info me-3" onClick={() => {
                                const val = prompt("Enter the value");
                                this.insertAtIndex(0, val, ArraySteps.insertAtBeginning(this.state.arrayState.length + 1))
                            }}>Insert Element at Beginning</button>
                            <button type="button" className="btn btn-info me-3" onClick={() => {
                                const val = prompt("Enter the value");
                                this.insertAtEnd(val)
                            }}>Insert Element at End</button>
                        </div>
                        <div className="d-flex justify-content-center m-3">
                            <button type="button" className="btn btn-warning me-3" onClick={() => {
                                this.deleteAtIndex(0, ArraySteps.deleteAtBeginning(this.state.arrayState.length - 1))
                            }}>Delete Element from Start</button>
                            <button type="button" className="btn btn-warning me-3" onClick={() => {
                                this.deleteAtIndex(-1, ArraySteps.deleteAtEnd(this.state.arrayState.length - 1))
                            }}>Delete Element from End</button>
                            <button type="button" className="btn btn-warning me-3" onClick={() => {
                                const ind = prompt("Enter the Index");
                                this.deleteAtIndex(ind, ArraySteps.deleteAtIndex(ind, this.state.arrayState.length - 1))
                            }}>Delete Element at Index</button>
                        </div>
                        <div className="d-flex justify-content-center m-3">
                            <button type="button" className="btn btn-primary me-3" onClick={this.changeVal}>Change Value at Index</button>
                            <button type="button" className="btn btn-danger me-3" onClick={this.clearArray}>Clear Array</button>
                            <button type="button" className="btn btn-success me-3" onClick={this.createArray}>Create Array</button>
                        </div>
                    </div>
                    <div className="col-sm">
                        {
                            !(Object.keys(this.state.lastOperation).length === 0) ? (
                                <>
                                    <b>Last Operation: {this.state.lastOperation.title}</b>
                                    {
                                        (this.state.lastOperation.steps.length === 0) ? "" :
                                            (<> <b>Steps:</b>
                                                <ol className="step-ol" >
                                                    {this.state.lastOperation.steps.map((step, index) => {
                                                        return <li key={index} className="step-li">{step}</li>;
                                                    })}
                                                </ol>
                                            </>
                                            )
                                    }
                                </>
                            ) : ""
                        }
                    </div>
                </div>

            </>
        )
    }
}

class ArrayItem {
    constructor(val, color) {
        this.val = val;
        this.color = color;
    }
}

export default Array;

class ArraySteps {
    static insertAtIndex(index, size) {
        return {
            title: `Insert Element at Index ${index}`,
            steps: [
                `Create a new Array with size ${size}.`,
                `Copy all the elements from the old Array till index ${index} to the new Array .`,
                `Insert the new element at index ${index} of the new Array.`,
                `Copy all the elements from the old Array from index ${index} till end to the new Array .`,
            ]
        }
    }

    static insertAtBeginning(size) {
        return {
            title: `Insert Element at Beginning`,
            steps: [
                `Create a new Array with size ${size}.`,
                `Insert the new element to position 0 of the new Array.`,
                `Copy all the elements from the old Array to the new Array from index 1.`,
            ]
        }
    }

    static insertAtEnd(size) {
        return {
            title: `Insert Element at End`,
            steps: [
                `Create a new Array with size ${size}.`,
                `Copy all the elements from the old Array to the new Array.`,
                `Insert the new element to position ${size - 1} of the new Array.`,
            ]
        }
    }

    static deleteAtIndex(index, size) {
        return {
            title: `Delete Element at Index ${index}`,
            steps: [
                `Create a new Array with size ${size}.`,
                `Copy all the elements from the old Array till index ${index} to the new Array .`,
                `Skip the element at index {index} of the old Array.`,
                `Copy all the elements from the old Array from index ${index + 1} till end to the new Array .`,
            ]
        }
    }

    static deleteAtBeginning(size) {
        return {
            title: `Delete Element from Start`,
            steps: [
                `Create a new Array with size ${size}.`,
                `Skip the element at index 0 of the old Array.`,
                `Copy all the elements from the old Array from index 1 till end to the new Array .`,
            ]
        }
    }

    static deleteAtEnd(size) {
        return {
            title: `Delete Element from End`,
            steps: [
                `Create a new Array with size ${size}.`,
                `Copy all the elements from index 0 of the old Array till index ${size - 1} to the new Array.`,
            ]
        }
    }

    //TODO: Add setps for change value at index

    static clearArray() {
        return {
            title: `Clear Array`,
            steps: []
        }
    }

    static createArray(size) {
        return {
            title: `Create Array with size ${size}`,
            steps: [
                `Create a new Array with size ${size}.`,
            ]
        }
    }
}
