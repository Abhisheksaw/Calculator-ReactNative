import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const Mykeyboard = () => {
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleNumberPress = (num: string) => {
    if (result !== null) {
      setFirstNumber(num);
      setResult(null);
    } else {
      setFirstNumber(firstNumber + num);
    }
  };
  const handleOperationPress = (op: string) => {
    if (firstNumber) {
      setOperation(op);
      setSecondNumber(firstNumber);
      setFirstNumber("");
    }
  };
  const toggleSign = () => {
    if (firstNumber) {
      setFirstNumber((prev) =>
        prev.startsWith("-") ? prev.substring(1) : `${prev}`
      );
    }
  };
  const deleteLastDigit = () => {
    setFirstNumber((prev) => prev.slice(0, -1));
  };
  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };
  const getResult = () => {
    if (secondNumber && firstNumber) {
      const num1 = parseFloat(secondNumber);
      const num2 = parseFloat(firstNumber);
      let res: number | null = null;

      switch (operation) {
        case "+":
          res = num1 + num2;
          break;
        case "-":
          res = num1 - num2;
          break;
        case "×":
          res = num1 * num2;
          break;
        case "÷":
          if (num2 === 0) {
            setResult(NaN); // Will display as "Error" in UI
            setFirstNumber("");
            setSecondNumber("");
            setOperation("");
            return;
          }
          res = num1 / num2;
          break;
        case "%":
          res = num1 % num2;
          break;
        default:
          return;
      }
      setResult(res);
      setFirstNumber(res?.toString() || "");
      setSecondNumber("");
      setOperation("");
    }
  };
  return (
    <View>
      <View style={styles.display}>
        <Text style={styles.resultText}>
          {isNaN(result as number)
            ? "Cannot divide by zero"
            : result !== null
            ? result
            : `${secondNumber} ${operation} ${firstNumber}` || "0"}
        </Text>
      </View>

      <View style={styles.row}>
        <Button title="C" isGray onPress={clear} />

        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="⌫" onPress={deleteLastDigit} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("÷")} />
      </View>

      <View style={styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("×")} />
      </View>

      <View style={styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>

      <View style={styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>

      <View style={styles.row}>
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="00" onPress={() => handleNumberPress("00")} />
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="=" isBlue onPress={getResult} />
      </View>
    </View>
  );
};
export default Mykeyboard;

const styles = StyleSheet.create({
  display: {
    height: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#eeee",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    margin: 2,
  },
  resultText: {
    fontSize: 36,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
