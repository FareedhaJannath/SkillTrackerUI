import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable} from 'rxjs'; 

//import 'rxjs/add/observable/of';
/*import { Observable, of} from 'rxjs';
import { of } from 'rxjs/observable/of';*/
//import { ErrorObservable } from 'rxjs/observable';
import { catchError, retry, map, tap } from 'rxjs/operators';

import { Associate} from '../model/Associate';
import {Summary} from '../model/Summary';
import { Skill} from '../model/Skill';

import { AppSettings} from '../shared/AppSettings';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AssociateService {
    private hostName= AppSettings.API_ENDPOINT;
	private getAllSkillsUrl = this.hostName+'Skills/';
	private getAllAssociatesUrl = this.hostName+'Associate/';
	private getAllAssociateSummaryUrl = this.hostName+'Associate/summary';
	private getAssociateDetailsURL = this.hostName+'Associate';
	private updateAssociateUrl = this.hostName+'Associate';	
	private saveAssociateUrl = this.hostName+'Associate/';
	private deleteAssociateUrl = this.hostName+'Associate';
	
	skillsArray:Skill[];
	associatesArray:Associate[];
	summary:Summary;
  
	constructor(private http: HttpClient) { }
		  
	/** GET skillsArray from the Rest API server */
	getAllSkills():Observable<Skill[]> {
	  return this.http.get<Skill[]>(this.getAllSkillsUrl).pipe(
		  tap(skillsArray => console.log(skillsArray+"skillsArray"+skillsArray))
			//,
		  //catchError(this.handleError('getAllSkills', []))
		);
	}
	
	/** GET getAssociateDetails by id. Will 404 if id not found */	
	getAssociateDetails(id: string): Observable<Associate> {		
	  const url = `${this.getAssociateDetailsURL}/${id}`;
	  return this.http.get<Associate>(url).pipe(
		tap(_ => console.log(`fetched Associate id=${id}`))
		//,
		//catchError(this.handleError<Associate>(`getAssociateDetails id=${id}`))
	  );
	}

	/** PUT: update the Associate on the server */
	updateAssociate (associate:Associate): Observable<any> {
    console.log("update Associate"+associate);
	   return this.http.put(this.updateAssociateUrl, associate, httpOptions).pipe(
		 tap(_ => console.log(`updated skill id=${associate.associateId}`))
		 //,
		 //catchError(this.handleError<any>('updateAssociate'))
	   );
	}	
		
	/** POST: add a new Associate to the server */
	saveAssociate (associate:Associate): Observable<Associate> {
		console.log("Associate"+associate);
		return this.http.post<Associate>(this.saveAssociateUrl, associate, httpOptions).pipe(
			tap((associate:Associate) => console.log('added Associate '))
			//,
			//catchError(this.handleError<Associate>('Save Associate'))
		);
	}
	/** GET associatesArray from the Rest API server */
	getAllAssociates(): Observable<Associate[]> {
	  return this.http.get<Associate[]>(this.getAllAssociatesUrl).pipe(
		  tap(associatesArray => console.log(associatesArray))
			//,
		  //catchError(this.handleError('getAllAssociates', []))		  
		);
	}
	/** GET associates Summary from the Rest API server */
	getAllAssociateSummary(): Observable<Summary> {
	  return this.http.get<Summary>(this.getAllAssociateSummaryUrl).pipe(
		  tap(summary => console.log(summary))
			//,
		  //catchError(this.handleError('getAllAssociates', []))		  
		);
	}
	/** DELETE: delete the Associate from the server */
	deleteAssociate(associate:Associate): Observable<any> {
	    const url = `${this.deleteAssociateUrl}/${associate.associateId}`;
	    console.log("associate url....."+url);	
	    return this.http.delete<Associate>(url, httpOptions).pipe(
		tap(_ => console.log('Deleted associate successfully'))
		//,
		//catchError(this.handleError<Associate>('Delete Associate'))
	  );
	}	
  
	/**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T> (operation = 'operation', result?: T) {		
		return;
	}

}