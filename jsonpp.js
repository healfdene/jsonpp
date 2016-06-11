const maxWidth = process.argv[2] || 80
const sortProperties = Boolean(process.argv[3])
const cloudFormationSort = (typeof process.argv[3] === 'string' && process.argv[3].toLowerCase() === 'cf')

const stdin = process.stdin,
      stdout = process.stdout,
      inputChunks = []

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (chunk) {
    inputChunks.push(chunk)
});

stdin.on('end', function () {
    var inputJSON = inputChunks.join(),
        parsedData = JSON.parse(inputJSON),
        outputJSON = prettyPrint(parsedData,'')
    stdout.write(outputJSON)
    stdout.write('\n')
});

function prettyPrint(obj,indent) {
  const text = JSON.stringify(obj)
  if((text + indent).length < maxWidth || typeof obj === 'string') {
    return text
  } else if(Array.isArray(obj)) {
    const arr = []
    for(const item of obj) {
      arr.push(indent + '  ' + prettyPrint(item,indent+'  '))
    }
    return '[\n' + arr.join(',\n') + '\n' + indent + ']'
  } else if(Object.keys(obj).length === 1) {
    // To stack object with a  single prop into one line:
    for(const prop in obj) {
      return '{"' + prop + '":' + prettyPrint(obj[prop],indent) + '}'
    }
  } else {
    const arr = []
    let keys = Object.keys(obj)
    if(sortProperties) {
      keys.sort()
    }
    if(cloudFormationSort) {
      const index = keys.indexOf('Type')
      if(index !== -1) {
        keys.splice(index,1)
        keys.unshift('Type')
      }
    }
    for(const prop of keys) {
      arr.push(indent + '  "' + prop + '":' + prettyPrint(obj[prop],indent+'  '))
    }
    return '{\n' + arr.join(',\n') + '\n' + indent + '}'
    // for smooshed format: return '{\n' + arr.join(',\n') + '}'
  }
}
