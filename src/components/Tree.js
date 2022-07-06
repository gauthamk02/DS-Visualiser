import React from 'react'
import '../styles/styles.css'
import '../styles/Tree.css'


import { BinarySearchTree, useBinarySearchTree } from 'react-tree-vis'
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
      } = useBinarySearchTree()

    const treeStyle = {
        lineColor: 'red',
    }
    return (
        <>
            <div >
                <h2>Binary Search Tree</h2>
                <div className='container tree-canvas'>
                    <BinarySearchTree data={[2, 1, 3]} ref={ref}  treeStyles={treeStyle}/>
                </div>
                <div className="row workspace">
                    <div className="d-flex justify-content-center m-3">
                        <button type="button" className="btn btn-info me-3" onClick={() => {
                            let val = prompt('Enter value to insert:');
                            if (!val) {
                                alert('Invalid Input');
                                return;
                            }
                            insert(val);
                        }}>
                            Insert </button>
                        <button type="button" className="btn btn-info me-3" onClick={() => {
                            let val = prompt('Enter value to remove:');
                            if (!val) {
                                alert('Invalid Input');
                                return;
                            }
                            remove(val);
                        }}>
                            Remove </button>
                        <button type="button" className="btn btn-info me-3" onClick={() => {
                            let val = prompt('Enter value to remove:');
                            if (!val) {
                                alert('Invalid Input');
                                return;
                            }
                            search(parseInt(val));
                        }}>
                            Search </button>
                    </div>
                </div>
            </div>
        </>
    )
}