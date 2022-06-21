import React from 'react'
import '../styles/Array.css'

class Array extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayState: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        }
    }

    addElement = () => {

    }

    clearArray = () => {
        this.setState({ arrayState: [] });
    }

    deleteAtIndex = (ind) => {
        this.state.arrayState.splice(ind, 1);
        this.setState({ arrayState: this.state.arrayState });
    }

    insertAtIndex = (ind, val) => {
        this.state.arrayState.splice(ind, 0, val);
        this.setState({ arrayState: this.state.arrayState });
    }

    render() {
        return (
            <>
                {
                    this.state.arrayState.map((item, index) => {
                        console.log(this.state.arrayState);

                        return <div className='card'>
                            <div className='card-child' style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }} >
                                {item}
                            </div>
                        </div>
                    }
                    )
                }
                <br></br>
                <br></br>
                <br></br>

                <button type="button" class="btn btn-info me-3" onClick={() => {
                    const ind = prompt("Enter the Index");
                    const val = prompt("Enter the value");
                    this.insertAtIndex(ind, val)
                }}>Insert Element at Index</button>
                <button type="button" class="btn btn-info me-3" onClick={() => {
                    const val = prompt("Enter the value");
                    this.insertAtIndex(0, val)
                }}>Insert Element at Beginning</button>
                <button type="button" class="btn btn-info me-3" onClick={() => {
                    const val = prompt("Enter the value");
                    this.insertAtIndex(-1, val)
                }}>Insert Element at End</button>
                <br></br>
                <br></br>
                <button type="button" class="btn btn-warning me-3" onClick={() => { this.deleteAtIndex(0) }}>Delete Element from Start</button>
                <button type="button" class="btn btn-warning me-3" onClick={() => { this.deleteAtIndex(-1) }}>Delete Element from End</button>
                <button type="button" class="btn btn-warning me-3" onClick={() => {
                    const ind = prompt("Enter the Index");
                    this.deleteAtIndex(ind)
                }}>Delete Element at Index</button>
                <br></br>
                <br></br>
                <button type="button" class="btn btn-danger me-3" onClick={this.clearArray}>Clear Array</button>
            </>
        )
    }
}

export default Array;