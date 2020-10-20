import { logA, log } from './lib'
import pkg from '../package.json'
import answer from 'the-answer';
import _ from 'lodash'
import $ from 'jquery';
import App from './App.vue'


logA()
log(pkg.version)

const es6 = 'es666'
log(`this is ${es6}`)
console.log('the answer is ' + answer);
console.log(`the answer is ${answer}`);

// 不使用不会被构建到产物中
// log($)
// log(_)

export default App