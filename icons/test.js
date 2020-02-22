const assert = require('assert')
const funct = require('./user-script.js')

let myreglon=/(?<=-lon:)(\w[0-9][.,][0-9]*)/;
let myreglat=/(?<=-lat:)(\w[0-9][.,][0-9]*)/;
let mytext="output custom results. Details lists capture groups. Explain describes your expression in plain English. sdfsedtfgdhfsdfg461644/1fv<:/-lon:62,2496633-lat:98,56It does not match \" ipsum\" itself, "


it('correctly gets the lat', () => {
    assert.equal(parseFloat(myreglon.exec(mytext)),62,2496633 )
})


it('correctly gets the lon', () => {
    assert.equal(parseFloat(myreglat.exec(mytext)),98,56 )
})
