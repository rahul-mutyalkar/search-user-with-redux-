const people = [{
    name: 'Nader',
    age: 36
  },
  {
    name: 'Amanda',
    age: 24
  },
  {
    name: 'Jason',
    age: 44
  }
]

export default (text) => {
  // return new Promise((resolve, reject) => {

console.log('text : ',text)
  return fetch('https://api.github.com/users/'+text)

}
