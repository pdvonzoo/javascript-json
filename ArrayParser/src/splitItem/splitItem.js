const { each } = require('../util/functionalUtil')

const addOpenState = state => state << 1

const addCloseState = state => state >> 1

const toggleState = state => !state

const typeString = {
    '[': {'type': 'array', 'closed': addOpenState},
    ']': {'type': 'array', 'closed': addCloseState},
    '{': {'type': 'object', 'closed': addOpenState},
    '}': {'type': 'object', 'closed': addCloseState},
    "'": {'type': 'single', 'closed': toggleState},
    '"': {'type': 'double', 'closed': toggleState},
    '`': {'type': 'backTick', 'closed': toggleState}, 
}

const ClOSED = 2

const isComma = item => item === ','

const allClosed = (closeState) => Object.values(closeState).every(v=>{
    return typeof v==='boolean' ? v===true : v<=ClOSED
})

const isStringItemEnd = (singleCharacter,closeState) => allClosed(closeState) && isComma(singleCharacter)

const istypeString = singleCharacter => typeString[singleCharacter]!==undefined

const splitItem = str => {
    const splitItemList = [] 
    let splitItem = ''
    const closeState = {
        'array': ClOSED,
        'object': ClOSED,
        'single': true,
        'double': true,
        'backTick': true,
    }
    each(str, function(singleCharacter){
        if(isStringItemEnd(singleCharacter, closeState)){
            splitItemList.push(splitItem)
            splitItem = ''
            for(let key in closeState){
                closeState[key]===ClOSED
            }
        }
        else{
            if(istypeString(singleCharacter)){
                const {type, closed}=typeString[singleCharacter]
                closeState[type] = closed(closeState[type])
            }
            splitItem += singleCharacter
        }
    })       
    splitItemList.push(splitItem)
    return splitItemList
}


module.exports = splitItem