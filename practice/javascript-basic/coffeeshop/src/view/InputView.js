const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const InputView = {
  inputOrder(question, callback) {
    rl.question(question, callback);
  },
};

module.exports = InputView;
