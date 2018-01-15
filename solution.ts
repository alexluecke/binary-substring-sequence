function solution(input: string): number[] {
  const array = input.split('');

  // Read back to front with `pop` -> reverse array
  const result1 = zerosThenOnes([ ...array.reverse() ]); // reverse() mutates -> only reverse once
  const result2 = onesThenZeros([ ...array ]);

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
    // 1. Count sequence of "start" character and count sequence
    // 2. Count sequence of "end" character
    // 3. Take the min between the two numbers and ensure "start" was previously found
    let result = [];
    let found = false;
    let char = array.pop();
    let m = 0, n = 0;

    while (char) {
      switch (char) {
        case start:
          m = m + 1;
          char = array.pop();
          break;
        case end:
          while (char && char === end && ++n) char = array.pop();

          // only push non-empty results
          if (Math.min(m, n)) result.push(Math.min(m, n));

          //reset
          m = 0, n = 0, found = false;
          break;
      }
    }
    return result;
  }
}

console.error(solution('0011'));
