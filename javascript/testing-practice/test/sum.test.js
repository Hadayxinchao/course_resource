import {
  sum,
  capitalize,
  reverseString,
  Calculator,
  ceasarCipher,
  analyzeArray
} from "../src/index";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test('capitalize "hello" to equal "Hello"', () => {
  expect(capitalize("hello")).toBe("Hello");
});

test('reverse "hello" to equal "olleh"', () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("Calculator add 1 + 2 to equal 3", () => {
  expect(Calculator.add(1, 2)).toBe(3);
});

test("Calculator subtract 2 - 1 to equal 1", () => {
  expect(Calculator.subtract(2, 1)).toBe(1);
});

test("Calculator divide 4 / 2 to equal 2", () => {
  expect(Calculator.divide(4, 2)).toBe(2);
});

test("Calculator multiply 2 * 3 to equal 6", () => {
  expect(Calculator.multiply(2, 3)).toBe(6);
});

test('ceasarCipher "xyz" with shift 1 to equal "abc"', () => {
  expect(ceasarCipher("xyz", 3)).toBe("abc");
});

test("ceasarCipher with case preservation", () => {
  expect(ceasarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("ceasarCipher with punctuation", () => {
  expect(ceasarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test('analyzeArray [1,8,3,4,2,6] to equal { average: 4, min: 1, max: 8, length: 6 }', () => {
  expect(analyzeArray([1,8,3,4,2,6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
});