function solution(input: string): string[] {
  const array = input.split('');

  // Read back to front with `pop` -> reverse array
  const result1 = buildResultOutput(zerosThenOnes([ ...array.reverse() ]), '0', '1');
  const result2 = buildResultOutput(onesThenZeros([ ...array ]), '1', '0');

  return [ ...result1, ...result2 ];
}

function zerosThenOnes(array: string[]): number[] {
  return scannerFactory('0', '1')(array);
}

function onesThenZeros(array: string[]): number[] {
  return scannerFactory('1', '0')(array);
}

function scannerFactory(start: string, end: string): (input: string[]) => number[] {
  return (array: string[]) => {
    // Procedure:
    // 1. Find "start" character and count sequence
    // 2. Find "end" character and count sequence
    // 3. Take the min between the two numbers and ensure "start" was previously found
    // Result:
    // A number array containing the number of sequential characters.
    // e.g. if '0' is the starting character, '0011' will return [ 2 ], '0101' will return [ 1, 1 ].
    let result = [];
    let char = array.pop();
    let m = 0, n = 0;

    while (char) {
      switch (char) {
        case start:
          m++;
          char = array.pop();
          break;
        case end:
          while (char && char === end && ++n) char = array.pop();

          // min equal to 0 implies start character was not previously found
          if (Math.min(m, n)) result.push(Math.min(m, n));

          //reset
          m = 0, n = 0;
          break;
      }
    }
    return result;
  }
}

function buildResultOutput(results: number[], start: string, end: string): string[] {
  // Observation:
  // Every k sequence of a char, there will be k - 1 substrings.
  // Instead of counting along the way, I build this result after gathering the sequences.
  return results.reduce((acc, seq) => {
    while (seq > 0) {
      acc.push(start.repeat(seq) + end.repeat(seq));
      seq--;
    }
    return acc;
  }, [] as string[]);
}

console.log(solution('010101')); // [ '01', '01', '01', '10', '10' ]
console.log(solution('00110011')); // [ '0011', '01', '0011', '01', '1100', '10' ]
console.log(solution('0001001100')); // [ '01', '0011', '01', '10', '1100', '10' ]
console.log(solution('0001110')); // [ '000111', '0011', '01', '10' ]
console.log(solution('000111000111')); //[ '000111', '0011', '01', '000111', '0011', '01', '111000', '1100', '10' ]
