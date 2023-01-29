import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MethodService } from '../method.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() statusUpdateEvent: EventEmitter<string> = new EventEmitter<string>();
  

  @HostListener('document:click', ['$event'])
  clickout(event) {
    
    //  if (this.eRef.nativeElement.children[0].children[0].children[0].children[1].contains(event.target)) {
      if (this.eRef.nativeElement.contains(event.target)) {

     this.showDropDown = false

    }
  }

  @HostListener('document:change', ['$event'])
  onChangeInput(event){
    // this.checkValidation();
  }



  tags=[]
  selectedTags=[]
  copytag: any
  showDropDown = false
  id:any
  showcategory = false
  categories=[]
  Category = {
    'name': '',
    'color': 'white'
  }
  displayStyle = "none";
  finalForm=new FormGroup({
    method:new FormGroup({
      title:new FormControl('',Validators.required),
      illustration:new FormControl('',Validators.required),
      shortDescription: new FormControl('',Validators.required),
      designTags: new FormArray([
      ]),
      category:new FormGroup({_id:new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
        color: new FormControl('',Validators.required)}),
  
    }),
    reference:new FormArray([]),
    steps: new FormArray([])
  })





  constructor(private router:Router,
    private route:ActivatedRoute,
    private service:MethodService,

    private eRef: ElementRef) { }

  ngOnInit(): void {
    this.statusUpdateEvent.emit('edit');
    (<HTMLInputElement>document.getElementById('bsta'))['style'].color='#EC4646';
    (<HTMLInputElement>document.getElementById('bsta')).textContent="Make Changes";
    (<HTMLInputElement>document.getElementById('fetchstatus')).textContent=" Please Wait.....";
    this.id=this.route.snapshot.params['id']
    
    if(this.id!=null){
      this.service.getMethod(this.id).subscribe((data)=>{
        
        (<HTMLInputElement>document.getElementById('fetchstatus')).textContent="";
             this.selectedTags=data.method.designTags
             
             console.log(data)
             this.finalForm.controls.method.patchValue(data.method)         
             data.reference.forEach(resource => {
               this.finalForm.controls.reference.push(new FormGroup({ type: new FormControl(resource.type), format: new FormControl(resource.format),link: new FormControl(resource.link)}))
            })
               
            data.method.designTags.forEach(designTag=>{
              this.finalForm.controls.method.controls.designTags.push(new FormGroup({ _id: new FormControl(designTag._id), tag: new FormControl(designTag.tag),phase: new FormControl(designTag.phase)}))
            })
            this.Category.name= data.method.category.category;
            this.Category.color=data.method.category.color

            data.steps.forEach(step => {
              this.finalForm.controls.steps.push(new FormGroup({
                title: new FormControl(step.title), 
                description: new FormControl(step.description) 
               }))
           })
        
      })
    }


    this.service.getDesignTag().subscribe((data)=>{
        this.tags=data
         this.copytag = data
        console.log(data)
    })


    this.service.getMethodCategory().subscribe((data)=>{
      console.log(data)
      this.categories=data
    })
    


  }
  onbutSubmit(){
    document.getElementById("finalForm").dispatchEvent(new CustomEvent('submit', { cancelable: true, }))
  }

  onSubmit() {
   
   console.log(this.finalForm.value)
  this.service.updateMethod( this.finalForm.value,this.id).subscribe(()=>{
    (<HTMLInputElement>document.getElementById('bsta')).textContent="Method Modified";
    this.statusUpdateEvent.emit('list')
    this.router.navigate(['list'])
  })

  
   
   
   
  }

  

  get reference(): FormArray {
    return this.finalForm.get('reference') as FormArray
  }


  addVideo(){
    console.log("In Video")
    this.finalForm.controls.reference.push(new FormGroup({ type: new FormControl(), format: new FormControl('Video'),link: new FormControl(),}))
  }

  addArticle(){
   console.log("In Article")
    this.finalForm.controls.reference.push(new FormGroup({ type: new FormControl(), format: new FormControl('Article'),link: new FormControl(),}))

  }



  get steps(): FormArray {
    return this.finalForm.get('steps') as FormArray
  }
  
  addSteps() {
    this.finalForm.controls.steps.push(new FormGroup({ title: new FormControl(), description: new FormControl() }))
  }

  removeSteps(index: number) {
    this.finalForm.controls.steps.removeAt(index)
  }

  get designTags(): FormArray {
    return this.finalForm.get('method').get('designTags') as FormArray
  }
  removeArticle(index: number){
    this.finalForm.controls.reference.removeAt(index)
  }
  removeVideo(index: number){
    this.finalForm.controls.reference.removeAt(index)
  }

  addTags(value){
    
    if (!this.selectedTags.includes(value)) {
      this.selectedTags.push(value)
      
      this.finalForm.controls.method.controls.designTags.push(new FormGroup({
        phase:new FormGroup({name:new FormControl(value.phase.name),color: new FormControl(value.phase.color)}),
        _id:new FormControl(value._id),
        tag: new FormControl(value.tag),
        }))
    }
    (<HTMLInputElement>document.getElementById("taginput")).value=''
   
    
  }

  removeSelectTag(value){
    
    if (this.selectedTags.includes(value)) {
      this.selectedTags=this.selectedTags.filter(item=>item.tag!=value.tag)
     
      this.finalForm.controls.method.controls.designTags.removeAt(this.selectedTags.indexOf(value))
  }
}

  tagSelect(value: any) {
    this.showDropDown = true

    this.tags = [... this.copytag.filter((data) => {
      return data.tag.toLowerCase().includes(value.toLowerCase())
    })]

  }

  addCategory(value){
    this.finalForm.controls.method.controls.category.controls._id.patchValue(value._id)
    this.finalForm.controls.method.controls.category.controls.category.patchValue(value.category)
    this.finalForm.controls.method.controls.category.controls.color.patchValue(value.color)
    
    this.Category.name = value.category
    this.Category.color = value.color
    this.showcategory = false
  }

  setIsHover(event){
    var colour = event.target.style.color
    event.target.style.color = event.target.style.backgroundColor
    event.target.style.backgroundColor = colour
  }

  catgoryStatus(){
    this.showcategory = true
  }


  checkValidation(){

    if(this.finalForm.controls.method.valid){
      (<HTMLInputElement>document.getElementById('fill6'))['style'].color='#1ED30E';
      (<HTMLInputElement>document.getElementById('fill6')).textContent="Filled";
      (<HTMLInputElement>document.getElementById('bsta')).textContent="Make user you are making right changes";
    }
    if(this.finalForm.controls.reference.valid){
      (<HTMLInputElement>document.getElementById('fill7'))['style'].color='#1ED30E';
      (<HTMLInputElement>document.getElementById('fill7')).textContent="Filled";
      (<HTMLInputElement>document.getElementById('bsta')).textContent="Make user you are making right changes";
    }
    if(this.finalForm.controls.steps.valid){
      (<HTMLInputElement>document.getElementById('fill8'))['style'].color='#1ED30E';
      (<HTMLInputElement>document.getElementById('fill8')).textContent="Filled";
      (<HTMLInputElement>document.getElementById('bsta')).textContent="Make user you are making right changes";
    }
  
    if(this.finalForm.valid){
      (<HTMLInputElement>document.getElementById('bsta'))['style'].color='#1ED30E';
      
    }
   
  
    }
    deleteMethod(){
      
     this.service.deleteMethod(this.id).subscribe(()=>{
      window.alert("Method Deleted")
      this.statusUpdateEvent.emit('list');
      this.router.navigate(['list']);
     })
       
    }
    openPopup() {
      console.log('in popup')
      this.displayStyle = "block";
    }
    closePopup() {
      this.displayStyle = "none";
    }

}
