import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { __values } from 'tslib';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterContentChecked  {
  title = 'Admin';
  //@ViewChild(ListComponent) listComponent:ListComponent;
  currentItem=''
  serchvalue: Subject<any> = new Subject();
  cstatus=false
  statusDesign=true
  bstatus:string
  displayStyle = "none";
  
  constructor(
    private editComponent:EditComponent,
    private addComponent:AddComponent,
    private listComponent:ListComponent,
    private cdr: ChangeDetectorRef,
    private router:Router
    ){    
      
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.cstatus=false
    this.statusDesign=true
    this.bstatus="Submit"
  }

 

  updateStatus(componentRef:any){
  
    if(componentRef instanceof EditComponent || componentRef instanceof AddComponent){
      const child=componentRef
      child.statusUpdateEvent.subscribe((status)=>{
         this.statusDesign=(status==='add')?true:false;
         this.bstatus=(status==='edit')? 'Update' : 'Submit';
         this.cstatus=(status==='list')?true:false;      
      })
      

      
    }
  
}


public addUpdate(){
  
  if(this.bstatus==='Update'){
    this.editComponent.onbutSubmit() 
  }else{
      this.addComponent.onbutSubmit()
  }
       
}


public delete(){
   
   document.getElementById('deleteBut').click()

}



addMethodView(){
  
  this.statusDesign=true;
  this.router.navigate(['add'])
}

listMethodView(){
  this.statusDesign=false;
  this.router.navigate(['list'])
}

  
  

}
