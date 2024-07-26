import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  delay,
  selected,
  color,
  backgroundColor,
  initialDelay,
} from "../config";
import { useNavigate } from "react-router-dom";

const BubbleSort = ({ unsorted }) => {
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
        for (var j = 0; j < arr2.length - i - 1; j++) {
          arr2[j].color = selected;
          arr2[j + 1].color = selected;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
          if (arr2[j].val > arr2[j + 1].val) {
            const temp = arr2[j + 1];
            arr2[j + 1] = arr2[j];
            arr2[j] = temp;
            setArr([...arr2]);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
          arr2[j].color = color;
          arr2[j + 1].color = color;
          setArr([...arr2]);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
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
          opacity={0.5}
          alignSelf={"self-end"}
        ></Box>
      ))}
    </HStack>
  );
};

export default BubbleSort;
