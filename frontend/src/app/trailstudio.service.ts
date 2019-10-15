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

  //Save Qualified Oppoetunity
  insertQualifiedOpportynity(f) {
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
      items:f.items
    };
    return this.http.post(`${this.uri}/QualifiedOpportunities/saveQO`, QO, httpOptions);
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

  

}
