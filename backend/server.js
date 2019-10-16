console.log("Node Js file is running..");
var mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');

var MySQLCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nokia123",
  database: "TrailStudio"
});

MySQLCon.connect(function (err) {
  if (err) throw err;
  else
    console.log("Connected to database!");
});





const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));


var qualified_opportunities = [];
customer = [];
project = [];
var contacts = [];

router.route('/QualifiedOpportunities').get((req, res) => {
  res.json(qualified_opportunities)
});


router.route('/QualifiedOpportunities/saveCustomer').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var values = [[
    req.body.customername,
    req.body.customertype,
    req.body.region,
    req.body.country,
    req.body.state,
    req.body.status
  ]];
  MySQLCon.query("INSERT INTO customer (customer_name,customer_type,region,country,state,status) VALUES ?", [values], function (err, result) {
    if (err) throw err;
  });

});



router.route('/customer').get((req, res) => {
  res.json(customer)
});

router.route('/customer/getCustomer').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  MySQLCon.query("SELECT * FROM customer", function (err, result, fields) {
    if (err) throw err;
    customer = [];
    var response = result.length;
    for (i = 0; i < result.length; i++) {
      var opportunity = {
        "customerid": result[i].customer_id,
        "customername": result[i].customer_name,
        "customertype": result[i].customer_type,
        "region": result[i].region,
        "country": result[i].country,
        "state": result[i].state,
        "status": result[i].status
      };
      customer.push(opportunity);
    }
  });
  res.json({ 'customer': 'Added successfully' });
});



router.route('/QualifiedOpportunities/saveQO').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var values = [[req.body.customerid,
  req.body.customername,
  req.body.customertype,
  req.body.endcustomer,
  req.body.endCustomerinfrastructure,
  req.body.interestedproduct,
  req.body.probability,
  req.body.q1,
  req.body.q2,
  req.body.q3,
  req.body.q4,
  req.body.qualifiedopportubityflag,
  req.body.region,
  req.body.country,
  req.body.state,
  req.body.year
  ]];
  MySQLCon.query("INSERT INTO project (customer_id,customer_name,customer_type,end_customer_name,end_cust_infrastructure_size,interested_product,probability,q1,q2,q3,q4,qualified_opportunity_flag,region,country,state,year) VALUES ?", [values], function (err, result) {
    if (err) throw err;
    var values = [];
    for (var i = 0; i < req.body.items.length; i++) {
      var ContactsObj = [
        result.insertId,
        req.body.items[i].name,
        req.body.items[i].contactPhone,
        req.body.items[i].jobTitle,
        req.body.items[i].contactEmail
      ];
      values.push(ContactsObj);
    }
    MySQLCon.query("INSERT INTO contact (project_id,contact_name,contact_phone,contact_job_title,contact_email) VALUES ?", [values], function (err, result) {
      if (err) throw err;
    });
  });
});

router.route('/QualifiedOpportunities/updateQO').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var values = [[req.body.customerid,
  req.body.customername,
  req.body.customertype,
  req.body.endcustomer,
  req.body.endCustomerinfrastructure,
  req.body.interestedproduct,
  req.body.probability,
  req.body.q1,
  req.body.q2,
  req.body.q3,
  req.body.q4,
  req.body.qualifiedopportubityflag,
  req.body.region,
  req.body.country,
  req.body.state,
  req.body.year
  ]];

  SQL = "UPDATE project SET customer_type = '"+req.body.customertype+"' WHERE project_id ="+req.body.projectid;
  console.log(SQL);
  MySQLCon.query(SQL, function (err, result) {
    if (err) throw err;
    DELETE = "DELETE FROM contact where project_id = "+req.body.projectid;
    MySQLCon.query(DELETE, function (err, result) {
      var values = [];
      for (var i = 0; i < req.body.items.length; i++) {
        var ContactsObj = [
          req.body.projectid,
          req.body.items[i].name,
          req.body.items[i].contactPhone,
          req.body.items[i].jobTitle,
          req.body.items[i].contactEmail
        ];
        values.push(ContactsObj);
      }
      MySQLCon.query("INSERT INTO contact (project_id,contact_name,contact_phone,contact_job_title,contact_email) VALUES ?", [values], function (err, result) {
        if (err) throw err;
      });
    });
  });
});


router.route('/QualifiedOpportunities/getQO').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  get_qualified_opportunities().then(function (response) {
    res.json({ 'qualified_opportunities': 'Added successfully' });
  });
});

async function get_qualified_opportunities() {
  MySQLCon.query("SELECT * FROM project", function (err, result, fields) {
    if (err) throw err;
    qualified_opportunities = [];
    var response = result.length;
    for (i = 0; i < result.length; i++) {
      var opportunity = {
        "projectid": result[i].project_id,
        "customerid": result[i].customer_id,
        "customername": result[i].customer_name,
        "customertype": result[i].customer_type,
        "region": result[i].region,
        "country": result[i].country,
        "state": result[i].state,
        "status": result[i].status
      };
      qualified_opportunities.push(opportunity);
    }
  });
}

router.route('/project').get((req, res) => {
  console.log(project);
  res.json(project)
});

router.route('/project/getProject').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var projectidNum = req.body.toString();
  var SQL = "SELECT * FROM project where project_id = " + req.body.projectid;
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    project = [];
    var qualifiedOpportunitties = []
    var response = result.length;
    for (i = 0; i < result.length; i++) {
      var opportunity = {
        "projectid": result[i].project_id,
        "customerid": result[i].customer_id,
        "customername": result[i].customer_name,
        "customertype": result[i].customer_type,
        "interestedproduct": result[i].interested_product,
        "status": result[i].status,
        "probability": result[i].probability,
        "region": result[i].region,
        "country": result[i].country,
        "state": result[i].state,
        "status": result[i].status,
        "year": result[i].year,
        "q1": result[i].q1,
        "q2": result[i].q2,
        "q3": result[i].q3,
        "q4": result[i].q4,
        "qualifiedOpportunity": result[i].qualified_opportunity_flag,
        "endCustomerFlag": result[i].end_customer_flag,
        "endCustomerName": result[i].end_customer_name,
        "revenue": result[i].revenue
      };
      qualifiedOpportunitties.push(opportunity);
      //project.push(opportunity);
    }

    var SQL1 = "SELECT * FROM contact where project_id = " + req.body.projectid;
    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      contacts = [];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].contact_name,
          contactPhone: result1[j].contact_phone,
          jobTitle: result1[j].contact_job_title,
          contactEmail: result1[j].contact_email
        };
        contacts.push(contact);
      }
      qualifiedOpportunitties[0].items = contacts;
      project = qualifiedOpportunitties;
      res.json({ 'project': 'Added successfully' });
    });
  });

 
});


