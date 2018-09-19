import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonsModule,ModalModule} from 'ngx-bootstrap';

import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SkillSearchPipe } from './components/pipe/skill-search.pipe';

import { HttpModule } from '@angular/http'

import {AssociateService} from './components/service/associate.service';
import {SkillsService} from './components/service/skills.service';
import { AssociateFilterPipe } from './components/pipe/associate-filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { AppSettings} from './components/shared/AppSettings';
 
 
//import {Inject, Injectable, InjectionToken, NgZone, Provider, RendererFactory2} from '@angular/core';
import 'hammerjs';
import { AddEditAssociateComponent } from './components/add-edit-associate/add-edit-associate.component';
import { SkillsDashboardComponent } from './components/skills-dashboard/skills-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';

const appRoutes: Routes = [
  { path: 'skillsDashboard', component: SkillsDashboardComponent },  
  { path: 'EditAssociate/:id',component: AddEditAssociateComponent,data: { page: 'EditAssociate' } },
  { path: 'ViewAssociate/:id',component: AddEditAssociateComponent,data: { page: 'ViewAssociate' } },
  { path: 'AddAssociate', component: AddEditAssociateComponent,data: { page: 'AddAssociate' } },  
  { path: 'Skills', component: SkillsComponent },  
  { path: '', redirectTo: '/skillsDashboard', pathMatch: 'full' },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SkillSearchPipe,
    AssociateFilterPipe,
    SkillsComponent,
    PageNotFoundComponent,
    AddEditAssociateComponent,
    SkillsDashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,FormsModule, ChartsModule,HttpModule,ButtonsModule.forRoot(),
    HttpClientModule, MatSliderModule,BrowserAnimationsModule,ReactiveFormsModule,
	RouterModule.forRoot(appRoutes,{ enableTracing: true })
  ],
  providers: [AssociateService,SkillsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
