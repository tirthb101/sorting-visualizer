import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { delay, color, backgroundColor, initialDelay } from "../config";
import { useNavigate } from "react-router-dom";

const BubbleSort = ({ unsorted }) => {
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
      for (var i = 0; i < arr2.length - 1; i++) {
        for (var j = 0; j < arr2.length - i - 1; j++) {
          if (arr2[j] > arr2[j + 1]) {
            const temp = arr2[j + 1];
            arr2[j + 1] = arr2[j];
            arr2[j] = temp;
            setArr(Array.from(arr2));
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
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
          height={`${99 * ((ele - min) / (max - min)) + 1}vh`}
          backgroundColor={color}
          alignSelf={"self-end"}
        ></Box>
      ))}
    </HStack>
  );
};

export default BubbleSort;
