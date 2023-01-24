import { outputAst } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MethodService } from '../method.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  
  @Output() statusUpdateEvent: EventEmitter<string> = new EventEmitter<string>();
  
  @HostListener('document:click', ['$event'])
  clickout(event) {
    
    if (this.eRef.nativeElement.children[0].children[0].children[0].children[1].contains(event.target)) {

      this.showDropDown = false

    }
  }

  @HostListener('document:change', ['$event'])
  onChangeInput(event){
     this.checkValidation()
  }





  tags=[]
  selectedTags=[]
  copytag: any
  showDropDown = false

  showcategory = false
  categories=[]
  Category = {
    'name': '',
    'color': 'white'
  }

  inputvalue=''

  finalForm=new FormGroup({
    method:new FormGroup({
      title:new FormControl('',Validators.required),
      illustration:new FormControl('',[Validators.required,this.patternMatcher.bind(this)]),
      shortDescription: new FormControl('',Validators.required),
      designTags: new FormArray([
      ]),
      category:new FormGroup({_id:new FormControl('',Validators.required),
        title: new FormControl('',Validators.required),
        color: new FormControl('',Validators.required)}),
  
    }),
    reference:new FormArray([]),
    steps: new FormArray([new FormGroup({
       title: new FormControl('',Validators.required), 
       description: new FormControl('',Validators.required) 
      })])
  })




  constructor(private router:Router,
    private service:MethodService,
    private eRef: ElementRef) { }

  ngOnInit(): void {
    this.statusUpdateEvent.emit('add');
    (<HTMLInputElement>document.getElementById('bsta'))['style'].color='#EC4646';
    (<HTMLInputElement>document.getElementById('bsta')).textContent="All fields are mandatory";

    this.finalForm.controls.reference.push(new FormGroup({ type: new FormControl(), format: new FormControl('Video'),link: new FormControl('',Validators.required)}))
    this.finalForm.controls.reference.push(new FormGroup({ type: new FormControl(), format: new FormControl('Article'),link: new FormControl('',Validators.required)}))


    this.service.getDesignTag().subscribe((data)=>{
        this.tags=data
        this.copytag = data
        console.log(data)
    })

    this.service.getMethodCategory().subscribe((data)=>{

      this.categories=data
      console.log(data)

    })
    
    


  }


  private patternMatcher(control: FormControl): { [s: string]: boolean } {
    const urlpattern="https://drive.google.com/"
    if (control.value.startsWith(urlpattern)) {
        return null;
    }
    return { StringMissMatch: true };
}


  onbutSubmit(){
    document.getElementById("finalForm").dispatchEvent(new CustomEvent('submit', { cancelable: true, }))
  }

  onSubmit() {
    
    console.log(this.finalForm.value)
    console.log(JSON.stringify(this.finalForm.value))
     if(this.finalForm.valid){
      this.statusUpdateEvent.emit('list')
      this.service.addMethod(this.finalForm.value).subscribe(()=>{
        this.router.navigate(['list']);
      })
      
     }
     
     
   
  }

  get references(): FormArray {
    return this.finalForm.get('reference') as FormArray
  }


  addVideo(){
    this.finalForm.controls.reference.push(new FormGroup({ type: new FormControl(), format: new FormControl('Video'),link: new FormControl(),}))
  }

  addArticle(){

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

  addTags(value){
    
    if (!this.selectedTags.includes(value)) {
      this.selectedTags.push(value)
      // this.tags=this.tags.filter(item=>item.tag!=value.tag)
      // this.copytag=this.tags
      this.finalForm.controls.method.controls.designTags.push(new FormGroup({
        _id:new FormControl(value._id),
        title: new FormControl(value.tag),
        color: new FormControl(value.phase.color)}))
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
    this.finalForm.controls.method.controls.category.controls.title.patchValue(value.category)
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
    (<HTMLInputElement>document.getElementById('fill2'))['style'].color='#1ED30E';
    (<HTMLInputElement>document.getElementById('fill2')).textContent="Filled";
  }
  if(this.finalForm.controls.reference.valid){
    (<HTMLInputElement>document.getElementById('fill3'))['style'].color='#1ED30E';
    (<HTMLInputElement>document.getElementById('fill3')).textContent="Filled";
  }
  if(this.finalForm.controls.steps.valid){
    (<HTMLInputElement>document.getElementById('fill4'))['style'].color='#1ED30E';
    (<HTMLInputElement>document.getElementById('fill4')).textContent="Filled";
  }

  if(this.finalForm.valid){
    (<HTMLInputElement>document.getElementById('bsta'))['style'].color='#2BAC20';
    (<HTMLInputElement>document.getElementById('bsta')).textContent="Great Job";
    (<HTMLInputElement>document.getElementById('divbut'))['style'].background="#00B2DA";
    (<HTMLInputElement>document.getElementById('divbut'))['style'].color='#FFFFFF'
    
  }
 

  }


  changeToSentenceCase(event) {
  
    console.log(event.target.value)
    event.target.value = event.target.value.replace(/\b\w/g, 
       event=> event.toLocaleUpperCase());
   // event.target.value=event.target.value.toLocaleUpperCase();
}

}
