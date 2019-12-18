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
console.log("Called...");

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
var SolutionTrail=[];
var SolutionTrail1=[];
var hasBeenCalled = false;
var Called = false;
var QOCalled = false;


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

router.route('/SolutionTrail').get((req, res) => {
  res.json(SolutionTrail)
});

router.route('/SolutionTrail/getAllTrails').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  var SQL = "SELECT * FROM SolutionTrail";
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    SolutionTrail = []
    var response = result.length;
  
    for (i = 0; i < result.length; i++) {
      var opportunity = {  
        "trailid":result[i].trail_id,
        "customername": result[i].customer_name,
        "cloudflag": result[i].CloudFlag,
        "package": result[i].Package
      };
      SolutionTrail.push(opportunity);
    }
    console.log("response...",SolutionTrail);
    res.json({ 'SolutionTrail': 'Added successfully' });

  });
});

router.route('/SolutionTrail1').get((req, res) => {
  res.json(SolutionTrail1)
});
router.route('/SolutionTrail1/getTrailData').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  console.log(req.body.trail);
  var SQL = "SELECT * FROM SolutionTrail WHERE trail_id='"+req.body.trail+"'";
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    SolutionTrail1 = []
    var response = result.length;
  console.log(result[0]);
    for (i = 0; i < result.length; i++) {
      var opportunity = { 
        "trail_id":result[i].trail_id,
  "demo_id":result[i].demo_id,
  "customer_id":result[i].customer_id,
  "customer_name":result[i].customer_name,
  "project_id":result[i].project_id,
  "SCRM_number":result[i].SCRM_number,
  "expected_PO_value":result[i].expected_PO_value,
  "CPE_type":result[i].CPE_type,
  "CPE_number":result[i].CPE_number,
  "expected_CPE_price":result[i].expected_CPE_price,
  "CPE_yearly_growth":result[i].CPE_yearly_growth,
  "expected_POC_date":result[i].expected_POC_date,
  "expected_deployment_date ":result[i].expected_deployment_date,
  "VAN_service_flag":result[i].VAN_service_flag,
  "CE_integration_flag":result[i].CE_integration_flag,
  "DC_flag":result[i].DC_flag,
  "underlink_provider_flag":result[i].underlink_provider_flag,
  "contact_name":result[i].contact_name,
  "contact_email":result[i].contact_email,
  "contact_phone":result[i].contact_phone,
  "interested_product":result[i].interested_product,
  "demoed_product":result[i].demoed_product,
  "demo_sales_engineer":result[i].demo_sales_engineer,
  "ipcc_resource":result[i].ipcc_resource,
  "account_manager":result[i].account_manager,
  "competitors":result[i].competitors,
  "feedback":result[i].feedback,
  "webex_url":result[i].webex_url,
  "no_of_sites":result[i].no_of_sites,
  "demo_date":result[i].demo_date,
  "SpeedUnderlayConn":result[i].SpeedUnderlayConn,
  "ExpectedThroughputReq":result[i].ExpectedThroughputReq,
  "OtherAppReq":result[i].OtherAppReq,
  "InternetBreakoutReq":result[i].InternetBreakoutReq,
  "RoutingReq":result[i].RoutingReq,
  "CloudFlag":result[i].CloudFlag,
  "Vendor":result[i].Vendor,
  "LinkProvider":result[i].LinkProvider,
  "ExistingCustApp":result[i].ExistingCustApp,
  "endCustomerFlag":result[i].endCustomerFlag,
  "WithLTE":result[i].WithLTE,
  "WithoutLTE":result[i].WithoutLTE,
  "WithWifi":result[i].WithWifi,
  "WithoutWifi":result[i].WithoutWifi,
  "WithVNF":result[i].WithVNF,
  "WithoutVNF":result[i].WithoutVNF,
  "WithLTECPENumber":result[i].WithLTECPENumber,
  "WithWifiCPENumber":result[i].WithWifiCPENumber,
  "WithVNFCPENumber":result[i].WithVNFCPENumber,
  "Package":result[i].Package,
  "feature":result[i].feature,
  "SDWANServiceFlag":result[i].SDWANServiceFlag,
  "basicSDWAN":result[i].basicSDWAN,
  "advancedFeaturesFlag":result[i].advancedFeaturesFlag,
  "webFilteringFlag":result[i].webFilteringFlag,
  "noOfTenentsFlag":result[i].noOfTenentsFlag,
  "noOfNSGFlag":result[i].noOfNSGFlag,
  "sassgatewayFlag":result[i].sassgatewayFlag,
  "cloudGateway":result[i].cloudGateway,
  "portalServiceFlag":result[i].portalServiceFlag,
  "MPLSSupport":result[i].MPLSSupport,
  "platformRedendencyQ5":result[i].platformRedendencyQ5,
  "GeoDistributedVSDQ6":result[i].GeoDistributedVSDQ6,
  "SecurityPoliciesQ3":result[i].SecurityPoliciesQ3,
  "SecurityPoliciesQ4":result[i].SecurityPoliciesQ4,
  "TopologyQ7":result[i].TopologyQ7,
  "NSGOperationsQ8":result[i].NSGOperationsQ8,
  "NATTraversalQ12":result[i].NATTraversalQ12,
  "NSGBRQ13":result[i].NSGBRQ13,
  "NSGBRCategory":result[i].NSGBRCategory,
  "ConnectivityQ17":result[i].ConnectivityQ17,
  "Connectivity18":result[i].Connectivity18,
  "PATtoOverlayQ20":result[i].PATtoOverlayQ20,
  "DNAQ23":result[i].DNAQ23,
  "IPSECQ29":result[i].IPSECQ29,
  "IPSECQ30":result[i].IPSECQ30,
  "IPSECQ31":result[i].IPSECQ31,
  "IPSECQ32":result[i].IPSECQ32,
  "WiFionNSGQ35":result[i].WiFionNSGQ35,
  "NSGUBRCategory":result[i].NSGUBRCategory,
  "PostalServicesReq":result[i].PostalServicesReq,
  "ServiceChainingQ22":result[i].ServiceChainingQ22,
  "ServiceChainingCategory":result[i].ServiceChainingCategory,
  "VNF33":result[i].VNF33,
  "VNF34":result[i].VNF34,
  "VNFCategory":result[i].VNFCategory,
  "webFilteringCategory":result[i].webFilteringCategory,
  "BootstrapQ1":result[i].BootstrapQ1,
  "BootstrapQ2":result[i].BootstrapQ2,
  "BootstrapQ2_1":result[i].BootstrapQ2_1,
  "BootstrapQ2_2":result[i].BootstrapQ2_2,
  "BootstrapQ2_3":result[i].BootstrapQ2_3,
  "BootstrapQ2_4":result[i].BootstrapQ2_4,
  "BootstrapQ2_5":result[i].BootstrapQ2_5,
  "DualUplinkQ11":result[i].DualUplinkQ11,
  "RoutingQ24":result[i].RoutingQ24,
  "RoutingQ25":result[i].RoutingQ25,
  "RoutingQ26":result[i].RoutingQ26,
  "RoutingQ27":result[i].RoutingQ27,
  "RoutingQ28":result[i].RoutingQ28,
  "summary":result[i].summary,
  "verifyFlag":result[i].verifyFlag

      };
      SolutionTrail1.push(opportunity);
    }
    console.log("response...",SolutionTrail);
    res.json({ 'SolutionTrail1': 'Added successfully' });

  });
});

var i=0;

router.route('/saveQO').post((req, res) => {
  QOCalled = false;
  var str = JSON.stringify(req.body, null, 4);
  insertQODetails(req.body).then(function (response) {
    return;
  });

});

async function insertQODetails(req) {
  if (QOCalled) {
    throw Error("Attempted to call callback twice")
  } else {
    QOCalled = true;
    var values = [[req.customerid,
      req.customername,
      req.customertype,
      req.endcustomer,
      req.endCustomerinfrastructure,
      req.interestedproduct,
      req.probability,
      req.q1,
      req.q2,
      req.q3,
      req.q4,
      req.qualifiedopportubityflag,
      req.region,
      req.country,
      req.state,
      req.year,
      req.revenue,
      req.salesengineer,
      req.endcustomerflag,
      ]];
      MySQLCon.query("INSERT IGNORE INTO project (customer_id,customer_name,customer_type,end_customer_name,end_cust_infrastructure_size,interested_product,probability,q1,q2,q3,q4,qualified_opportunity_flag,region,country,state,year,revenue,sales_engineer,end_customer_flag) VALUES ?", [values], function (err, result) {
        if (err) throw err;
        var values = [];
        for (var i = 0; i < req.items.length; i++) {
          var ContactsObj = [
            result.insertId,
            req.items[i].name,
            req.items[i].contactPhone,
            req.items[i].jobTitle,
            req.items[i].contactEmail
          ];
          values.push(ContactsObj);
        }
        MySQLCon.query("INSERT IGNORE INTO contact (project_id,contact_name,contact_phone,contact_job_title,contact_email) VALUES ?", [values], function (err, result) {
          if (err) throw err;
        });
      });
}
}


router.route('/saveCustomer').post((req, res) => {
  Called = false;
  var str = JSON.stringify(req.body, null, 4);
  insertCustomerDetails(req.body).then(function (response) {
    return;
  });
});

async function insertCustomerDetails(req) {
  if (Called) {
    throw Error("Attempted to call callback twice")
  } else {
    Called = true;
  var values = [[
    req.customername,
    req.customertype,
    req.region,
    req.country,
    req.state,
    req.status
  ]];
  MySQLCon.query("INSERT IGNORE INTO customer (customer_name,customer_type,region,country,state,status) VALUES ?", [values], function (err, result) {
    if (err) throw err;
  });
}
}


router.route('/saveTrail').post((req, res) => {
  hasBeenCalled = false;
  var str = JSON.stringify(req.body, null, 4);
  get_Trail_Details(req.body).then(function (response) {
    return;
  });
});


async function get_Trail_Details(req) {
  console.log(hasBeenCalled);
  if (hasBeenCalled) {
    throw Error("Attempted to call callback twice")
  } else {
    hasBeenCalled = true;
    console.log("This is the async function......", req);
   var SQL = 'INSERT IGNORE INTO SolutionTrail (demo_id,customer_id,'+ 
   'customer_name ,'+ 
   'project_id ,'+ 
   'SCRM_number ,'+ 
   'expected_PO_value ,'+ 
   'CPE_type ,'+ 
   'CPE_number ,'+ 
   'expected_CPE_price ,'+ 
   'CPE_yearly_growth ,'+ 
   'expected_POC_date ,'+ 
   'expected_deployment_date ,'+ 
   'VAN_service_flag ,'+ 
   'CE_integration_flag ,'+ 
   'DC_flag ,'+ 
   'underlink_provider_flag ,'+ 
   'interested_product ,'+ 
   'demoed_product ,'+ 
   'demo_sales_engineer ,'+ 
   'competitors ,'+ 
   'feedback, '+
   'webex_url ,'+ 
   'no_of_sites ,'+ 
   'demo_date ,'+ 
   'SpeedUnderlayConn ,'+ 
   'ExpectedThroughputReq ,'+ 
   'OtherAppReq ,'+ 
   'InternetBreakoutReq ,'+ 
   'RoutingReq ,'+ 
   'CloudFlag ,'+ 
   'Vendor ,'+ 
   'LinkProvider ,'+ 
   'ExistingCustApp ,'+ 
   'endCustomerFlag ,'+ 
   'WithLTE ,'+ 
   'WithoutLTE ,'+ 
   'WithWifi ,'+ 
   'WithoutWifi ,'+ 
   'WithVNF ,'+ 
   'WithoutVNF ,'+ 
   'WithLTECPENumber ,'+ 
   'WithWifiCPENumber ,'+ 
   'WithVNFCPENumber ,'+ 
   'Package ,'+ 
   'feature ,'+ 
   'SDWANServiceFlag ,'+ 
   'basicSDWAN ,'+ 
   'advancedFeaturesFlag ,'+ 
   'webFilteringFlag ,'+ 
   'noOfTenentsFlag ,'+ 
   'noOfNSGFlag ,'+ 
   'sassgatewayFlag ,'+ 
   'cloudGateway ,'+ 
   'portalServiceFlag ,'+ 
   'MPLSSupport ,'+ 
   'platformRedendencyQ5 ,'+ 
   'GeoDistributedVSDQ6 ,'+ 
   'SecurityPoliciesQ3 ,'+ 
   'SecurityPoliciesQ4 ,'+ 
   'TopologyQ7 ,'+ 
   'NSGOperationsQ8 ,'+ 
   'NATTraversalQ12 ,'+ 
   'NSGBRQ13 ,'+ 
   'ConnectivityQ17 ,'+ 
   'Connectivity18 ,'+ 
   'PATtoOverlayQ20 ,'+ 
   'DNAQ23 ,'+ 
   'IPSECQ29 ,'+ 
   'IPSECQ30 ,'+ 
   'IPSECQ31 ,'+ 
   'IPSECQ32 ,'+ 
   'WiFionNSGQ35 ,'+ 
   'PostalServicesReq ,'+ 
   'ServiceChainingQ22 ,'+ 
   'VNF33 ,'+ 
   'VNF34 ,'+ 
   'BootstrapQ1 ,'+ 
   'BootstrapQ2 ,'+ 
   'BootstrapQ2_1 ,'+ 
   'BootstrapQ2_2 ,'+ 
   'BootstrapQ2_3 ,'+ 
   'BootstrapQ2_4 ,'+ 
   'BootstrapQ2_5 ,'+ 
   'DualUplinkQ11 ,'+ 
   'RoutingQ24 ,'+ 
   'RoutingQ25 ,'+ 
   'RoutingQ26 ,'+ 
   'RoutingQ27 ,'+ 
   'RoutingQ28 ,  summary , '+
   'verifyFlag)'+ 
  ' VALUES ?';
  values = [[req.demoId,req.customerId
    ,req.customerName
    ,req.project
    ,req.SCRMNumber
    ,req.expectedPOValue
    ,req.CPEType
    ,req.CPENumber
    ,req.expectedCPEPrice
    ,req.CPEYearlyGrowth
    ,req.expectedPOCDate
    ,req.expectedDeploymentDate
    ,req.VANServiceFlag
    ,req.CEIntegrationFlag
    ,req.DCFlag
    ,req.underlaylink
    ,req.interestedProduct
    ,req.demoedProduct
    ,req.demoSalesEngineer
    ,req.competitor
    ,req.feedback
    ,req.webExUrl
    ,req.noOfSites
    ,req.demoDate
    ,req.speedUnderlayConn
    ,req.expectedThroughputReq
    ,req.OtherAppReq
    ,req.internetBreakoutReq
    ,req.routingReq
    ,req.cloudFlag
    ,req.vendor
    ,req.linkProvider
    ,req.ExistingCustApp
    ,req.endCustomerFlag
    ,req.WithLTE
    ,req.WithoutLTE
    ,req.WithWifi
    ,req.WithoutWifi
    ,req.WithVNF
    ,req.WithoutVNF
    ,req.WithLTECPENumber
    ,req.WithWifiCPENumber
    ,req.WithVNFCPENumber
    ,req.package
    ,req.feature
    ,req.SDWANServiceFlag
    ,req.basicSDWAN
    ,req.advancedFeaturesFlag
    ,req.webFilteringFlag
    ,req.noOfTenentsFlag
    ,req.noOfNSGFlag
    ,req.sassgatewayFlag
    ,req.cloudGateway
    ,req.portalServiceFlag
    ,req.MPLSSupport
    ,req.platformRedendencyQ5
    ,req.GeoDistributedVSDQ6
    ,req.SecurityPoliciesQ3
    ,req.SecurityPoliciesQ4
    ,req.TopologyQ7
    ,req.NSGOperationsQ8
    ,req.NATTraversalQ12
    ,req.NSGBRQ13
    ,req.ConnectivityQ17
    ,req.Connectivity18
    ,req.PATtoOverlayQ20
    ,req.DNAQ23
    ,req.IPSECQ29
    ,req.IPSECQ30
    ,req.IPSECQ31
    ,req.IPSECQ32
    ,req.WiFionNSGQ35
    ,req.PostalServicesReq
    ,req.ServiceChainingQ22
    ,req.VNF33
    ,req.VNF34
    ,req.BootstrapQ1
    ,req.BootstrapQ2
    ,req.BootstrapQ2_1
    ,req.BootstrapQ2_2
    ,req.BootstrapQ2_3
    ,req.BootstrapQ2_4
    ,req.BootstrapQ2_5
    ,req.DualUplinkQ11
    ,req.RoutingQ24
    ,req.RoutingQ25
    ,req.RoutingQ26
    ,req.RoutingQ27
    ,req.RoutingQ28
    ,req.summary 
    ,req.verifyFlag]];
  console.log(SQL);
   MySQLCon.query(SQL, [values], function (err, result) {
      if (err) throw err;
      console.log(result);
    });  
  }
}



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
        "customer_id":result[0].customer_id,
        "end_customer_flag":result[0].end_customer_flag
      };
      trailDemo.push(opportunity);
    }

    if(result[0] && result[0].demo_id){
    var SQL1 = "SELECT * FROM demo_contacts where name is not null and demo_id = " + result[0].demo_id;

    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      console.log(result1.length);
      contacts = [];
      opportunity={};
      var op=[];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].name,
          phone: result1[j].phone,
          title: result1[j].title,
          email: result1[j].email,
          type:result1[j].type
        };
        contacts.push(contact);       
      }
      trailDemo[0].contacts = contacts;
      console.log(trailDemo[0]);
    });
  }
  
  
  });
}

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
 
  req.body.feedback,

 

  req.body.speedUnderlayConn,
  req.body.expectedThroughputReq,
  req.body.OtherAppReq,
  req.body.internetBreakoutReq,
  req.body.routingReq,
  req.body.cloudFlag,
  req.body.vendor,
  req.body.linkProvider,
  req.body.ExistingCustApp,
  req.body.endCustomerFlag,
  req.body.WithLTE,
  req.body.WithoutLTE,
  req.body.WithWifi,
  req.body.WithoutWifi,
  req.body.WithVNF,
  req.body.WithoutVNF,
  req.body.WithLTECPENumber,
  req.body.WithVNFCPENumber,
  req.body.WithWifiCPENumber,
  req.body.compititor
  ]];
  console.log("================================================================")
  console.log(req.body);
  console.log("================================================================")
  MySQLCon.query("INSERT IGNORE INTO DEMO (customer_id,customer_name,project_id,SCRM_number,expected_PO_value,expected_CPE_price,CPE_yearly_growth,expected_POC_date,expected_deployment_date,VAN_service_flag,CE_integration_flag,DC_flag,underlink_provider_flag,interested_product,demoed_product,demo_date,webex_url,no_of_sites,feedback, SpeedUnderlayConn,ExpectedThroughputReq,OtherAppReq,internetBreakoutReq,routingReq,cloudFlag,vendor,linkProvider,ExistingCustApp,endCustomerFlag,WithLTE,WithoutLTE,WithWifi,WithoutWifi,WithVNF,WithoutVNF,WithLTECPENumber,WithVNFCPENumber,WithWifiCPENumber,competitor) VALUES ?", [values], function (err, result) {
    if (err) throw err;
    var values = [];
var contactArr = [
  req.body.salesContact,
req.body.IPCCContact,
req.body.accountManagerContact,
req.body.techinicalProjectContact,
req.body.items
]
for(var k=0; k< contactArr.length; k++){
  var contactName = contactArr[k];
    for (var i = 0; i < contactName.length; i++) {
      if(result.insertId != 0){
      var SalesContactsObj = [
        result.insertId,
        contactName[i].name,
        contactName[i].jobTitle,
        contactName[i].contactEmail,
        contactName[i].contactPhone,
        contactName[i].type
      ];
      values.push(SalesContactsObj);
    }
    }
  }
    MySQLCon.query("INSERT IGNORE INTO demo_contacts (demo_id,name,title,email,phone,type) VALUES ?", [values], function (err, result) {
      if (err) throw err;
    });
  });
});


/*router.route('/QualifiedOpportunities/saveQO').post((req, res) => {
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
});*/
router.route('/ProductDemos/updatePD').post((req, res) => {
  var str = JSON.stringify(req.body, null, 4);
  console.log("********************* Updating Data **********************************");
  console.log(req.body);
  console.log("********************* Updating Data **********************************");
  var values = [[req.body.customerid,
    req.body.customername,
    req.body.project,
    req.body.scrmnumber,
    req.body.expectedpovalue,
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
   
    req.body.feedback,
  
   
  
    req.body.speedUnderlayConn,
    req.body.expectedThroughputReq,
    req.body.OtherAppReq,
    req.body.internetBreakoutReq,
    req.body.routingReq,
    req.body.cloudFlag,
    req.body.vendor,
    req.body.linkProvider,
    req.body.ExistingCustApp,
    req.body.endCustomerFlag,
    req.body.WithLTE,
    req.body.WithoutLTE,
    req.body.WithWifi,
    req.body.WithoutWifi,
    req.body.WithVNF,
    req.body.WithoutVNF,
    req.body.WithLTECPENumber,
    req.body.WithVNFCPENumber,
    req.body.WithWifiCPENumber,
    req.body.compititor
    ]];
    SQL =    "UPDATE TrailStudio.DEMO SET customer_id= "+req.body.customerid+" ,"+
"customer_name= '"+req.body.customername+"' ,"+
"project_id= '"+req.body.projectId+"' ,"+
"SCRM_number= '"+req.body.scrmnumber+"' ,"+
"expected_PO_value= '"+req.body.expectedpovalue+"' ,"+
"expected_CPE_price= '"+req.body.expectedcpeprice+"' ,"+
"CPE_yearly_growth= '"+req.body.cpeyearlygrowth+"' ,"+
"expected_POC_date= '"+req.body.expectedpocdate+"' ,"+
"expected_deployment_date= '"+req.body.expecteddeploymentdate+"' ,"+
"VAN_service_flag= '"+req.body.vanserviceflag+"' ,"+
"CE_integration_flag= '"+req.body.ceintegrationflag+"' ,"+
"DC_flag= '"+req.body.dcflag+"' ,"+
"underlink_provider_flag= '"+req.body.underlaylink+"' ,"+
"interested_product= '"+req.body.interestedproduct+"' ,"+
"demoed_product= '"+req.body.demoedproduct+"' ,"+
"feedback= '"+req.body.feedback+"' ,"+
"webex_url= '"+req.body.weburl+"' ,"+
"no_of_sites= '"+req.body.numberofsites+"' ,"+
"demo_date= '"+req.body.demodate+"' ,"+
"SpeedUnderlayConn= '"+req.body.speedUnderlayConn+"' ,"+
"ExpectedThroughputReq= '"+req.body.expectedThroughputReq+"' ,"+
"OtherAppReq= '"+req.body.OtherAppReq+"' ,"+
"InternetBreakoutReq= '"+req.body.internetBreakoutReq+"' ,"+
"RoutingReq= '"+req.body.routingReq+"' ,"+
"CloudFlag= '"+req.body.cloudFlag+"' ,"+
"Vendor= '"+req.body.vendor+"' ,"+
"LinkProvider= '"+req.body.linkProvider+"' ,"+
"ExistingCustApp= '"+req.body.ExistingCustApp+"' ,"+
"endCustomerFlag= '"+req.body.endCustomerFlag+"' ,"+
"WithLTE= '"+req.body.WithLTE+"' ,"+
"WithoutLTE= '"+req.body.WithoutLTE+"' ,"+
"WithWifi= '"+req.body.WithWifi+"' ,"+
"WithoutWifi= '"+req.body.WithoutWifi+"' ,"+
"WithVNF= '"+req.body.WithVNF+"' ,"+
"WithoutVNF= '"+req.body.WithoutVNF+"' ,"+
"WithLTECPENumber= '"+req.body.WithLTECPENumber+"' ,"+
"WithWifiCPENumber= '"+req.body.WithVNFCPENumber+"' ,"+
"WithVNFCPENumber= '"+req.body.WithWifiCPENumber+"' , "+
"competitor= '"+req.body.compititor+"' "+
"WHERE demo_id ="+req.body.demoid;
console.log(SQL);
 // SQL = "UPDATE DEMO SET interested_product = '"+req.body.interested_product+"' , demoed_product = '"+req.body.demoed_product+"' , demo_sales_engineer = '"+req.body.demo_sales_engineer+"' , ipcc_resource='"+req.body.ipcc_resource+"' , account_manager='"+req.body.account_manager+"' , competitors='"+req.body.competitors+"' , feedback='"+req.body.feedback+"' , webex_url='"+req.body.webex_url+"' , customer_name='"+req.body.customer_name+"' , SCRM_number='"+req.body.SCRM_number+"' , expected_PO_value='"+req.body.expected_PO_value+"' , no_of_sites='"+req.body.no_of_sites+"'  , CPE_type='"+req.body.CPE_type+"' , CPE_number='"+req.body.CPE_number+"' , expected_CPE_price = '"+req.body.expected_CPE_price+"' , CPE_yearly_growth='"+req.body.CPE_yearly_growth+"' , expected_POC_date ='"+req.body.expected_POC_date+"' , expected_deployment_date='"+req.body.expected_deployment_date+"' , VAN_service_flag='"+req.body.VAN_service_flag+"' , CE_integration_flag='"+req.body.CE_integration_flag+"', DC_flag = '"+req.body.DC_flag+"' , underlink_provider_flag = '"+req.body.underlink_provider_flag+"',demo_date = '"+req.body.demo_date+"',customer_id = '"+req.body.customer_id+"' WHERE demo_id ="+req.body.demo_id;
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
console.log("Called /ProductDemos/getPD");
  var SQL = "SELECT * FROM DEMO where demo_id not in (SELECT demo_id FROM SolutionTrail where demo_id is not null)";
  console.log(SQL);
  MySQLCon.query(SQL, function (err, result, fields) {
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
    res.json({ 'product_demo': 'Added successfully' });
  });
});

async function get_product_demo() {
  MySQLCon.query("SELECT * FROM DEMO where demo_id not in (SELECT demo_id FROM SolutionTrail)", function (err, result, fields) {
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
  console.log("/QualifiedOpportunities/getQO called..");
  var str = JSON.stringify(req.body, null, 4);
  var SQL = "SELECT * FROM project where project_id not in (SELECT project_id FROM DEMO) and project_id not in (SELECT project_id FROM SolutionTrail where project_id is not null)";
  console.log(SQL);
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    qualified_opportunities = [];
    var response = result.length;
console.log(result);
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
    res.json({ 'qualified_opportunities': 'Added successfully' });
  });
});


router.route('/QualifiedOpportunities/getAllProject').post((req, res) => {
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
  var SQL = "SELECT * FROM DEMO where demo_id = " + t;
  MySQLCon.query(SQL, function (err, result, fields) {
    if (err) throw err;
    demo = [];
    console.log("*****************************************************");
    console.log(result[0]);
    console.log("*****************************************************");
    for (i = 0; i < result.length; i++) {
      var opportunity = {
        "demoid":result[0].demo_id,
        "projectid":result[0].project_id,
        "contactname":result[0].contact_name,
        "contactemail":result[0].contact_email,
        "contact_phone":result[0].contact_phone,
        "interested_product":result[0].interested_product,
        "demoed_product":result[0].demoed_product,
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
        "customer_id":result[0].customer_id,
       "competitor":result[0].competitor,
        "SpeedUnderlayConn":result[0].SpeedUnderlayConn,
        "ExpectedThroughputReq":result[0].ExpectedThroughputReq,
        "OtherAppReq":result[0].OtherAppReq,
        "RoutingReq":result[0].RoutingReq,
        "LinkProvider":result[0].LinkProvider,
        "ExistingCustApp":result[0].ExistingCustApp,
        "InternetBreakoutReq":result[0].InternetBreakoutReq,
        "CloudFlag":result[0].CloudFlag,
        "Vendor":result[0].Vendor,
        "endCustomerFlag":result[0].endCustomerFlag,
        "WithLTE":result[0].WithLTE,
        "WithoutLTE":result[0].WithoutLTE,
        "WithWifi":result[0].WithWifi,
        "WithoutWifi":result[0].WithoutWifi,
        "WithVNF":result[0].WithVNF,
        "WithoutVNF":result[0].WithoutVNF,
        "WithLTECPENumber":result[0].WithLTECPENumber,
        "WithWifiCPENumber":result[0]. WithWifiCPENumber,
        "WithVNFCPENumber":result[0].WithVNFCPENumber,
        "competitor":result[0].competitor

      };
      demo.push(opportunity);
    }

    var SQL1 = "SELECT * FROM demo_contacts where type='Sales Engineer' and demo_id = " + t;
    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      console.log(result1[0]);
      contacts = [];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].name,
          phone: result1[j].phone,
          title: result1[j].title,
          email: result1[j].email,
          type:result1[j].type
        };
        contacts.push(contact);
      }
      demo[0].salesContact = contacts;
    });

    var SQL1 = "SELECT * FROM demo_contacts where type='IPCC' and demo_id = " + t;
    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      console.log(result1[0]);
      contacts = [];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].name,
          phone: result1[j].phone,
          title: result1[j].title,
          email: result1[j].email,
          type:result1[j].type
        };
        contacts.push(contact);
      }
      demo[0].IPCC = contacts;
    });


    var SQL1 = "SELECT * FROM demo_contacts where type='Account Manager' and demo_id = " + t;
    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      console.log(result1[0]);
      contacts = [];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].name,
          phone: result1[j].phone,
          title: result1[j].title,
          email: result1[j].email,
          type:result1[j].type
        };
        contacts.push(contact);
      }
      demo[0].AccMgr = contacts;
    });


    var SQL1 = "SELECT * FROM demo_contacts where type='TPM' and demo_id = " + t;
    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      console.log(result1[0]);
      contacts = [];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].name,
          phone: result1[j].phone,
          title: result1[j].title,
          email: result1[j].email,
          type:result1[j].type
        };
        contacts.push(contact);
      }
      demo[0].TPM = contacts;
    });


    var SQL1 = "SELECT * FROM demo_contacts where type='contact' and demo_id = " + t;
    MySQLCon.query(SQL1, function (err, result1, fields) {
      if (err) throw err;
      console.log(result1[0]);
      contacts = [];
      for (var j = 0; j < result1.length; j++) {
        var contact = {
          name: result1[j].name,
          phone: result1[j].phone,
          title: result1[j].title,
          email: result1[j].email,
          type:result1[j].type
        };
        contacts.push(contact);
      }
      demo[0].item = contacts;
    });


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

