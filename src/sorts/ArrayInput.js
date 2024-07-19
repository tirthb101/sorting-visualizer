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
  TabList,
  Tab,
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
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        p={3}
        bg="white"
        w="100%"
        m="40px 0px 15px 0px"
        borderRadius="1g"
        borderWidth="1px"
        justifyContent="center"
      >
        <Text
          fontFamily="work sans"
          fontSize="4xl"
          textAlign="center"
          fontWeight={600}
        >
          Sorting Visualizer
        </Text>
      </Box>
      <Box
        d="flex"
        p={4}
        bg="white"
        w="100%"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" isFitted colorScheme="blue">
          <TabPanels>
            <TabPanel>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={5}
                align="stretch"
                p={4}
                maxW="400px"
                mx="auto"
                mt="100px"
              >
                <FormControl id="array-input" isRequired>
                  <FormLabel>Enter numbers separated by commas</FormLabel>
                  <Input
                    placeholder="e.g. 10, 9, 8, 7, 6"
                    value={arrayInput}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="algorithm" isRequired>
                  <FormLabel>Select Sorting Algorithm</FormLabel>
                  <Select
                    placeholder="Select algorithm"
                    onChange={handleAlgorithmChange}
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default ArrayInput;
