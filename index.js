var http = require('http');
var fs = require('fs');

var http_server = http.createServer( (req, res) => {
    console.log("got request for: ",req.url.toString())
    // let fn = "index.html";
    // let ct = "text/html";

    if( req.url === '/'){
        fn = "index.html"
        ct = "text/html"
    }else if(  req.url.endsWith( ".css" ) || req.url.endsWith(".png") || req.url.endsWith(".svg")){
         fn = req.url.substring(1, req.url.length)
        ct = "text/css"
    }else if( req.url.endsWith( '.js' ) ){
         fn = req.url.substring(1, req.url.length)
        ct = "text/javascript"
    }else if( req.url.endsWith( ".html" ) ){
        fn = req.url.substring(1, req.url.length)
        ct = "text/html"
    }else if(req.url.endsWith(".json")){
        fn = req.url.substring(1, req.url.length)
        ct = "application/json"
    }else {
        res.writeHead(400)
        return res.end()
    }
    sendHttpResponse(fn, ct, res)
})

http_server.listen(3001, (err) => {
    console.log("server is listening on 3001");
})


function sendHttpResponse(fn, ct, res){
    fs.readFile(fn, (err, data) => {
        if(err){
            res.writeHead(404);
            res.write("Not Found.."+fn);
            res.end();
            console.log("send error response....below is error details \n", err);
        }else{
            res.writeHead(200, {'Content-Type': ct});
            res.write(data);
            res.end();
            console.log("response sent");
        }
    });
}
    
function customJSParser(){
    let indexFile = "html/index.html"
    let replaceDetail = []; //{fn: '', searchStr: ''}
    let fcontent = fs.readFileSync(indexFile, 'utf8');
    let searchResult = fcontent.match(/include=.*/gm);
    for(var i=0; i<searchResult.length; i++){
        replaceDetail[i] = {
            fn: searchResult[i].split("=")[1],
            searchString: searchResult[i]
        }
    }
    for(var i=0; i<searchResult.length; i++){
        let replacedWith = fs.readFileSync("html/"+replaceDetail[i].fn, 'utf8');
        fcontent = fcontent.replace(replaceDetail[i].searchString, replacedWith)
    }
    console.log(replaceDetail);
    fs.writeFileSync("index.html", fcontent);
}

// customJSParser();