import React from 'react'
import '../styles/Array.css'
import '../styles/styles.css'

class Array extends React.Component {
    constructor(props) {
        super(props)
        this.colorCounter = 0;
        this.state = {
            arrayState: [this.createQueueItem(12), this.createQueueItem(87), this.createQueueItem(64)],
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

    createQueueItem = (val) => {
        let bgcolors = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#FD7272"];
        let color = bgcolors[this.colorCounter % bgcolors.length];
        this.colorCounter++;
        return new QueueItem(val, color);
    }

    clearQueue = () => {
        this.setState({ arrayState: [] });
    }


    insertAtEnd = (val) => {
        if (val === "" || val === null) return;
        let arr = this.state.arrayState;
        arr.push(this.createQueueItem(val));
        this.setState({ arrayState: arr });
    }

    dequeue = (ind) => {
        /*if (!this.isValidIndex(ind)) {
            alert("Invalid Index");
            return;
        }*/
        this.state.arrayState.splice(0, 1);
        this.setState({ arrayState: this.state.arrayState });
    }

    insertAtIndex = (ind, val) => {
        if (!this.isValidIndex(ind)) {
            alert("Invalid Index " + ind);
            return;
        }
        if (this.state.arrayState.length === 20) {
            alert("Cant create array with length more than 20");
            return;
        }
        if (ind === "" || val === "" || ind === null || val === null) return;
        this.state.arrayState.splice(ind, 0, this.createArrayItem(val));
        let title = this.steps.insertAtIndex.title.replace('{index}', ind);
        let steps = this.steps.insertAtIndex.steps.map((stepstr, index) => {
            let step = stepstr.replace('{index}', ind);
            step = step.replace('{n}', this.state.arrayState.length);
            step = step.replace('{index+1}', ind + 1);
            return step;
        });
        this.setState({ arrayState: this.state.arrayState, lastOperation: { title: title, steps: steps } });
    }

    Enqueue = (val) => {
        if (val === "" || val === null) return;
        let arr = this.state.arrayState;
        arr.push(this.createQueueItem(val));
        this.setState({ arrayState: arr });
    }

    createQueue = () => {
        let size = prompt("Enter the size of the Queue");
        this.clearQueue();
        if (size > 20) {
            alert("Cant create Queue with length more than 20");
            return;
        }
        let arr = [];
        while (size--) {
            arr.push(this.QueueItem(0));
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
        return ind >= this.state.arrayState.length * -1 && ind < this.state.arrayState.length;
    }

    render() {
        return (
            <>
                <h2>Queue</h2>
                <div className='container canvas'>
                    {
                        this.state.arrayState.length > 0 ? (
                            <table className='array-table'>
                                <tr>
                                    {this.state.arrayState.map((item, index) => {
                                        return <td className='array-item' >
                                            <p style={{ margin: "0 0 0 0" }}>{index}</p>
                                            <div className='item-container' style={{ backgroundColor: item.color }}>
                                                <div style={{ margin: "auto", position: "relative" }}>
                                                    <b>{item.val}</b>
                                                </div>
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            </table>) : (<h4 style={{ margin: "auto auto" }}>Array is Empty</h4>)
                    }
                </div>
                <div class="row workspace">
                    <div class="col-7" style={{ borderRight: "4px solid black" }}>
                        <div class="d-flex justify-content-center m-3">
                            <button type="button" class="btn btn-info me-3" onClick={() => {
                                const val = prompt("Enter value : ")
                                this.insertAtEnd(val)}}>Enqueue</button>
                        </div>
                        <div class="d-flex justify-content-center m-3">
                            <button type="button" class="btn btn-warning me-3" onClick={() => { this.dequeue(0) }}>Dequeue</button>
                        </div>
                        <div class="d-flex justify-content-center m-3">
                            <button type="button" class="btn btn-primary me-3" onClick={this.changeVal}>Change Value at Index</button>
                            <button type="button" class="btn btn-danger me-3" onClick={this.clearArray}>Clear Array</button>
                            <button type="button" class="btn btn-success me-3" onClick={this.createArray}>Create Array</button>
                        </div>
                    </div>
                    <div class="col-sm">
                        {
                            !(Object.keys(this.state.lastOperation).length === 0) ? (
                                <>
                                    <b>Last Operation: {this.state.lastOperation.title}</b>
                                    <br/>
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

            </>
        )
    }
}

class QueueItem {
    constructor(val, color) {
        this.val = val;
        this.color = color;
    }
}

export default Array;