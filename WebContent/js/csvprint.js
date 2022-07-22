/**
 * Created by Dell on 13-06-2016.
 */
var A = [['n','sqrt(n)']];  // initialize array of rows with header row as 1st item
for(var j=1;j<10;++j){ A.push([j, Math.sqrt(j)]) }
var csvRows = [];
for(var i=0,l=A.length; i<l; ++i){
    csvRows.push(A[i].join(','));   // unquoted CSV row
}
var csvString = csvRows.join("\r\n");

var a = document.createElement('a');
a.innerHTML = "Click here";
a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
a.target   = '_blank';
a.download = 'myFile.csv';
document.body.appendChild(a);