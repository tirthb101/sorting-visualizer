import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import {
  delay,
  initialDelay,
  backgroundColor,
  highlight,
  color,
  selected,
} from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InsertionSort = ({ unsorted }) => {
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
      for (var i = 0; i < arr2.length; i++) {
        var j = i - 1;
        var value = arr2[i];
        value.color = highlight;
        setArr([...arr2]);
        await new Promise((resolve) => setTimeout(resolve, delay * 2));
        while (j >= 0 && arr2[j].val > value.val) {
          arr2[j].color = selected;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
          arr2[j + 1] = arr2[j];
          j -= 1;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
          arr2[j + 1].color = color;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        arr2[j + 1] = value;
        setArr([...arr2]);
        await new Promise((resolve) => setTimeout(resolve, delay));
        value.color = color;
        setArr([...arr2]);
        await new Promise((resolve) => setTimeout(resolve, delay * 3));
        if (i === arr2.length - 1) {
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

export default InsertionSort;
