import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { Router} from "@angular/router";
import { Observable } from 'rxjs';
//import { of } from 'rxjs/observable/of';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, map, tap } from 'rxjs/operators';

//import 'rxjs/add/observable/of';

import { Skill} from '../model/Skill';
import { AppSettings} from '../shared/AppSettings';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SkillsService {
	private apiHost= AppSettings.API_ENDPOINT;
	private getAllSkillsUrl = this.apiHost+'Skills/';
	private updateSkillUrl = this.apiHost+'Skills/';
	private saveSkillUrl = this.apiHost+'Skills/';
	private deleteSkillUrl = this.apiHost+'Skills/';
	
	skillsArray:Skill[];
  
    constructor(private http: HttpClient ) { }
		  
	/** GET skillsArray from the Rest API server */
	getAllSkills(): Observable<Skill[]> {
	  return this.http.get<Skill[]>(this.getAllSkillsUrl).pipe(
		  tap(skillsArray => console.log(skillsArray))
		  //,
		  //catchError(this.handleError('getAllSkills', []))
		);
	}

	/** PUT: update the skill on the server */
	updateSkill (skill:Skill): Observable<any> {
	   const url = `${this.updateSkillUrl}/${skill.skillId}`;
	  // console.log("skill url....."+url);
	   return this.http.put(url, skill, httpOptions).pipe(
		 tap(_ => console.log(`updated skill id=${skill.skillId}`))
		 //,
		 //catchError(this.handleError<any>('updateskill'))
	   );
	}	
		
	/** POST: add a new skill to the server */
	saveSkill (skill:Skill): Observable<Skill> {
		console.log("skill"+skill);
		return this.http.post<Skill>(this.saveSkillUrl, skill, httpOptions).pipe(
			tap((skill:Skill) => console.log('added skill '))
			//,
			//catchError(this.handleError<Skill>('Save skill'))
		);
	}
	//w/ id=${Skills._id}
	/** DELETE: delete the Skills from the server */
	deleteSkill(skill:Skill): Observable<any> {
	    const url = `${this.deleteSkillUrl}/${skill.skillId}`;
	    console.log("skill url....."+url);	
	    return this.http.delete<Skill>(url, httpOptions).pipe(
		tap(_ => console.log('Deleted Skill successfully'))
		//,
		//catchError(this.handleError<Skill>('Delete Skill'))
	  );
	}		
	
  
	/**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T> (operation = 'operation', result?: T) {		
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure			
			console.log('${error.message}'); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			//return of(result as T);
			return;
		};
	}

}