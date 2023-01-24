import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodService {
   
  results=[]
  constructor(private httpClient:HttpClient) { }

  getDesignTag():Observable<any>{
    return this.httpClient.get<Object>(`https://design-it-well.onrender.com/get-design-tags`)
   }
  
    getMethodCategory():Observable<any>{
    return this.httpClient.get<any>(`https://design-it-well.onrender.com/method-category`)
   }

   addMethod(data:any):any{
    console.log('in Post method')
    // console.log(JSON.parse(data))
    return this.httpClient.post(`https://design-it-well.onrender.com/admin`,data)
    
   }
   
   updateMethod(data:any,id:number){
    console.log("in Update "+data)
    return this.httpClient.put(`https://design-it-well.onrender.com/methods/${id}`,data)
   }
   
   deleteMethod(id:number):Observable<any>{
    console.log("delete Method")
    return this.httpClient.delete<any>(`https://design-it-well.onrender.com/method/${id}`)
   }

   getList():Observable<any>{
    return this.httpClient.get<any>(`https://design-it-well.onrender.com/methods`)
    
   }

   getMethod(id:number):Observable<any>{
    return this.httpClient.get<any>(`https://design-it-well.onrender.com/admin/method/${id}`)
   }

  

  getValue(){
      return this.results
  }

  setValue(value){
      this.results=value
  }

}
