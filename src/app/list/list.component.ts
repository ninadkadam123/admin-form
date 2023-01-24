import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MethodService } from '../method.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,OnChanges{
   @Output() statusUpdateEvent: EventEmitter<string> = new EventEmitter<string>();
 
  list:any
  copylist:any
  constructor(private service:MethodService,
    private router:Router,
    private changeDetectorRef: ChangeDetectorRef) { }
  

  ngOnInit(): void {
    //this.statusUpdateEvent.emit('list');
    this.statusUpdateEvent.emit('list');
    (<HTMLInputElement>document.getElementById('bsta'))['style'].color='#FFFFFF';
    (<HTMLInputElement>document.getElementById('bsta')).textContent="";
    (<HTMLInputElement>document.getElementById('divbut'))['style'].background="#FFFFFF;";
    (<HTMLInputElement>document.getElementById('divbut'))['style'].color='#D6D6D6'
    this.service.getList().subscribe((data)=>{
      
       this.list=data
       this.copylist=data
      console.log(data)
       console.log("list "+this.list)
       console.log(" copylist"+this.copylist)
       this.service.setValue(data)
    })
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes)

  }

  checkvalue(){
    console.log("cv "+this.copylist)
  }

  Update( id:number){
    
    this.router.navigate(['edit',id])

  }

  searchList(value:any){
    console.log('in search list')
    console.log(this.copylist)
    
   
      this.copylist=this.service.getValue()
      this.list =  this.copylist.filter((data) => {    
        return data.title.toLowerCase().includes(value.toLowerCase())
      })
      this.changeDetectorRef.detectChanges();

      console.log("New List:"+this.list)
  }


}
