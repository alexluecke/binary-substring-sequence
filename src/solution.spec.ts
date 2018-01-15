import { solution } from './solution';

function sortResult(a: string, b: string): number {
  return a.length - b.length || a.localeCompare(b);
}

describe('solution', () => {
  it('should solve', () => {
    expect(solution('').sort(sortResult)).toEqual([]);
    expect(solution('010101').sort(sortResult)).toEqual([ '01', '01', '01', '10', '10' ]);
    expect(solution('00110011').sort(sortResult)).toEqual([ '01', '01', '10', '0011', '0011', '1100' ]);
    expect(solution('0001001100').sort(sortResult)).toEqual([ '01', '01', '10', '10', '0011', '1100' ]);
    expect(solution('0001110').sort(sortResult)).toEqual([ '01', '10', '0011', '000111' ]);
    expect(solution('000111000111').sort(sortResult)).toEqual([ '01', '01', '10', '0011', '0011', '1100', '000111', '000111', '111000' ]);
  });
});
