import React from "react";
import "../styles/styles.css";
import "../styles/Tree.css";

import { BinarySearchTree, useBinarySearchTree } from "react-tree-vis";
// import { useState } from 'react'

export default function Tree() {
  const {
    ref,
    insert,
    remove,
    search,
    getData,
    clear,
    balance,
    generateRandomTree,
    checkTreeType,
  } = useBinarySearchTree();

  const treeStyle = {
    lineColor: "red",
    // lineWidth
    // nodeRadius: 10,
  };
  return (
    <>
      <div>
        <h2>Binary Search Tree</h2>
        <div className="container tree-canvas">
          <BinarySearchTree data={[2, 1, 3]} ref={ref} treeStyles={treeStyle} />
        </div>
        <div className="row workspace">
          <div className="d-flex justify-content-center m-3">
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                let val = prompt("Enter value to insert:");
                if (!val) {
                  alert("Invalid Input");
                  return;
                }
                insert(val);
              }}
            >
              Insert{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                let val = prompt("Enter value to remove:");
                if (!val) {
                  alert("Invalid Input");
                  return;
                }
                remove(val);
              }}
            >
              Remove{" "}
            </button>
            {/* use the getData function */}
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                let val = getData('inorder');
                alert(val);
              }}
            >
              Get Data{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                clear();
              }}
            >
              Clear{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                balance();
              }}
            >
              Balance{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                generateRandomTree(10);
              }}
            >
              Generate Random Tree{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                checkTreeType();
              }}
            >
              Check Tree Type{" "}
            </button>

            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                let val = prompt("Enter value to remove:");
                if (!val) {
                  alert("Invalid Input");
                  return;
                }
                search(parseInt(val));
              }}
            >
              Search{" "}
            </button>
            {/* display the check tree types output on the screen */}
            {/* <div className="output">
                <p>{checkTreeType()}</p>
            </div> */}
            

            {/* <div className="output">
                <p>{checkTreeType()}</p>
                </div> */}  

                
          </div>
        </div>
      </div>
    </>
  );
}
