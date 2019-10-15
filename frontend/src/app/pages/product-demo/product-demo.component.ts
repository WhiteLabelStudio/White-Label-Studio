import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@Component({
  selector: 'product-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './product-demo.component.html',
  styleUrls: ['./product-demo.component.scss']
})
export class ProductDemoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  public file:any;
  fileData: File = null;
  
    fileChange(input){
        const reader = new FileReader();
        if (input.files.length) {       
            this.file = input.files[0].name;  
            this.fileData = <File>input.files[0];          
        }
        console.log(this.fileData);
    }

    removeFile():void{
        this.file = '';
    }
  

}
