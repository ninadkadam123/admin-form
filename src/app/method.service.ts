import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodService {
   URL=`http://15.207.201.163:3300`
  results=[]
  constructor(private httpClient:HttpClient) { }

  getDesignTag():Observable<any>{
    return this.httpClient.get<Object>(`http://15.207.201.163:3300/get-design-tags`)
   }
  
    getMethodCategory():Observable<any>{
    return this.httpClient.get<any>(`http://15.207.201.163:3300/method-category`)
   }

   addMethod(data:any):any{
    https://design-it-well.onrender.com
    console.log('in Post method')
    
    return this.httpClient.post(`http://15.207.201.163:3300m/admin`,data)
    
   }
   
   updateMethod(data:any,id:number){
    
    return this.httpClient.put(`http://15.207.201.163:3300/methods/${id}`,data)
   }
   
   deleteMethod(id:number):Observable<any>{
    
    return this.httpClient.delete<any>(`http://15.207.201.163:3300/method/${id}`)
   }

   getList():Observable<any>{
    return this.httpClient.get<any>(`http://15.207.201.163:3300/methods`)
    
   }

   getMethod(id:number):Observable<any>{
    return this.httpClient.get<any>(`http://15.207.201.163:3300/admin/method/${id}`)
   }

  

  getValue(){
      return this.results
  }

  setValue(value){
      this.results=value
  }

}
