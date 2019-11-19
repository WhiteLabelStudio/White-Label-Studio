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
var product_demo=[];
customer = [];
project = [];
var demo=[];
var auth=[];
var contacts = [];
var auth1=[];
var auth2=[];
var trail=[];
var trailDemo=[];

router.route('/QualifiedOpportunities').get((req, res) => {
  res.json(qualified_opportunities)
});

router.route('/ProductDemos').get((req, res) => {
  res.json(product_demo)
});


router.route('/trail').get((req, res) => {
  res.json(trail)
});

router.route('/trailDemo').get((req, res) => {
  res.json(trailDemo)
});

router.route('/trail/getOpportunity').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  /*get_Trail_QO(req.body).then(function (response) {
    res.json({ 'trail': 'Added successfully' });
  });*/
  var SQL = "SELECT * FROM project where customer_id = " + req.body.customerid+" and interested_product='"+req.body.interestedproduct+"'";

  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    trail = []
    var response = result.length;

    for (i = 0; i < result.length; i++) {
      var opportunity = {
    
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
      trail.push(opportunity);
    }
 
if(result[0]){
    var SQL1 = "SELECT * FROM contact where project_id = " + result[0].project_id;
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
      trail[0].items = contacts;

      //project = qualifiedOpportunitties;
 
    });
  }
    res.json({ 'trail': 'Added successfully' });



  });
});

async function get_Trail_QO(req) {
  var SQL = "SELECT * FROM project where customer_id = " + req.customerid+" and interested_product='"+req.interestedproduct+"'";

  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    trail = []
    var response = result.length;
 
    for (i = 0; i < result.length; i++) {
      var opportunity = {
    
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
      trail.push(opportunity);
    }

    var SQL1 = "SELECT * FROM contact where project_id = " + result[0].project_id;
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
      trail[0].items = contacts;

      //project = qualifiedOpportunitties;
      res.json({ 'trail': 'Added successfully' });
    });





  });
}

router.route('/trailDemo/getDemo').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  get_Trail_PD(req.body).then(function (response) {
    res.json({ 'trailDemo': 'Added successfully' });
  });
});

async function get_Trail_PD(req) {
  var SQL = "SELECT * FROM TrailStudio.DEMO where customer_id = "+req.customerid+" and demoed_product='"+req.interestedproduct+"'";
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    trailDemo = []
    var response = result.length;
    for (i = 0; i < result.length; i++) {
      var opportunity = {    
         "demoid":result[0].demo_id,
        "projectid":result[0].project_id,
        "contactname":result[0].contact_name,
        "contactemail":result[0].contact_email,
        "contact_phone":result[0].contact_phone,
        "interested_product":result[0].interested_product,
        "demoed_product":result[0].demoed_product,
        "demo_sales_engineer":result[0].demo_sales_engineer,
        "ipcc_resource":result[0].ipcc_resource,
        "account_manager":result[0].account_manager,
        "competitors":result[0].competitors,
        "feedback":result[0].feedback,
        "webex_url":result[0].webex_url,
        "customer_name":result[0].customer_name,
        "SCRM_number":result[0].SCRM_number,
        "expected_PO_value":result[0].expected_PO_value,
        "no_of_sites":result[0].no_of_sites,
        "CPE_type":result[0].CPE_type,
        "CPE_number":result[0].CPE_number,
        "expected_CPE_price":result[0].expected_CPE_price,
        "CPE_yearly_growth":result[0].CPE_yearly_growth,
        "expected_POC_date":result[0].expected_POC_date,
        "expected_deployment_date":result[0].expected_deployment_date,
        "VAN_service_flag":result[0].VAN_service_flag,
        "CE_integration_flag":result[0].CE_integration_flag,
        "DC_flag":result[0].DC_flag,
        "underlink_provider_flag":result[0].underlink_provider_flag,
        "demo_date":result[0].demo_date,
        "customer_id":result[0].customer_id
      };
      trailDemo.push(opportunity);
    }
  });
}



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

router.route('/ProductDemos/savePD').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);

  var values = [[req.body.customerid,
  req.body.customername,
  req.body.project,
  req.body.scrmnumber,
  req.body.expectedpovalue,
  req.body.cpettype,
  req.body.cpenumber,
  req.body.expectedcpeprice,
  req.body.cpeyearlygrowth,
  req.body.expectedpocdate,
  req.body.expecteddeploymentdate,
  req.body.vanserviceflag,
  req.body.ceintegrationflag,
  req.body.dcflag,
  req.body.underlaylink,
  req.body.interestedproduct,
   req.body.demoedproduct,
  req.body.demodate,
  req.body.weburl,
    req.body.numberofsites,
  req.body.demosalesengineering,
  req.body.ipccresource,
  req.body.accountmanager,
  req.body.compititor,
  req.body.feedback
  ]];
  MySQLCon.query("INSERT INTO DEMO (customer_id,customer_name,project_id,SCRM_number,expected_PO_value,CPE_type,CPE_number,expected_CPE_price,CPE_yearly_growth,expected_POC_date,expected_deployment_date,VAN_service_flag,CE_integration_flag,DC_flag,underlink_provider_flag,interested_product,demoed_product,demo_date,webex_url,no_of_sites,demo_sales_engineer,ipcc_resource,account_manager,competitors,feedback) VALUES ?", [values], function (err, result) {
    if (err) throw err;
  });
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
  req.body.year,
  req.body.revenue,
  req.body.salesengineer,
  req.body.endcustomerflag,
  ]];
  MySQLCon.query("INSERT INTO project (customer_id,customer_name,customer_type,end_customer_name,end_cust_infrastructure_size,interested_product,probability,q1,q2,q3,q4,qualified_opportunity_flag,region,country,state,year,revenue,sales_engineer,end_customer_flag) VALUES ?", [values], function (err, result) {
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
router.route('/ProductDemos/updatePD').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var values = [[
  req.body.demo_id,
  req.body.project_id,
  req.body.interested_product,
  req.body.demoed_product,
  req.body.demo_sales_engineer,
  req.body.ipcc_resource,
  req.body.account_manager,
  req.body.competitors,
  req.body.feedback,
  req.body.webex_url,
  req.body.customer_name,
  req.body.SCRM_number,
  req.body.expected_PO_value,
  req.body.no_of_sites,
  req.body.CPE_type,
  req.body.CPE_number,
  req.body.expected_CPE_price,
  req.body.CPE_yearly_growth,
  req.body.expected_POC_date,
  req.body.expected_deployment_date,
  req.body.VAN_service_flag,
  req.body.CE_integration_flag,
  req.body.DC_flag,
  req.body.underlink_provider_flag,
  req.body.demo_date,
  req.body.customer_id,
  ]];

  SQL = "UPDATE DEMO SET interested_product = '"+req.body.interested_product+"' , demoed_product = '"+req.body.demoed_product+"' , demo_sales_engineer = '"+req.body.demo_sales_engineer+"' , ipcc_resource='"+req.body.ipcc_resource+"' , account_manager='"+req.body.account_manager+"' , competitors='"+req.body.competitors+"' , feedback='"+req.body.feedback+"' , webex_url='"+req.body.webex_url+"' , customer_name='"+req.body.customer_name+"' , SCRM_number='"+req.body.SCRM_number+"' , expected_PO_value='"+req.body.expected_PO_value+"' , no_of_sites='"+req.body.no_of_sites+"'  , CPE_type='"+req.body.CPE_type+"' , CPE_number='"+req.body.CPE_number+"' , expected_CPE_price = '"+req.body.expected_CPE_price+"' , CPE_yearly_growth='"+req.body.CPE_yearly_growth+"' , expected_POC_date ='"+req.body.expected_POC_date+"' , expected_deployment_date='"+req.body.expected_deployment_date+"' , VAN_service_flag='"+req.body.VAN_service_flag+"' , CE_integration_flag='"+req.body.CE_integration_flag+"', DC_flag = '"+req.body.DC_flag+"' , underlink_provider_flag = '"+req.body.underlink_provider_flag+"',demo_date = '"+req.body.demo_date+"',customer_id = '"+req.body.customer_id+"' WHERE demo_id ="+req.body.demo_id;
  MySQLCon.query(SQL, function (err, result) {
    if (err) throw err;
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
  req.body.year,
  req.body.status,
  req.body.revenue,
  req.body.endcustomerflag,
  req.body.salesEngineer
  ]];

  SQL = "UPDATE project SET customer_type = '"+req.body.customertype+"' , customer_name = '"+req.body.customername+"' , interested_product = '"+req.body.interestedproduct+"' , probability='"+req.body.probability+"' , region='"+req.body.region+"' , country='"+req.body.country+"' , state='"+req.body.state+"' , q1='"+req.body.q1+"' , q2='"+req.body.q2+"' , q3='"+req.body.q3+"' , q4='"+req.body.q4+"' , qualified_opportunity_flag='"+req.body.qualifiedopportubityflag+"'  , end_customer_name='"+req.body.endcustomer+"' , year='"+req.body.year+"' , end_cust_infrastructure_size = '"+req.body.endCustomerinfrastructure+"' , status='"+req.body.status+"' , revenue ='"+req.body.revenue+"' , end_customer_flag='"+req.body.endcustomerflag+"' WHERE project_id ="+req.body.projectid;

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

router.route('/ProductDemos/getPD').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  get_product_demo().then(function (response) {
    res.json({ 'product_demo': 'Added successfully' });
  });
});

async function get_product_demo() {
  MySQLCon.query("SELECT a.demo_id,b.project_id,a.demoed_product,b.interested_product,b.year,b.q1,b.q2,b.q3,b.q4,b.customer_name,b.country FROM DEMO a,project b where a.project_id = b.project_id", function (err, result, fields) {
    if (err) throw err;
    product_demo = [];
    var response = result.length;
    for (i = 0; i < result.length; i++) {
     
      var demo = {
        "projectid": result[i].project_id,
        "customername": result[i].customer_name,
        "demoid": result[i].demo_id,
        "year":result[i].year,
        "interestedproduct":result[i].interested_product,
        "demoed_product":result[i].demoed_product,
        "country":result[i].country,
        "q1":result[i].q1,
        "q2":result[i].q2,
        "q3":result[i].q3,
        "q4":result[i].q4
      };
      product_demo.push(demo);

    }

  });
}


router.route('/QualifiedOpportunities/getQO').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  get_qualified_opportunities().then(function (response) {
    res.json({ 'qualified_opportunities': 'Added successfully' });
  });
});

async function get_qualified_opportunities() {
  MySQLCon.query("SELECT * FROM project where project_id not in(SELECT project_id FROM DEMO)", function (err, result, fields) {
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
        "status": result[i].status,
        "interestedproduct":result[i].interested_product,
        "q1":result[i].q1,
        "q2":result[i].q2,
        "q3":result[i].q3,
        "q4":result[i].q4,
        "year": result[i].year,
      };
      qualified_opportunities.push(opportunity);
    }
  });
}

router.route('/project').get((req, res) => {

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
        "revenue": result[i].revenue,
        "salesEngineer": result[i].sales_engineer
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


router.route('/demo').get((req, res) => {
  res.json(demo)
});

router.route('/demo/getDemo').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var projectidNum = req.body.toString();
  var str = JSON.stringify(req.body, null, 4);
  get_pd(req.body.demoid).then(function (response) {
    res.json({ 'demo': 'Added successfully' });
  });
});


async function get_pd(t) {
  var SQL = "SELECT * FROM demo where demo_id = " + t;
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    demo = [];
    for (i = 0; i < result.length; i++) {
      var opportunity = {
        "demoid":result[0].demo_id,
        "projectid":result[0].project_id,
        "contactname":result[0].contact_name,
        "contactemail":result[0].contact_email,
        "contact_phone":result[0].contact_phone,
        "interested_product":result[0].interested_product,
        "demoed_product":result[0].demoed_product,
        "demo_sales_engineer":result[0].demo_sales_engineer,
        "ipcc_resource":result[0].ipcc_resource,
        "account_manager":result[0].account_manager,
        "competitors":result[0].competitors,
        "feedback":result[0].feedback,
        "webex_url":result[0].webex_url,
        "customer_name":result[0].customer_name,
        "SCRM_number":result[0].SCRM_number,
        "expected_PO_value":result[0].expected_PO_value,
        "no_of_sites":result[0].no_of_sites,
        "CPE_type":result[0].CPE_type,
        "CPE_number":result[0].CPE_number,
        "expected_CPE_price":result[0].expected_CPE_price,
        "CPE_yearly_growth":result[0].CPE_yearly_growth,
        "expected_POC_date":result[0].expected_POC_date,
        "expected_deployment_date":result[0].expected_deployment_date,
        "VAN_service_flag":result[0].VAN_service_flag,
        "CE_integration_flag":result[0].CE_integration_flag,
        "DC_flag":result[0].DC_flag,
        "underlink_provider_flag":result[0].underlink_provider_flag,
        "demo_date":result[0].demo_date,
        "customer_id":result[0].customer_id
      };
      demo.push(opportunity);
    }
  });
}

router.route('/auth').get((req, res) => {
  res.json(auth1)
});


router.route('/auth/getUser').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var projectidNum = req.body.toString();
  var str = JSON.stringify(req.body, null, 4);
  get_user(req.body.useremail).then(function (response) {
    res.json({ 'auth1': 'Added successfully' });
  });
});


async function get_user(t) {
  var SQL = "SELECT * FROM users where user_email = '" + t+"'";
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    auth1 = [];

    
      var usr = {
        "user_id":result[0].user_id,
        "username":result[0].username,
        "first_name":result[0].first_name,
        "last_name":result[0].last_name,
        "user_email":result[0].user_email,
        "password":result[0].password
      };
      auth1.push(usr);
    
  });
}

router.route('/auth2').get((req, res) => {
  res.json(auth2)
});

router.route('/auth2/getUsers').post((req, res) => {
  get_all_user().then(function (response) {
    res.json({ 'auth2': 'Added successfully' });
  });
});


async function get_all_user() {

  var SQL = "SELECT * FROM users";
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    auth2 = [];

    for (i = 0; i < result.length; i++) {
      var usr = {
        "user_id":result[i].user_id,
        "username":result[i].username,
        "first_name":result[i].first_name,
        "last_name":result[i].last_name,
        "user_email":result[i].user_email,
        "password":result[i].password
      };
      auth2.push(usr);
    }
  });
}


router.route('/auth/register').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var values = [[
  req.body.firstname,
  req.body.lastname,
  req.body.password,
  req.body.email
  ]];

  MySQLCon.query("INSERT INTO users (first_name,last_name,password,user_email) VALUES ?", [values], function (err, result) {

    if (err) throw err;
  });
});

