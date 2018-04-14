export function solution(input: string): string[] {
  const array = input.split('');

  const result1 = buildResultOutput(zerosThenOnes([ ...array ]), '0', '1');
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
  /*
   * @returns {number[]} A number array containing the number of sequential characters. E.g. if '0' is the starting
   * character, '0011' will return [ 2 ], '0101' will return [ 1, 1 ].
   */
  return (array: string[]) => {
    // Procedure:
    // 1. Find "start" character and count sequence
    // 2. Find "end" character and count sequence
    // 3. Take the min between the two numbers and ensure "start" was previously found
    let m = 0, n = 0;

    return array.reduce((result, char, i, A) => {
      switch (char) {
        case start:
          m++; break;
        case end:
          while (i < A.length && A[i] === end && ++n) i++;

          // min equal to 0 implies start character was not previously found
          if (Math.min(m, n)) result.push(Math.min(m, n));

          //reset
          m = 0, n = 0; break;
      }

      return result;
    }, [] as number[]);
  }
}

function buildResultOutput(results: number[], start: string, end: string): string[] {
  // Observation:
  // Every k sequence of a char, there will be k - 1 substrings that are sequential characters. Instead of counting
  // along the way, I build this result after gathering the sequences.
  return results.reduce((acc, seq) => {
    while (seq > 0) {
      acc.push(start.repeat(seq) + end.repeat(seq));
      seq--;
    }
    return acc;
  }, [] as string[]);
}
