import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  delay,
  color,
  backgroundColor,
  initialDelay,
  selected,
  highlight,
} from "../config";
import { useNavigate } from "react-router-dom";

const SelectionSort = ({ unsorted }) => {
  const [arr, setArr] = useState(unsorted);
  const navigate = useNavigate();
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const handleEvent = () => {
    navigate("/");
  };
  useEffect(() => {
    window.addEventListener("popstate", handleEvent);
    return () => window.removeEventListener("popstate", handleEvent);
  });

  useEffect(() => {
    var arr2 = Array.from(arr);
    if (arr2.length > 0) {
      const newMax = arr.reduce(
        (max, item) => (item.val > max ? item.val : max),
        -Infinity
      );
      const newMin = arr.reduce(
        (min, item) => (item.val < min ? item.val : min),
        Infinity
      );

      setMax(newMax);
      setMin(newMin);
    }

    async function sort() {
      await new Promise((resolve) => setTimeout(resolve, initialDelay));
      for (var i = 0; i < arr2.length - 1; i++) {
        var minIndex = i;
        arr2[i].color = highlight;
        setArr([...arr2]);
        await new Promise((resolve) => setTimeout(resolve, delay));
        for (var j = i + 1; j < arr2.length; j++) {
          arr2[j].color = selected;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
          if (arr2[j].val < arr2[minIndex].val) {
            minIndex = j;
          }
          arr2[j].color = color;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        if (minIndex !== i) {
          arr2[minIndex].color = highlight;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay * 3));
          var temp = arr2[i];
          arr2[i] = arr2[minIndex];
          arr2[minIndex] = temp;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
          arr2[minIndex].color = color;
        }
        arr2[i].color = color;
        setArr([...arr2]);
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (i === arr2.length - 2) {
          navigate("/");
        }
      }
    }
    sort();
  }, [setMax, navigate]);
  return (
    <HStack height={"100vh"} width={"100%"} backgroundColor={backgroundColor}>
      {arr.map((ele) => (
        <Box
          flex="1"
          height={`${99 * ((ele.val - min) / (max - min)) + 1}vh`}
          backgroundColor={ele.color}
          alignSelf={"self-end"}
        ></Box>
      ))}
    </HStack>
  );
};

export default SelectionSort;
