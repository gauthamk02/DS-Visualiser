import React from 'react'
import '../styles/Array.css'
import '../styles/styles.css'

class Queue extends React.Component {
    constructor(props) {
        super(props)
        this.colorCounter = 0;
        this.state = {
            QueueState: [this.createQueueItem(12), this.createQueueItem(87), this.createQueueItem(64)],
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
        this.setState({ QueueState: [] });
    }

    dequeue = (ind) => {
        if(this.state.QueueState.length===0){
            alert("Queue is Empty!!")
            return;
        }
        alert(`The Dequeued value is : ${this.state.QueueState[0].val}`)
        this.state.QueueState.splice(0, 1);
        this.setState({ QueueState: this.state.QueueState , lastOperation : QueueSteps.dequeue(this.state.QueueState.length) });
    }

    
 
    Enqueue = (val) => {

        if (val === "" || val === null) return;
        if(this.state.QueueState.length===10){
            alert("Cant Create Queue with more than 10 values")
            return;
        }
        let arr = this.state.QueueState;
        arr.push(this.createQueueItem(val));
        this.setState({ QueueState: arr , lastOperation : QueueSteps.Enqueue(this.state.QueueState.length)});
        
    }

    peek = () => {
        if(this.state.QueueState.length===0){
            alert("Queue is Empty!!")
            return;
        }
        alert(`Peek Value is : ${this.state.QueueState[0].val}`)
        return;
    }
    
    Length = () => {
        alert(`The Length of Queue is : ${this.state.QueueState.length}`)
        return;
    }

    render() {
        return (
            <>
                <h2>Queue</h2>
                <div className='container canvas'>
                    {
                        this.state.QueueState.length > 0 ? (
                            <table className='array-table'>
                                <tr>
                                    <td style={{paddingRight: '10px'}}><h5>Front</h5></td>
                                    {this.state.QueueState.map((item, index) => {
                                        return <td className='array-item' >
                                            {/* <p style={{ margin: "0 0 0 0" }}>{index}</p> */}
                                            <div className='item-container' style={{ backgroundColor: item.color }}>
                                                <div style={{ margin: "auto", position: "relative" }}>
                                                    <b>{item.val}</b>
                                                </div>
                                            </div>
                                        </td>
                                    })}
                                    <td style={{paddingLeft: '10px'}}><h5>Rear</h5></td>
                                </tr>
                            </table>) : (<h4 style={{ margin: "auto auto" }}>Queue is Empty</h4>)
                    }
                </div>
                <div class="row workspace">
                    <div class="col-7" style={{ borderRight: "4px solid black" }}>
                        <div class="d-flex justify-content-center m-3">
                            <button type="button" class="btn btn-info me-3" onClick={() => {
                                const val = prompt("Enter value : ")
                                this.Enqueue(val)}}>Enqueue</button>
                            <button type="button" class="btn btn-warning me-3" onClick={() => { this.dequeue(0) }}>Dequeue</button>
                            <button type="button" class="btn btn-dark" onClick={() => { this.peek() }}>Peek</button>

                        </div> 
                        <div class="d-flex justify-content-center m-3">
                            <button type="button" class="btn btn-danger me-3" onClick={() => {this.clearQueue()}}>Clear Queue</button>
                            <button type="button" class="btn btn-secondary" onClick={() => { this.Length() }}>Length</button>
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
export default Queue;

class QueueSteps{
    static Enqueue(length){
        return {
            title: `Enqueue`,
            steps: [
                `Create a new Queue with size ${length}.`,
                `Copy all the elements from the old Queue to the new Queue.`,
                `Insert the new element to position ${length - 1} of the new Queue.`,
            ]
        }

    }
    static dequeue(length){
        return {
            title: `Dequeue`,
            steps: [
              `Checks if the Queue is empty.`,
              `If the Queue is empty, produces an error and exit.`,
              `If the Queue is not empty, proceeds to remove the data element at which front is pointing.`,
              `Decreases the value of rear by 1.`
            ]
        }

    }
    static peek(){
        return {
            title: `Front element Displayed`,
            steps: [
              `Checks if the stack is empty.`,
              `If the stack is empty, produces an error and exit.`,
              `If the stack is not empty, accesses the data element at which top is pointing.`,
              `Decreases the value of top by 1.`
            ]
        }
    }
}