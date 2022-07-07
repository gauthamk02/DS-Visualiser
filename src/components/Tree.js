import React from "react";
import "../styles/styles.css";
import "../styles/Tree.css";

import { BinarySearchTree, useBinarySearchTree } from "react-tree-vis";
import { useState } from 'react'

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

  const [inorder, setInorder] = useState('1, 2, 3');
  const [preorder, setPreorder] = useState('2, 1, 3');
  const [postorder, setPostorder] = useState('1, 3, 2');
  const [treeType, setTreeType] = useState('Balanced');

  const treeStyle = {
    lineColor: "red",
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
                setInorder(getData('inorder').join(', '));
                setPreorder(getData('preorder').join(', '));
                setPostorder(getData('postorder').join(', '));
                setTreeType(checkTreeType().join(', '));
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
                setInorder(getData('inorder').join(', '));
                setPreorder(getData('preorder').join(', '));
                setPostorder(getData('postorder').join(', '));
                setTreeType(checkTreeType().join(', '));
              }}
            >
              Remove{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                clear();
                setInorder(' ');
                setPreorder(' ');
                setPostorder(' ');
                setTreeType(checkTreeType().join(', '));
              }}
            >
              Clear{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                balance();
                setInorder(getData('inorder').join(', '));
                setPreorder(getData('preorder').join(', '));
                setPostorder(getData('postorder').join(', '));
                setTreeType(checkTreeType().join(', '));
              }}
            >
              Balance{" "}
            </button>
            <button
              type="button"
              className="btn btn-info me-3"
              onClick={() => {
                generateRandomTree(10);
                setInorder(getData('inorder').join(', '));
                setPreorder(getData('preorder').join(', '));
                setPostorder(getData('postorder').join(', '));
                setTreeType(checkTreeType().join(', '));
              }}
            >
              Generate Random Tree{" "}
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
          </div>
          <div style={{ color: 'green'}}>
            <b>{`Inorder: ${inorder}`}</b><br/>
            <b>{`Preorder: ${preorder}`}</b><br/>
            <b>{`Postorder: ${postorder}`}</b><br/>
            <b>{`Tree Type: ${treeType}`}</b><br/>
          </div>
        </div>
      </div>
    </>
  );
}
