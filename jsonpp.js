const maxWidth = process.argv[2] || 80

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
  } else if(Object.keys(obj).length === 1) {
    // To stack object with a  single prop into one line:
    for(const prop in obj) {
      return '{"' + prop + '":' + prettyPrint(obj[prop],indent) + '}'
    }
  } else {
    const arr = []
    for(const prop in obj) {
      arr.push(indent + '  "' + prop + '":' + prettyPrint(obj[prop],indent+'  '))
    }
    return '{\n' + arr.join(',\n') + '\n' + indent + '}'
    // for smooshed format: return '{\n' + arr.join(',\n') + '}'
  }
}
