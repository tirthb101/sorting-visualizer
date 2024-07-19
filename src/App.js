import { useState } from "react";
import "./App.css";
import BubbleSort from "./sorts/BubbleSort";
import InsertionSort from "./sorts/InsertionSort";
import SelectionSort from "./sorts/SelectionSort";
import ArrayInput from "./sorts/ArrayInput";

import { Routes, Route } from "react-router-dom";

function App() {
  const [input, setInput] = useState([10, 9, 8, 7, 6, 5, 4, 3, 1]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ArrayInput setInput={setInput} />} />
        <Route
          path="/bubblesort"
          element={<BubbleSort unsorted={input} />}
        ></Route>
        <Route
          path="/selectionSort"
          element={<SelectionSort unsorted={input} />}
        />
        <Route
          path="/insertionSort"
          element={<InsertionSort unsorted={input} />}
        />
      </Routes>
    </div>
  );
}

export default App;
