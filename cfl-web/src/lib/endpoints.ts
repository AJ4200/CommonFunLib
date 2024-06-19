import { EndpointData } from "@/models/endpoint";

const endpoints: EndpointData[] = [
  {
    endpoint: "/even",
    description: "Check if a number is even",
    parameters: {
      num: "required",
    },
    paramDescriptions: {
      num: "The number to check",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/even?num=4'",
    jsExample: `fetch('http://localhost:3001/common/even', {
      method: 'GET',
      params: {
        num: 4
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "isEven": true
    }`,
  },
  {
    endpoint: "/odd",
    description: "Check if a number is odd",
    parameters: {
      num: "required",
    },
    paramDescriptions: {
      num: "The number to check",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/odd?num=5'",
    jsExample: `fetch('http://localhost:3001/common/odd', {
      method: 'GET',
      params: {
        num: 5
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "isOdd": true
    }`,
  },
  {
    endpoint: "/factorial",
    description: "Calculate the factorial of a number",
    parameters: {
      num: "required",
    },
    paramDescriptions: {
      num: "The number to calculate the factorial for",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/factorial?num=5'",
    jsExample: `fetch('http://localhost:3001/common/factorial', {
      method: 'GET',
      params: {
        num: 5
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "factorial": 120
    }`,
  },
  {
    endpoint: "/gcd",
    description: "Calculate the greatest common divisor of two numbers",
    parameters: {
      a: "required",
      b: "required",
    },
    paramDescriptions: {
      a: "The first number",
      b: "The second number",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/gcd?a=12&b=15'",
    jsExample: `fetch('http://localhost:3001/common/gcd', {
      method: 'GET',
      params: {
        a: 12,
        b: 15
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "gcd": 3
    }`,
  },
  {
    endpoint: "/lcm",
    description: "Calculate the least common multiple of two numbers",
    parameters: {
      a: "required",
      b: "required",
    },
    paramDescriptions: {
      a: "The first number",
      b: "The second number",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/lcm?a=12&b=15'",
    jsExample: `fetch('http://localhost:3001/common/lcm', {
      method: 'GET',
      params: {
        a: 12,
        b: 15
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "lcm": 60
    }`,
  },
  {
    endpoint: "/prime",
    description: "Check if a number is prime",
    parameters: {
      num: "required",
    },
    paramDescriptions: {
      num: "The number to check",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/prime?num=7'",
    jsExample: `fetch('http://localhost:3001/common/prime', {
      method: 'GET',
      params: {
        num: 7
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "isPrime": true
    }`,
  },
  {
    endpoint: "/reverse",
    description: "Reverse a string",
    parameters: {
      str: "required",
    },
    paramDescriptions: {
      str: "The string to reverse",
    },
    curlExample: "curl -X GET 'http://localhost:3001/common/reverse?str=hello'",
    jsExample: `fetch('http://localhost:3001/common/reverse', {
      method: 'GET',
      params: {
        str: 'hello'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));`,
    responseExample: `{
      "reversedString": "olleh"
    }`,
  },
];

export default endpoints;
