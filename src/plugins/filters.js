import Vue from 'vue'

const currency = Vue.filter('currency', value => {
  const setSpaces = (num) => {
    let val = ''
    val = num.toString().split('').reverse()
    for (let i = 1; i < val.length; i++) {
      if (i % 3 === 0) {
        val[i] = `${val[i]} `
      }
    }
    val = val.reverse().join('')
    return val
  }
  if (typeof value !== 'undefined') {
    const hasFloatPart = value.toString().includes('.')
    if (!hasFloatPart) {
      value = setSpaces(value)
    } else {
      let integerPart = value.toString().split('.')[0]
      let floatPart = value.toString().split('.')[1]
      integerPart = setSpaces(integerPart)
      floatPart = setSpaces(floatPart)
      value = `${integerPart}.${floatPart}`
    }
  }
  return value
})

export default {
  currency,
}
