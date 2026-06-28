export type CommonTool = {
  value: string;
  label: string;
  description: string;
  inputs: Array<{ name: string; label: string; placeholder: string; type?: string }>;
  resultKey: string;
};

export const commonTools: CommonTool[] = [
  { value: "even", label: "Is Even", description: "Check whether a number is even.", inputs: [{ name: "num", label: "Number", placeholder: "42", type: "number" }], resultKey: "isEven" },
  { value: "odd", label: "Is Odd", description: "Check whether a number is odd.", inputs: [{ name: "num", label: "Number", placeholder: "13", type: "number" }], resultKey: "isOdd" },
  { value: "factorial", label: "Factorial", description: "Calculate n factorial.", inputs: [{ name: "num", label: "Number", placeholder: "5", type: "number" }], resultKey: "factorial" },
  { value: "gcd", label: "GCD", description: "Greatest common divisor of two numbers.", inputs: [{ name: "a", label: "A", placeholder: "12", type: "number" }, { name: "b", label: "B", placeholder: "15", type: "number" }], resultKey: "gcd" },
  { value: "lcm", label: "LCM", description: "Least common multiple of two numbers.", inputs: [{ name: "a", label: "A", placeholder: "12", type: "number" }, { name: "b", label: "B", placeholder: "15", type: "number" }], resultKey: "lcm" },
  { value: "prime", label: "Is Prime", description: "Check whether a number is prime.", inputs: [{ name: "num", label: "Number", placeholder: "7", type: "number" }], resultKey: "isPrime" },
  { value: "reverse", label: "Reverse String", description: "Reverse any text value.", inputs: [{ name: "str", label: "Text", placeholder: "hello" }], resultKey: "reversedString" },
  { value: "palindrome", label: "Palindrome", description: "Detect a palindrome while ignoring punctuation.", inputs: [{ name: "str", label: "Text", placeholder: "Never odd or even" }], resultKey: "isPalindrome" },
  { value: "slugify", label: "Slugify", description: "Create a URL-safe slug from text.", inputs: [{ name: "str", label: "Text", placeholder: "My New Tool" }], resultKey: "slug" },
  { value: "clamp", label: "Clamp", description: "Clamp a number between min and max.", inputs: [{ name: "num", label: "Number", placeholder: "120", type: "number" }, { name: "min", label: "Min", placeholder: "0", type: "number" }, { name: "max", label: "Max", placeholder: "100", type: "number" }], resultKey: "clamped" },
  { value: "percentage", label: "Percentage", description: "Calculate what percent part is of total.", inputs: [{ name: "part", label: "Part", placeholder: "25", type: "number" }, { name: "total", label: "Total", placeholder: "200", type: "number" }], resultKey: "percentage" },
  { value: "fibonacci", label: "Fibonacci", description: "Generate a Fibonacci sequence with a bounded count.", inputs: [{ name: "count", label: "Count", placeholder: "10", type: "number" }], resultKey: "fibonacci" },
  { value: "average", label: "Average", description: "Average a comma-separated list of numbers.", inputs: [{ name: "numbers", label: "Numbers", placeholder: "4,8,15,16,23,42" }], resultKey: "average" },
  { value: "median", label: "Median", description: "Find the middle value in a comma-separated number list.", inputs: [{ name: "numbers", label: "Numbers", placeholder: "4,8,15,16,23,42" }], resultKey: "median" },
  { value: "titleCase", label: "Title Case", description: "Convert text into title case.", inputs: [{ name: "str", label: "Text", placeholder: "common fun lib" }], resultKey: "titleCase" },
  { value: "wordCount", label: "Word Count", description: "Count words in a text value.", inputs: [{ name: "str", label: "Text", placeholder: "CommonFunLib ships tiny utilities" }], resultKey: "wordCount" },
];
