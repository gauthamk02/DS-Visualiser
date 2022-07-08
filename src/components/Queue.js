import React from 'react'
import '../styles/Queue.css'
import '../styles/styles.css'

class Queue extends React.Component {
    constructor(props) {
        super(props)
        this.maxQueueSize = 12;
        this.colorCounter = 0;
        this.state = {
            QueueState: this.createInitialQueue(this.maxQueueSize),
            front: 0,
            rear: 2,
            lastOperation: {},
        }
    }

    createInitialQueue = (n) => {
        let queue = [];

        for (let i = 0; i < 3; i++) {
            queue.push(this.createQueueItem(Math.floor(Math.random() * 50), i, true));
        }

        this.rear = queue.length - 1;

        for (let i = 3; i < n; i++) {
            queue.push(this.createQueueItem('-', i, false));
        }
        return queue;
    }

    makeNewQueue = () => {

        let n = prompt("Enter size of the new queue : ");
        if (n === null || n === '' || n === undefined) {
            alert("Invalid input");
            return;
        }
        if (n > this.maxQueueSize) {
            alert("Queue size cannot be greater than " + this.maxQueueSize);
            return;
        }

        let queue = [];
        for (let i = 0; i < n; i++) {
            queue.push(this.createQueueItem('-', i, false));
        }

        this.setState({ QueueState: queue, lastOperation: QueueSteps.createQueue(n), front: -1, rear: -1 });
    }

    createQueueItem = (val, index, isActive = true) => {
        let bgcolors = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#FD7272"];

        let color = bgcolors[this.colorCounter % bgcolors.length];
        if (isActive) this.colorCounter++;
        return new QueueItem(val, color, index, isActive);
    }

    clearQueue = () => {
        this.setState({ QueueState: [], lastOperation: QueueSteps.clearQueue(), front: -1, rear: -1 });
    }

    dequeue = () => {
        if (this.state.front === this.state.QueueState.length) {
            alert("Queue is Empty!!")
            return;
        }
        if (this.state.front === -1 && this.state.rear === -1) {
            alert("Queue is Empty!!")
            return;
        }
        alert(`The Dequeued value is : ${this.state.QueueState[this.state.front].val}`)

        let queue = this.state.QueueState;
        queue[this.state.front].isActive = false;

        if (this.state.front === this.state.rear) {
            this.setState({ QueueState: queue, lastOperation: QueueSteps.dequeue(), front: -1, rear: -1 });
        }
        else {
            this.setState({
                QueueState: queue,
                lastOperation: QueueSteps.dequeue(this.state.QueueState.length),
                front: this.state.front + 1,
            });
        }
    }

    enqueue = (val) => {

        if (val === "" || val === null) return;
        if (this.state.QueueState.length === 10) {
            alert("Cant Create Queue with more than 10 values")
            return;
        }
        if (this.state.rear === this.state.QueueState.length - 1) {
            alert("Queue is Full!!")
            return;
        }

        let queue = this.state.QueueState;
        queue[this.state.rear + 1] = this.createQueueItem(val, this.state.rear + 1, true);
        if(this.state.front === -1) this.setState({ front: 0 });
        this.setState({ QueueState: queue, lastOperation: QueueSteps.Enqueue(this.state.QueueState.length), rear: this.state.rear + 1 });

    }

    peek = () => {
        if (this.state.QueueState.length === 0) {
            alert("Queue is Empty!!")
            return;
        }
        if (this.state.front === this.state.QueueState.length) {
            alert("Queue is Empty!!")
            return;
        }
        alert(`Peek Value is : ${this.state.QueueState[this.state.front].val}`)
        this.setState({ QueueState: this.state.QueueState, lastOperation: QueueSteps.peek() })
        return;
    }

    length = () => {
        alert(`The Length of Queue is : ${this.state.rear - this.state.front + 1}`)
        return;
    }

    render() {
        return (
            <>
                <h2>Queue</h2>
                <div className='container canvas'>
                    {
                        this.state.QueueState.length > 0 ? (
                            <table className='queue-table'>
                                <tbody>
                                    <tr>
                                        {/* <td style={{ paddingRight: '10px' }}><h5>Front</h5></td> */}
                                        {
                                            this.state.QueueState.map((item, index) => {
                                                if (!item.isActive) item.color = 'rgba(194, 189, 189, 0.315)';
                                                return (
                                                    <>
                                                        <td key={index} className={item.isActive ? 'active-queue-item' : 'passive-queue-item'} >
                                                            <p style={{ margin: "0 0 0 0" }}>{item.index}</p>
                                                            <div className='item-container' style={{ backgroundColor: item.color }} >
                                                                <div style={{ margin: "auto", position: "relative" }}>
                                                                    <b>{item.val}</b>
                                                                </div>
                                                            </div>
                                                            <p className='trans' style={{ margin: "0 0 0 0" }}>{index === this.state.front ? 'Front' : ' -\n'}</p>
                                                            <p className='trans' style={{ margin: "0 0 0 0" }}>{index === this.state.rear ? 'Rear' : ' -\n'}</p>
                                                        </td>
                                                    </>
                                                )
                                            })
                                        }
                                    </tr>
                                </tbody>
                            </table>) : (<h4 style={{ margin: "auto auto" }}>Queue is Empty</h4>)
                    }
                    <div className='row' style={{ margin: 'auto auto 10px 10px' }}>
                        <div className="col" style={{ color: 'green', width: '100px' }}>
                            <b>{`Front: ${this.state.front}`}</b>
                        </div>
                        <div className="col" style={{ color: 'orange' }}>
                            <b>{`Rear: ${this.state.rear}`}</b>
                        </div>
                    </div>
                </div>
                <div className="row workspace">
                    <div className="col-7" style={{ borderRight: "4px solid black" }}>
                        <div className="d-flex justify-content-center m-3">
                            <button type="button" className="btn btn-info me-3" onClick={() => {
                                const val = prompt("Enter value : ")
                                this.enqueue(val)
                            }}>Enqueue</button>
                            <button type="button" className="btn btn-warning me-3" onClick={() => { this.dequeue(0) }}>Dequeue</button>
                            <button type="button" className="btn btn-dark" onClick={() => { this.peek() }}>Peek</button>

                        </div>
                        <div className="d-flex justify-content-center m-3">
                            <button type="button" className="btn btn-danger me-3" onClick={() => { this.clearQueue() }}>Clear Queue</button>
                            <button type="button" className="btn btn-secondary me-3" onClick={() => { this.length() }}>Length</button>
                            <button type="button" className="btn btn-success me-3" onClick={this.makeNewQueue}>Create Queue</button>
                        </div>
                    </div>
                    <div className="col-sm">
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

            </>
        )
    }
}

class QueueItem {
    constructor(val, color, index, isActive) {
        this.val = val;
        this.color = color;
        this.index = index;
        this.isActive = isActive;
    }
}

export default Queue;

class QueueSteps {
    static Enqueue(length) {
        return {
            title: `Enqueue`,
            steps: [
                'Checks if Queue is full',
                'if Queue is full, produces an error and exit.',
                `if Queue is not full, Adds a New element at rear + 1 index`,
                `Increments the rear pointer by 1.`,
            ]
        }

    }
    static dequeue(length) {
        return {
            title: `Dequeue`,
            steps: [
                `Checks if the Queue is empty.`,
                `If the Queue is empty, produces an error and exit.`,
                `If the Queue is not empty, proceeds to remove the data element at which front is pointing.`,
                `Increases the front pointer by 1.`
            ]
        }

    }
    static peek() {
        return {
            title: `Front element Displayed`,
            steps: [
                `Checks if the Queue is empty.`,
                `If the Queue is empty, produces an error and exit.`,
                `If the Queue is not empty, accesses the data element at which rear pointing.`
            ]
        }
    }

    static clearQueue() {
        return {
            title: `Clear Queue`,
            steps: []
        }
    }

    static createQueue(size) {
        return {
            title: `Create Queue with size ${size}`,
            steps: [
                `Allocate an array with size ${size}.`,
                'Initialise front and rear pointers as -1.'
            ]
        }
    }
}