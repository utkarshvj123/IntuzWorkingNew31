import { Injectable } from '@angular/core';

import { HttpClient,HttpProgressEvent, HttpHeaders, HttpParams, HttpResponse , HttpErrorResponse, HttpRequest, HttpEventType } from '@angular/common/http';
 
import { Observable, of } from 'rxjs'; 

import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})


export class ImagesService {
  url=`https://api.unsplash.com/search/photos?`;

headers={
  Authorization : 'Client-ID 015256d2601c8f4bd3f5faefb95ba5deaf35baa1918db651db14375911a8e62a'
}
  constructor(private http:HttpClient) { }
  private handleError(operation: String) {
    return (err: any) => {
        let errMsg = `error in ${operation}()`;
        console.log(`${errMsg}:`, err)
        if (err instanceof HttpErrorResponse) {
        }
        return Observable.throw(errMsg);
    }
}
//-----------Getting values/ images per page or pagination----------
getDetails(query,page){
  console.log(this.url);
  console.log(query);
  console.log(page);
  
  return this.http.get(this.url+'page'+'='+page+'&'+'query'+'='+query, {'headers':this.headers}).catch(this.handleError('getDetail'))
}

//-----------Getting values/ images per page----------
getImagesPerPages(query,per_page){
  return this.http.get(this.url+'per_page'+'='+per_page+'&'+'query'+'='+query, {'headers':this.headers}).catch(this.handleError('getImagesPerPages'));
}


//-----------getting totalnumber of images------//
totalNumberOfImages(query){
  return this.http.get(this.url+'&'+'query'+'='+query, {'headers':this.headers}).catch(this.handleError('getDetail'));
}
}



// return this.http.get("https://api.unsplash.com/search/"+'photos'+'?'+'per_page'+'='+'100'+'&'+'query'+'='+query, {'headers':this.headers}).catch(this.handleError('getDetail'))
