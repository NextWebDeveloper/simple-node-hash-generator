var fs = require('fs'); 
var parse = require('csv-parse');

const filePath = 'Hash.csv'

var csvData=[];
let i = 0;

fs.createReadStream(filePath)
    .pipe(parse())
    .on('data', function(csvrow) {
        const str = csvrow.toString()
        if (str.includes('hash=')) {
            const start = str.indexOf('hash=');
            const end = str.indexOf('&.exe');

            const hash = str.slice(start+5,end);

            const fRow = `'${i}' => '${hash}',`
            i++;
            csvData.push(fRow);     
        }      
    })
    .on('end',function() {

      let writeStream = fs.createWriteStream('final.txt')
      csvData.forEach((row, index) => {     
          writeStream.write(row + '\n', () => {
              // a line was written to stream
          })
      })
      writeStream.end()
    });

    