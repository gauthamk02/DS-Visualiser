import React, { useState } from 'react';
import Queue from './Queue';
import Array from './Array';
import Stack from './Stack';
import LinkedList from './LinkedList';
import Sort from './Sort';
import Tree from './Tree';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import '../styles/styles.css';

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container tabs-container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Array
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Linked List
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Stack
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Queue
        </button>
        <button
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          Binary Tree
        </button>
        <button
          className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(6)}
        >
          Sorting Algorithms
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <Array />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <LinkedList />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <Stack />
        </div>

        <div className={toggleState === 4 ? "content active-content" : "content"}>
          <Queue />
        </div>
        <div className={toggleState === 5 ? "content active-content" : "content"}>
          {/* <div><p>Binary Tree</p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div> */}
          <Tree />
        </div>
        <div className={toggleState === 6 ? "content active-content" : "content"}>
          <Sort />
        </div>
      </div>
    </div>
  );
}

export default Tabs;