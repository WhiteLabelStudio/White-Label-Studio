import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';

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
  i=0;
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
     return this.http.post(`${this.uri}/saveCustomer`, customer, httpOptions);
  }
 
  //Save Solution Trail
  insertSolutionTrail(f){
     this.i=this.i+1;
console.log("I returning trail from service:",this.i);
//return this.http.post(`${this.uri}/saveTrail`, f, httpOptions).share();
return this.http.post(`${this.uri}/saveTrail`, f, httpOptions).subscribe((data) => {
  console.log("Saved Successfully...", data);
});
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
feedback:f.feedback,

OtherAppReq:f.OtherAppReq,
speedUnderlayConn:f.speedUnderlayConn,
expectedThroughputReq:f.expectedThroughputReq,
internetBreakoutReq:f.internetBreakoutReq,
routingReq:f.routingReq,
cloudFlag:f.cloudFlag,
vendor:f.vendor,
linkProvider:f.linkProvider,
ExistingCustApp:f.ExistingCustApp,
endCustomerFlag:f.endCustomerFlag,
WithLTE:f.WithLTE,
WithoutLTE:f.WithoutLTE,
WithWifi:f.WithWifi,
WithoutWifi:f.WithoutWifi,
WithVNF:f.WithVNF,
WithoutVNF:f.WithoutVNF,
WithLTECPENumber:f.WithLTECPENumber,
WithVNFCPENumber:f.WithVNFCPENumber,
WithWifiCPENumber:f.WithWifiCPENumber,
salesContact:f.salesManagerContact,
IPCCContact:f.IPCCContact,
accountManagerContact:f.accountManagerContact,
techinicalProjectContact:f.techinicalProjectContact,
items:f.items
  }
  console.log("Trail Studio final list: ",pd);

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
    return this.http.post(`${this.uri}/saveQO`, QO, httpOptions).subscribe((data) => {
      console.log("Saved Successfully...", data);
    });;
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
    var pd = {
      projectId:f.project,
      demoid:f.demoid,
      customerid:f.customerId,
      customername:f.customerName,
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
      feedback:f.feedback,
      
      OtherAppReq:f.OtherAppReq,
      speedUnderlayConn:f.speedUnderlayConn,
      expectedThroughputReq:f.expectedThroughputReq,
      internetBreakoutReq:f.internetBreakoutReq,
      routingReq:f.routingReq,
      cloudFlag:f.cloudFlag,
      vendor:f.vendor,
      linkProvider:f.linkProvider,
      ExistingCustApp:f.ExistingCustApp,
      endCustomerFlag:f.endCustomerFlag,
      WithLTE:f.WithLTE,
      WithoutLTE:f.WithoutLTE,
      WithWifi:f.WithWifi,
      WithoutWifi:f.WithoutWifi,
      WithVNF:f.WithVNF,
      WithoutVNF:f.WithoutVNF,
      WithLTECPENumber:f.WithLTECPENumber,
      WithVNFCPENumber:f.WithVNFCPENumber,
      WithWifiCPENumber:f.WithWifiCPENumber,
        }
    return this.http.post(`${this.uri}/ProductDemos/updatePD`, pd, httpOptions);
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


  getAllProjects(){
    const find_stations_at = {
      //placeName: placeName;
    };
    var str = JSON.stringify(find_stations_at, null, 2);
    console.log("JSON added successfully");
    console.log("I am in showQualifiedOpportunities trailstudio.service");
    return this.http.post(`${this.uri}/QualifiedOpportunities/getAllProject`, find_stations_at, httpOptions);
  }

  //Get All product demos
  getAllProductDemos(){
    console.log("I am in getAllProductDemos trailstudio.service");
    return this.http.post(`${this.uri}/ProductDemos/getPD`, httpOptions); 
  }



  //Get Project Details
  getSolutionTrails() {
    return this.http.get(`${this.uri}/SolutionTrail`);
  }

  getSolutionTrailsDetails() {
    console.log("I am Solution Trail Data  came here : ");
    return this.http.get(`${this.uri}/SolutionTrail1`);
  }

  getSolutionTrailData(t){
console.log("I am Solution Trail Data : ",t);
var trail = {
  trail: t
}
    return this.http.post(`${this.uri}/SolutionTrail1/getTrailData`, trail , httpOptions);
  }


  //Get All trails
  getAllTrailsDetails(){
    return this.http.post(`${this.uri}/SolutionTrail/getAllTrails`, httpOptions); 
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
