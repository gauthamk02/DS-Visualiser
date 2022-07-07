import React from 'react'
import '../styles/styles.css'
import '../styles/Sort.css'

class Sort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: this.createArray(),
        }

        this.stepTime = 100;
        this.speedMapping = { '1': 50, '2': 25, '3': 10, '4': 5, '5': 1, '6': 0.1 };
        this.skip = false;
    }

    createArray() {
        let vals = this.shuffle(Array.from(Array(100).keys()));
        let array = [];
        for (let i = 0; i < vals.length; i++) {
            array.push(new Bar(i, vals[i], false));
        }
        return array;
    }

    setActive(indarr) {
        let arr = this.state.array;
        for (let i = 0; i < arr.length; i++) {
            arr[i].isSelected = false;
        }
        for (let i = 0; i < indarr.length; i++) {
            arr[indarr[i]].isSelected = true;
        }
        this.setState({ array: arr });
    }

    shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    async merge(left, right) {
        let arr = []
        // Break out of loop if any one of the array gets empty
        while (left.length && right.length) {
            // Pick the smaller among the smallest element of left and right sub arrays 
            
            if (left[0].height < right[0].height) {
                arr.push(left.shift())
            } else {
                arr.push(right.shift())
            }
        }

        // Concatenating the leftover elements
        // (in case we didn't go through the entire left or right array)
        return [...arr, ...left, ...right]
    }

    async mergeSort(array) {
        const half = array.length / 2

        // Base case or terminating case
        if (array.length < 2) {
            return array
        }

        const left = array.splice(0, half)
        return  await this.merge(this.mergeSort(left), this.mergeSort(array))
    }

    async bblSort() {
        this.skip = false;
        let arr = this.state.array;
        for (var i = 0; i < arr.length; i++) {
 
            for (var j = 0; j < (arr.length - i - 1); j++) {

                arr[j].isSelected = true;
                arr[j + 1].isSelected = true;
                this.setState({ array: arr });

                if (arr[j].height > arr[j + 1].height) {

                    if(!this.skip) await sleep(this.stepTime);

                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp

                    this.setState({ array: arr });
                }
                if(!this.skip) await sleep(this.stepTime);
                arr[j].isSelected = false;
                arr[j + 1].isSelected = false;
            }
        }
        this.setState({ array: arr });
        this.skip = false;
    }

    render() {
        return (
            <>
                <h2>Sorting Algorithms</h2>
                <div className='container sort-canvas'>
                    <div className='bars'>
                        {
                            this.state.array.map((bar, index) => {
                                return (
                                    <>
                                        <div key={bar.key} className={bar.isSelected ? 'bar-selected' : 'bar'} style={{ height: `${4 * bar.height + 5}px` }} />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row workspace">
                    <div className="d-flex justify-content-end">
                        <div className='me-3'>
                            <b>Speed</b>
                        </div>
                        <select className='me-3' onChange={(e) => {
                            this.stepTime = this.speedMapping[e.target.value];
                            console.log(this.stepTime);
                        }}>
                            {
                                Object.keys(this.speedMapping).map((key, index) => {
                                    return (
                                        <option key={index} value={key}>{key}</option>
                                    )
                                })
                            }
                        </select>
                        <button type="button" className="btn btn-danger me-3" onClick={() => { this.skip = true }}>
                            Skip
                        </button>
                    </div>
                    <div className="d-flex justify-content-center m-3">
                        <button type="button" className="btn btn-info me-3" onClick={() => { this.bblSort() }}>
                            Bubble Sort
                        </button>
                        {/* <button type="button" className="btn btn-info me-3" onClick={() => { 
                            let arr = this.mergeSort([...this.state.array]);
                            this.setState({array: arr}) }}>
                            Merge Sort
                        </button> */}
                        <button type="button" className="btn btn-success me-3" onClick={() => { this.setState({ array: this.createArray() }) }}>New Array</button>
                    </div>
                </div>

            </>
        )
    }
}

class Bar {
    constructor(key, height, isSelected) {
        this.key = key;
        this.height = height;
        this.isSelected = isSelected;
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default Sort;