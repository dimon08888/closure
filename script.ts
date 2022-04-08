// declare a function addByX
function addByX(arg) {
    return (arg2) => arg + arg2;
}

// declare a constanst addBy5, store the return value of addByX(5)
const addBy5 = addByX(5) // (arg2) => addBy5 + arg2
const addBy4 = addByX(4)
const addBy3 = addByX(3)

// console.log(
//     addBy5(2),  // 7
//     addBy4(-3), // 1
//     addBy3(2),  // 5
// )

function createPrinterFunction(str) {
    return () => console.log(str);
}

const printHello = createPrinterFunction('hello')
const printGoodBye = createPrinterFunction('goodbye')

// printHello() // 'hello'
// printGoodBye() // 'goodbye'

function createCounter() {
    let result = 1
    return () => result++
}

const counter1 = createCounter()
const counter2 = createCounter()

// console.log(counter1()) // 1
// console.log(counter2()) // 1
// console.log(counter1()) // 2
// console.log(counter2()) // 2
// console.log(counter1()) // 3

function once(func) {
   let count = 0
   let result

   return (...arg) => {
      if (count === 0) {
        result = func(...arg)
        count++
      }
      return result;
   }
}

function calc(arg) {
    return arg + 2
}

function calc2(arg1, arg2) {
   return arg1 + arg2
}

const onceCalc = once(calc)
const onceCalc2 = once(calc2)

// console.log(
//     onceCalc(2), // 4
//     onceCalc(4), // 4
//     onceCalc(5), // 4
// )

// console.log(
//    onceCalc2(2, 4), // 6
//    onceCalc2(4, 4), // 6
// )

function after(count, func) {
   let sum = 0
   return (...args) => {
      sum++
      if (sum >= count) {
        return func(...args)
      }
   };
}

function call() {
   console.log('hello')
}

function printCall(arg) {
   console.log(arg)
}

const afterCall = after(3, call)
const afterCall2 = after(2, printCall)

// afterCall()
// afterCall()
// afterCall() // 'hello'
// afterCall() // 'hello'

afterCall2('why')
// afterCall2('print this') // 'print this'

function delay(func, wait, ...args) {
   return () => {
      setTimeout(func, wait, ...args)
   }
}

function print(w1, w2) {
   console.log(w1, w2)
}

const afterDelay = delay(print, 1500, 'hello', 'world')
// afterDelay() // after 500ms logs 'hello'

function russianRoulette(n) {
   let count = 0
   return () => {
      count++
      if (count < n) {
         console.log('click')
      } else if (count === n){
         console.log('bang')
      } else {
         console.log('reload to play again')
      }
   } 
}

const play = russianRoulette(4)
// play() // 'click'
// play() // 'click'
// play() // 'click'
// play() // 'bang'
// play() // 'reload to play again'
// play() // 'reload to play again'

function average() {
   let sum = 0
   let count = 0
   
   return (num) => {
      if (num === undefined) {
         return count === 0 ? 0 : sum / count
      } else {
        count++
        sum += num
        return sum / count 
      } 
   }
}

const avgSoFar = average()
// console.log(avgSoFar())   // 0
// console.log(avgSoFar(4))  // 4
// console.log(avgSoFar(8))  // 6
// console.log(avgSoFar())   // 6
// console.log(avgSoFar(12)) // 8
// console.log(avgSoFar())   // 8

function makeHistory(limit) {
   const history = []
   
   return (str) => {
      if (str === 'undo') {
         if (history.length === 0) {
            return 'nothing to undo'
         } else {
            return history.pop() + ' undone'
         } 
      }
      
      if (history.length === limit) {
         history.shift()
      }
      
      history.push(str)
      return str + ' done'
   }
}

const myActions = makeHistory(2)

// console.log(myActions('jump')) // 'jump done'
// console.log(myActions('undo')) // 'jump undone'

// console.log(myActions('walk')) // 'walk done'
// console.log(myActions('code')) // 'code done'
// console.log(myActions('pose')) // 'pose done'

// console.log(myActions('undo')) // 'pose undone'
// console.log(myActions('undo')) // 'code undone'

// console.log(myActions('undo')) // 'nothing to undo'

function createSecretHolder(secret) {
   let result = secret;
   return {
      getSecret() {
         return result
      },
      setSecret(arg) {
        result = arg;
      }
   }
}

const obj = createSecretHolder(5)

// console.log(obj.getSecret()) // 5
// obj.setSecret(2)
// console.log(obj.getSecret()) // 2

function censor() {
   const history = [];
   return (str1, str2) => {
      if (str1 !== undefined && str2 !== undefined) {
         history.push([str1, str2]);
      } else {
         let result = str1
         for (const [word, replace] of history) {
             result = result.replaceAll(word, replace)
         }
         return result
      }  
   }  
}

const changeWords = censor()
changeWords('dogs', 'cats')
changeWords('quick', 'slow')
// console.log(changeWords('The quick, brown fox jumps over the lazy dogs.'))
// 'The slow, brown fox jumps over the lazy cats.'

function rollCall(names) {
   let count = 0
   return () => {
      if (count < names.length) {
         return names[count++]
      }else {
         return 'Everyone accounted for'
      }
   }
}

const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
// console.log(rollCaller()) // 'Victoria'
// console.log(rollCaller()) // 'Juan'
// console.log(rollCaller()) // 'Ruth'
// console.log(rollCaller()) // 'Everyone accounted for'

function saveOutput(func, password) {
   const results = {}
   return (arg) => {
      if (arg === password) {
         return results
      } else {
         return results[arg] = func(arg);
      }
   }
}

function multiplyBy2(num) {
   return num * 2
}

const multiplyBy2AndLog = saveOutput(multiplyBy2, 'boo')
// console.log(multiplyBy2AndLog(2)) // 4
// console.log(multiplyBy2AndLog(9)) // 18
// console.log(multiplyBy2AndLog('boo')) // { 2: 4, 9: 18 }

function iterate(array) {
   let i = 0;
   return () => {
      return array[i++]
   }
}

const iterator = iterate([1, 2, 3])
// console.log(iterator()) // 1
// console.log(iterator()) // 2
// console.log(iterator()) // 3
// console.log(iterator()) // undefined

function cycleIterator(array) {
   let i = 0
   return () => {
      const value = array[i]
      i = (i + 1) % array.length
      return value
      
      // if (i < array.length) {
      //    return array[i++]
      // } else {
      //    i = 0
      //    return array[i++]
      // }
      
   }
}

const threeDayWeekend = ['Fri', 'Sat', 'Sun']
const getDay = cycleIterator(threeDayWeekend)
// console.log(getDay()) // 'Fri'
// console.log(getDay()) // 'Sat'
// console.log(getDay()) // 'Sun'
// console.log(getDay()) // 'Fri'
// console.log(getDay()) // 'Sat'
// console.log(getDay()) // 'Sun'
// console.log(getDay()) // 'Fri'
// ...

function reversed(array) {
   let i = array.length - 1;
   return () => {
     return array[i--]
   }
}

const reversedIterator = reversed([1, 2, 3])
// console.log(reversedIterator()) // 3
// console.log(reversedIterator()) // 2
// console.log(reversedIterator()) // 1
// console.log(reversedIterator()) // undefined

function words(str) {
   let i = 0
   const arr = str.split(' ')
   return () => {
      return arr[i++]
   }
}

const getWord = words('Hello World How are you')
// console.log(getWord()) // 'Hello'
// console.log(getWord()) // 'World'
// console.log(getWord()) // 'How'
// console.log(getWord()) // 'are'
// console.log(getWord()) // 'you'
// console.log(getWord()) // undefined

function indexIterator(array) {
   let i = 0
   return () => {
      // let arr = [];
      if (i < array.length) {
         return [i, array[i++]]
         // arr.push(i, array[i++])
         // return arr
      } else {
         return undefined
      }
      
   }
   
}

const iteratorWithIndex = indexIterator(['a', 'b', 'c', 'd'])
// console.log(iteratorWithIndex()) // [0, 'a']
// console.log(iteratorWithIndex()) // [1, 'b']
// console.log(iteratorWithIndex()) // [2, 'c']
// console.log(iteratorWithIndex()) // [3, 'd']
// console.log(iteratorWithIndex()) // undefined

function defineFirstArg(func, arg) {
   return (...args) => {
      return func(arg, ...args)
   }
}

function subtract(a, b) {
   return a - b
}

const subtractFrom20 = defineFirstArg(subtract, 20)
// console.log(subtractFrom20(5)) // 15

function dateStamp(func) {
   return (...args) => {
      return {date: new Date(), output: func(...args) }
   }
   
}

const stampedMultiplyBy2 = dateStamp(n => n * 2)
// console.log(stampedMultiplyBy2(4)) // { date: (today's date), output: 8 }
// console.log(stampedMultiplyBy2(6)) // { date: (today's date), output: 12 }

function makeFuncTester(tests) {
   return (func) => {
      return tests.every(test => func(test[0]) === test[1])
      // for (let i = 0; i < tests.length; i++) {
      //    const [argValue, returnValue] = tests[i]
      //    if (func(argValue) !== returnValue) {
      //       return false
      //    }
      // }
      // return true
   }
}

const testCases = [
   ['hello', 'hellO'],
   ['goodbye', 'goodbyE'],
   ['howdy', 'howdY'],
]

const shouldCapitalizeLast = makeFuncTester(testCases)
const capitalizeLast1 = str => str.toUpperCase()
const capitalizeLast2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase()

// console.log(shouldCapitalizeLast(capitalizeLast1)) // false
// console.log(shouldCapitalizeLast(capitalizeLast2)) // true

function memo(func) {
   const cache = {}
   return (arg) => {
      if (arg in cache) {
         return cache[arg]         
      } else {
          return cache[arg] = func(arg)
      }
   }
}

function fib(n) {
   if (n === 1 || n === 2) return 1
   else return memoFib(n - 1) + memoFib(n - 2)
}

const memoFib = memo(fib)
// console.log(fib(100))
// console.log(memoFib(100)) // 354224848179261915075

function blackjack(array) {
   let count = 0
   
   return function dealer(a, b) {
      let sum = 0
      let first = true
      let done = false
      
      return function player() {
            if (done) {
               return 'you are done'
            }
         
            if (first) {
               first = false
               return sum = a + b
            } 
         
            if (sum + array[count] <= 21) {
               return sum = sum + array[count++]
            }  
         
            count++
            done = true
            return 'bust'
      }
   }
}

// DEALER
const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11])

// PLAYER 1
const player1 = deal(4, 5)
console.log(player1()) // 9
console.log(player1()) // 11
console.log(player1()) // 17 
console.log(player1()) // 18 
console.log(player1()) // 'bust'
console.log(player1()) // 'you are done!'
console.log(player1()) // 'you are done!'

// PLAYER 2
const player2 = deal(2, 2)
console.log(player2()) // 4
console.log(player2()) // 15
console.log(player2()) // 19 
console.log(player2()) // 'bust'
console.log(player2()) // 'you are done!'
console.log(player2()) // 'you are done!'

// PLAYER 3 
const player3 = deal(3, 7)
console.log(player3()) // 10
console.log(player3()) // 13 
console.log(player3()) // 'bust'
console.log(player3()) // 'you are done!'
console.log(player3()) // 'you are done!'
