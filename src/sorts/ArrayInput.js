import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  StackDivider,
  Button,
  Select,
  useToast,
  Container,
  Box,
  Text,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

const ArrayInput = ({ setInput }) => {
  const [arrayInput, setArrayInput] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    setArrayInput(e.target.value);
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!arrayInput || !algorithm) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const array = arrayInput.split(",").map(Number);
    if (array.some(isNaN)) {
      toast({
        title: "Invalid input. Please enter numbers separated by commas.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setInput(array);
    navigate(`/${algorithm}`);
  };

  return (
    <Container maxW="lg" centerContent>
      <Box
        display="flex"
        p={5}
        bg="white"
        w="100%"
        my={10}
        borderRadius="lg"
        boxShadow="lg"
        justifyContent="center"
        textAlign="center"
      >
        <Text
          fontFamily="Work Sans"
          fontSize="4xl"
          fontWeight="bold"
          color="gray.800"
        >
          Sorting Visualizer
        </Text>
      </Box>
      <Box
        display="flex"
        p={6}
        bg="white"
        w="100%"
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={6}
          align="stretch"
          w="100%"
          maxW="400px"
          mx="auto"
        >
          <FormControl id="array-input" isRequired>
            <FormLabel>Enter numbers separated by commas</FormLabel>
            <Input
              placeholder="e.g. 10, 9, 8, 7, 6"
              value={arrayInput}
              onChange={handleInputChange}
              _placeholder={{ color: "gray.500" }}
              _hover={{ borderColor: "teal.500" }}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
            />
          </FormControl>
          <FormControl id="algorithm" isRequired>
            <FormLabel>Select Sorting Algorithm</FormLabel>
            <Select
              placeholder="Select algorithm"
              onChange={handleAlgorithmChange}
              _hover={{ borderColor: "teal.500" }}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
            >
              <option value="bubblesort">Bubble Sort</option>
              <option value="selectionSort">Selection Sort</option>
              <option value="insertionSort">Insertion Sort</option>
            </Select>
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ArrayInput;
