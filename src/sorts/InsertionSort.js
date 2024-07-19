import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { delay, initialDelay, color, backgroundColor } from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InsertionSort = ({ unsorted }) => {
  const [arr, setArr] = useState(unsorted);
  const navigate = useNavigate();
  const [max, setMax] = useState();
  const [min, setMin] = useState();

  useEffect(() => {
    var arr2 = Array.from(arr);
    setMax(Math.max(...arr2));
    setMin(Math.min(...arr2));

    async function sort() {
      await new Promise((resolve) => setTimeout(resolve, initialDelay));
      for (var i = 0; i < arr2.length; i++) {
        var j = i - 1;
        var value = arr2[i];
        while (arr2[j] > value && j >= 0) {
          arr2[j + 1] = arr2[j];
          j -= 1;
          setArr(Array.from(arr2));
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        arr2[j + 1] = value;
        setArr(Array.from(arr2));
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (i === arr2.length - 1) {
          navigate("/");
        }
      }
    }
    sort();
  }, [setMax]);
  return (
    <HStack height={"100vh"} width={"100%"} backgroundColor={backgroundColor}>
      {arr.map((ele) => (
        <Box
          flex="1"
          height={`${99 * ((ele - min) / (max - min)) + 1}vh`}
          backgroundColor={color}
          alignSelf={"self-end"}
        ></Box>
      ))}
    </HStack>
  );
};

export default InsertionSort;
