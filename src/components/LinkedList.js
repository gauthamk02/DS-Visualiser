import React from "react";
import "../styles/Array.css";
import "../styles/styles.css";
import Arrow from "./Arrow";

class LinkedList extends React.Component {
  constructor(props) {
    super(props);
    this.colorCounter = 0;
    this.state = {
      listState: [
        this.createListItem(12),
        this.createListItem(87),
        this.createListItem(64),
      ],
      lastOperation: {},
    };
  }

  createListItem = (val) => {
    let bgcolors = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#FD7272"];
    let color = bgcolors[this.colorCounter % bgcolors.length];
    this.colorCounter++;
    return new ListItem(val, color);
  };

  clearArray = () => {
    this.setState({ listState: [], lastOperaion: LinkedSteps.clearArray() });
  };

  deleteAtIndex = (ind, steps) => {
    if (!this.isValidIndex(ind)) {
      alert("Invalid Index");
      return;
    }
    this.state.listState.splice(ind, 1);
    this.setState({ listState: this.state.listState, lastOperation: steps });
  
  };

  insertAtIndex = (ind, val, steps) => {
    if (!this.isValidIndex(ind)) {
      alert("Invalid Index " + ind);
      return;
    }
   

    if (ind === "" || val === "" || ind === null || val === null) return;
    this.state.listState.splice(ind, 0, this.createListItem(val));
    this.setState({ listState: this.state.listState, lastOperation: steps });
  };

  insertAtEnd = (val) => {
    if (val === "" || val === null) return;
    let arr = this.state.listState;
    arr.push(this.createListItem(val));

    this.setState({
      listState: arr,
      lastOperation: LinkedSteps.insertAtEnd(this.state.listState.length),
    });
  };

  createArray = () => {
    let size = prompt("Enter the size of the array");
    this.clearArray();
    if (size > 20) {
      alert("Cant create array with length more than 20");
      return;
    }
    let arr = [];
    while (size--) {
      arr.push(this.createListItem(0));
    }
    this.setState({ listState: arr });
  };

  changeVal = () => {
    let ind = prompt("Enter the index of the array");
    let val = prompt("Enter the value of the array");
    if (!this.isValidIndex(ind)) {
      alert("Invalid Index " + ind);
      return;
    }
    let arr = this.state.listState;
    arr[ind].val = val;
    this.setState({ listState: arr });
  };

  isValidIndex = (ind) => {
    return (
      ind >= this.state.listState.length * -1 ||
      ind < this.state.listState.length
    );
  };

  render() {
    return (
      <>
        <h2>Linked List</h2>
        <div className="container canvas">
          {this.state.listState.length > 0 ? (
            <table className="array-table">
              <tbody>
                <tr>
                  <td key={-1} style={{ paddingRight: '10px' }}><b>Head</b></td>
                  {this.state.listState.map((item, index) => {
                    return (
                      <>
                        <td className="array-item">
                          <div
                            className="item-container"
                            style={{ backgroundColor: item.color }}
                          >
                            <div style={{ margin: "auto" }}>
                              <b>{item.val}</b>
                            </div>
                          </div>
                        </td>
                        <td>
                          {index < this.state.listState.length - 1 ? (
                            <Arrow />
                          ) : (
                            ""
                          )}
                        </td>
                      </>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          ) : (
            <h4 style={{ margin: "auto auto" }}>List is Empty</h4>
          )}
        </div>
        <div className="row workspace">
          <div className="col-7" style={{ borderRight: "4px solid black" }}>
            <div className="d-flex justify-content-center m-3">
              <button
                type="button"
                className="btn btn-info me-3"
                onClick={() => {
                  const ind = prompt("Enter the Index");
                  const val = prompt("Enter the value");
                  this.insertAtIndex(
                    ind,
                    val,
                    LinkedSteps.insertAtIndex(
                      ind, this.state.listState.length - 1
                    )
                  );
                }}
              >
                Insert Element at Index
              </button>
              <button
                type="button"
                className="btn btn-info me-3"
                onClick={() => {
                  const val = prompt("Enter the value");
                  this.insertAtIndex(
                    0,
                    val,
                    LinkedSteps.insertAtBeginning(
                      val
                    )
                  );
                }}
              >
                Insert Element at Beginning
              </button>
              <button
                type="button"
                className="btn btn-info me-3"
                onClick={() => {
                  const val = prompt("Enter the value");
                  this.insertAtEnd(val);
                }}
              >
                Insert Element at End
              </button>
            </div>
            <div className="d-flex justify-content-center m-3">
              <button
                type="button"
                className="btn btn-warning me-3"
                onClick={() => {
                  this.deleteAtIndex(
                    0,
                    LinkedSteps.deleteAtBeginning(

                    )
                  );
                }}
              >
                Delete Element from Start
              </button>
              <button
                type="button"
                className="btn btn-warning me-3"
                onClick={() => {
                  this.deleteAtIndex(
                    -1,
                    LinkedSteps.deleteAtEnd(this.state.listState.length - 1)
                  );
                }}
              >
                Delete Element from End
              </button>
              <button
                type="button"
                className="btn btn-warning me-3"
                onClick={() => {
                  const ind = prompt("Enter the Index");
                  this.deleteAtIndex(
                    ind,
                    LinkedSteps.deleteAtIndex(
                      ind
                    )
                  );
                }}
              >
                Delete Element at Index
              </button>
            </div>
            <div className="d-flex justify-content-center m-3">

              <button
                type="button"
                className="btn btn-danger me-3"
                onClick={this.clearArray}
              >
                Clear Linked List
              </button>

            </div>
          </div>
          <div className="col-sm">
            {!(Object.keys(this.state.lastOperation).length === 0) ? (
              <>
                <b>Last Operation: {this.state.lastOperation.title}</b>
                {this.state.lastOperation.steps.length === 0 ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <b>Steps:</b>
                    <ol className="step-ol">
                      {this.state.lastOperation.steps.map((step, index) => {
                        return (
                          <li key={index} className="step-li">
                            {step}
                          </li>
                        );
                      })}
                    </ol>
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

class ListItem {
  constructor(val, color) {
    this.val = val;
    this.color = color;
  }
}

export default LinkedList;

class LinkedSteps {
  static insertAtIndex(val, index) {
    return {
      title: `Insert Element at Index ${index}`,
      steps: [
        ` Allocate memory for new node `,
        ` Store the data ${val} to the new node.`,
        ` Traverse through the list to position-${index-1}) `,
        ` Set the next pointer of new node to the next of current node`,
        ` Set the current node's next pointer to point to the new node `,

      ],
    };
  }

  static insertAtBeginning(val) {
    return {
      title: `Insert Element at Beginning`,
      steps: [
        ` Allocate memory for new node.`,
        ` Store the data: ${val} `,
        ` Change the next of new node to point to head.`,
        ` Change head to point to recently created node.`

      ],
    };
  }

  static insertAtEnd(size) {
    return {
      title: `Insert Element at End`,
      steps: [
        `Allocate memory for new node`,
        `Store data`,
        `Traverse till the last node: ${size - 1}th node `,
        `Change next of last node to recently created node`,
        `Set the next pointer of new node to null`

      ],
    };
  }

  static deleteAtIndex(index) {
    return {
      title: `Delete Element at Index ${index}`,
      steps: [
        `Check whether there are elements in the list`,
        `Traverse to element at index-${index-1}`,
        `Set the next pointer of current node to point to next of the node to be deleted`,
      ],
    };
  }

  static deleteAtBeginning() {
    return {
      title: `Delete Element from Start`,
      steps: [
        `Check if list is empty`,
        `Point head to the next of the first node`,
      ],
    };
  }

  static deleteAtEnd(size) {
    return {
      title: `Delete Element from End`,
      steps: [
        `Traverse to the element at index ${size-1}.`,
        `Change it's next pointer to null`,

      ],
    };
  }

  //TODO: Add setps for change value at index

  static clearArray() {
    return {
      title: `Clear Array`,
      steps: [],
    };
  }

}