
    console.log("Import aws-sdk")
    var
      aws = require('aws-sdk'),
      simpledb;
    console.log("Connecting to DB")


    //We'll use the Irland datacenter, change the region / endpoint for other datacenters http://docs.aws.amazon.com/general/latest/gr/rande.html#sdb_region
    simpledb = new aws.SimpleDB({
      accessKeyId: 'AKIAIZFPXKJIAATACDUA',
      secretAccessKey: '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',
      region: 'eu-west-1',
      endpoint: 'https://sdb.eu-west-1.amazonaws.com'
    });

    console.log("List the domain");

    simpledb.listDomains({}, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });


	var params = {
      Attributes: [
        {
          Name: 'fingerprint', 
          Value: 'user2', 
          Replace: true
        },
         {
          Name: 'name', 
          Value: 'nathan',
          Replace: true
        },
         {
          Name: 'animal',
          Value: 'eagle',
          Replace: true
        }
      ],
      DomainName: 'votes', 
      ItemName: 'user2/nathan'
    };
    simpledb.putAttributes(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });  
    
    params = {
      SelectExpression: 'SELECT * FROM votes', /* required */
    };

    simpledb.select(params, function (err, data) {
      if (err) {
        console.log(err);
     
      } else {
        console.log(JSON.stringify(data,null,' '));
       
      }
    });

    // TODO implement
    console.log("Done")


