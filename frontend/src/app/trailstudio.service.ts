import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TrailstudioService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  //Initilize Qualified opportunity
  getQualifiedOpportunities() {
    console.log("I am in getQualifiedOpportunities of trailstudio.service");
    return this.http.get(`${this.uri}/QualifiedOpportunities`);
  }


  //Initilize Qualified opportunity
  getProductDemos() {
    console.log("I am in getProductDemos of trailstudio.service");
    return this.http.get(`${this.uri}/ProductDemos`);
  }


  //get All customer contacts
  getCustomer() {
    console.log("I am in getQualifiedOpportunities of trailstudio.service");
    return this.http.get(`${this.uri}/customer`);
  }

  getCustomerDetails() {
    const find_stations_at = {
      //placeName: placeName;
    };
    var str = JSON.stringify(find_stations_at, null, 2);
    console.log("JSON added successfully");
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/customer/getCustomer`, find_stations_at, httpOptions);
  }

  //Save customer contact
  saveCustomerContact(f){
    console.log("Saving customer from service..");
     console.log(f);
     var customer={
      customername: f.customerName,
      customertype: f.customerType,
      region: f.region,
      country: f.country,
      state:f.state,
      status:f.status
     };
     console.log("-----------------------");
     console.log(customer);
     return this.http.post(`${this.uri}/QualifiedOpportunities/saveCustomer`, customer, httpOptions);
  }

  //Save Product Demos
  insertProductDemos(f){
console.log("I am returning pd from service :",f);
var pd = {customerid:f.customerId,
customername:f.customerName,
project:f.project,
scrmnumber:f.SCRMNumber,
expectedpovalue:f.expectedPOValue,
cpettype:f.CPEType,
cpenumber:f.CPENumber,
expectedcpeprice:f.expectedCPEPrice,
cpeyearlygrowth:f.CPEYearlyGrowth,
expectedpocdate:f.expectedPOCDate,
expecteddeploymentdate:f.expectedDeploymentDate,
vanserviceflag:f.VANServiceFlag,
ceintegrationflag:f.CEIntegrationFlag,
dcflag:f.DCFlag,
underlaylink:f.underlaylink,
interestedproduct:f.interestedProduct,
demoedproduct:f.demoedProduct,
demodate:f.demoDate,
weburl:f.webExUrl,
numberofsites:f.noOfSites,
demosalesengineering:f.demoSalesEngineer,
ipccresource:f.IPCCResource,
accountmanager:f.accountManager,
compititor:f.competitor,
feedback:f.feedback
  }
  return this.http.post(`${this.uri}/ProductDemos/savePD`, pd, httpOptions);
  }

  //Save Qualified Oppoetunity
  insertQualifiedOpportynity(f) {
    console.log("saving QO : insertQualifiedOpportynity(f)");
    var QO = {
      customerid: f.customerId,
      customername: f.customerName,
      endcustomer: f.endCustomerName,
      customertype: f.customerType,
      region: f.region,
      country: f.country,
      state:f.state,
      year:f.year,
      endCustomerinfrastructure:f.endCustomerInfrastructure,
      probability: f.probability,
      interestedproduct: f.interestedProduct,
      q1: f.q1 ? 'Yes' : 'No',
      q2: f.q2 ? 'Yes' : 'No',
      q3: f.q3 ? 'Yes' : 'No',
      q4: f.q4 ? 'Yes' : 'No',
      qualifiedopportubityflag: f.qualifiedOpportunity,
      revenue: f.revenue,
      salesengineer:f.salesEngineer,
      items:f.items
    };
    return this.http.post(`${this.uri}/QualifiedOpportunities/saveQO`, QO, httpOptions);
  }


  //update qualified opportunity
  updateQualifiedOpportunity(f){
    console.log("To test end customer flag.",f);
    var QO = {
      projectid: f.projectid,
      customerid: f.customerId,
      customername: f.customerName,
      endcustomer: f.endCustomerName,
      customertype: f.customerType,
      region: f.region,
      country: f.country,
      state:f.state,
      year:f.year,
      endCustomerinfrastructure:f.endCustomerInfrastructure,
      probability: f.probability,
      interestedproduct: f.interestedProduct,
      q1: f.q1 ? 'Yes' : 'No',
      q2: f.q2 ? 'Yes' : 'No',
      q3: f.q3 ? 'Yes' : 'No',
      q4: f.q4 ? 'Yes' : 'No',
      qualifiedopportubityflag: f.qualifiedOpportunity,
      items:f.items,
      status:f.status,
      revenue:f.revenue,
      endcustomerflag:f.endCustomerFlag,
      salesengineer:f.salesEngineer
    };
    return this.http.post(`${this.uri}/QualifiedOpportunities/updateQO`, QO, httpOptions);
  }


  //Update Product Demo
  updateProductDemo(f){
    console.log("This is to update Product Demos");
    console.log(f);
    var QO = {
      demo_id:f.demoid,
  project_id:f.projectId,
  interested_product:f.interestedProduct,
  demoed_product:f.demoedProduct,
  demo_sales_engineer:f.demoSalesEngineer,
  ipcc_resource:f.IPCCResource,
  account_manager:f.accountManager,
  competitors:f.competitor,
  feedback:f.feedback,
  webex_url:f.webExUrl,
  customer_name:f.customerName,
  SCRM_number:f.SCRMNumber,
  expected_PO_value:f.expectedPOValue,
  no_of_sites:f.noOfSites,
  CPE_type:f.CPEType,
  CPE_number:f.CPENumber,
  expected_CPE_price:f.expectedCPEPrice,
  CPE_yearly_growth:f.CPEYearlyGrowth,
  expected_POC_date:f.expectedPOCDate,
  expected_deployment_date:f.expectedDeploymentDate,
  VAN_service_flag:f.VANServiceFlag,
  CE_integration_flag: f.CEIntegrationFlag,
  DC_flag:f.DCFlag,
  underlink_provider_flag:f.underlaylink,
  demo_date:f.demoDate,
  customer_id:f.customerId  
    };
    return this.http.post(`${this.uri}/ProductDemos/updatePD`, QO, httpOptions);
  }

  //Get All Qualified Opportunitties
  
  getAllQualifiedOpportunities(){
    const find_stations_at = {
      //placeName: placeName;
    };
    var str = JSON.stringify(find_stations_at, null, 2);
    console.log("JSON added successfully");
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/QualifiedOpportunities/getQO`, find_stations_at, httpOptions);
  }

  //Get All product demos
  getAllProductDemos(){
    console.log("I am in getAllProductDemos trailstudio.service");
    return this.http.post(`${this.uri}/ProductDemos/getPD`, httpOptions); 
  }



  //Get Project Details
  getProject() {
    console.log("I am in getQualifiedOpportunities of trailstudio.service");
    return this.http.get(`${this.uri}/project`);
  }

  getProjectDetails(p){
    const project = {
      projectid: p
    };
    var str = JSON.stringify(project, null, 2);
    console.log("JSON added successfully");
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/project/getProject`, project, httpOptions);
  }
  

  //Get DEMO Details
  getDemo() {
    console.log("I am in getQualifiedOpportunities of trailstudio.service");
    return this.http.get(`${this.uri}/demo`);
  }

  getDemoDetails(p){
    const demo = {
      demoid: p
    };
    console.log("JSON added successfully");
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/demo/getDemo`, demo, httpOptions);
  }


  //login User (Get User Details)
  getUser() {
    console.log("I am in getUser of trailstudio.service");
    return this.http.get(`${this.uri}/auth`);
  }

  getUserDetails(p){
    const user = {
      useremail: p.email
    };
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/auth/getUser`, user, httpOptions);
  }

  //Register user
  registerUser(p){
    const user = {
      email: p.email,
      firstname:p.firstname,
      lastname:p.lastname,
      password:p.password
    };
    return this.http.post(`${this.uri}/auth/register`, user, httpOptions);
  }

 //login User (Get User Details)
 getUser2() {
  console.log("I am in getUser of trailstudio.service");
  return this.http.get(`${this.uri}/auth2`);
 }


  getAllUsers(){
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/auth2/getUsers`, httpOptions);
  }



  //get Trail Details for Customer and Demo
  getTrail() {
    console.log("I am in getUser of trailstudio.service");
    return this.http.get(`${this.uri}/trail`);
   }
  
  
    getOpportunityTrailDetails(t){
      console.log("These are customer and product Details",t);
      const p = {
        customerid:t.customerId,
        interestedproduct:t.interestedProduct
      };
      return this.http.post(`${this.uri}/trail/getOpportunity`, p,httpOptions);
    }

    getTrailforDemo() {
      console.log("I am in getUser of trailstudio.service");
      return this.http.get(`${this.uri}/trailDemo`);
     }

    getDemoTrailDetails(t){
      console.log("I am in showQualifiedOpportunities trailstudio.service");
      const p = {
        customerid:t.customerId,
        interestedproduct:t.interestedProduct
      };
      return this.http.post(`${this.uri}/trailDemo/getDemo`,p, httpOptions);
    }

}
