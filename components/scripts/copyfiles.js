const cpx = require('cpx');

cpx.copy('../csv/*.csv', '../../build/csv',{}, () => console.log('copied'));
// cpx.watch('../csv/*.csv', '../../build/csv',{}, () => console.log('done'));