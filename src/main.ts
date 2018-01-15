import { solution } from './solution';

const args: string[] = require('yargs').array('input').string('input').argv.input;

const re = /^[01]*$/;

if (args) {
  args.forEach(arg => {
    const input = String(arg);

    console.log('--------------------------------------------------');

    if (!re.test(arg)) {
      console.error(arg, 'argument not formatted correctly. Skipping');
      return;
    }

    console.log(`String: ${input}\nResult: ${JSON.stringify(solution(input))}`);
  });
}
