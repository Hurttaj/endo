var https = require("https");

const fs = require('fs');

var request = require("request");

/*var url = 'https://www.endomondo.com/rest/v1/users/14984220/workouts/latest';*/

var query = function(i){
console.log("Hello");
https.get('https://www.endomondo.com/rest/v1/users/'+i+'/workouts/latest', function(res){
    var body = '';

    res.on('data', function(chunk){
        body+=chunk;
    console.log("checking: " + i);
    });
    res.on('end', function(){
        try{
        var response = JSON.parse(body);
        console.log("response:", response);
        let info = JSON.stringify(response);
        fs.appendFileSync('endodata.json',info);
        try{
        console.log("response:", response.laps.metric[0].begin_latitude);
        console.log("response:", response.laps.metric[0].begin_longitude);
        if ((62.168999 < parseFloat(response.laps.metric[0].begin_longitude)) && ((parseFloat(response.laps.metric[0].begin_longitude) < 62.297402) && (25.582083 < parseFloat(response.laps.metric[0].begin_longitude)) && parseFloat(response.laps.metric[0].begin_longitude) < 25.836870))
        {
            let ID = JSON.stringify(response.author.id);
            fs.appendFileSync('IDs.json',ID+', ');
            console.log("ID: " + response.id)

        }
    }
    catch(error)
    {console.error(error);
    console.log("no laps");}
    }
    catch(error)
    {console.error(error);
        console.log("not json");}
    });
    
    if (i > 0){
        query(i-1);
        }
}).on('error', function(e){
    console.log("error:",e);
    console.log(" hang");
});

}
query(40000000);
/*35000000
40000000
39301909*/
