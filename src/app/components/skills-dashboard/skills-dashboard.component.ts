import {Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AssociateService} from '../service/associate.service';
import {Associate} from '../model/Associate';
import {Summary} from '../model/Summary';
import {Chart} from '../model/Chart';


@Component({
  selector: 'app-skills-dashboard',
  templateUrl: './skills-dashboard.component.html',   
  styleUrls: ['./skills-dashboard.component.css']
})
export class SkillsDashboardComponent implements OnInit {

    constructor(private associateService:AssociateService,private router: Router) { }

	associateArray:Associate[];
	associate:Associate;
	summary : Summary;
	customChartModelArray: Chart[] = [];
    chartModel : Chart;
	
		
    ngOnInit() {
		this.loadAllAssociates();
		this.getSummaryDetails();		
    }  
	private getSummaryDetails()
	{
		this.summary = new Summary();
		this.summary.RegisteredCandidates=2;
		this.summary.FemaleCandidates=0;
		this.summary.MaleCandidates=2;
		this.summary.FresherCandidates=2;
		this.summary.RatedCandidates=1;
		this.summary.MaleRatedCandidates=2;
		this.summary.FemaleRatedCandidates=1;
		this.summary.L1RatedCandidates=1;
		this.summary.L2RatedCandidates=1;
		this.summary.L3RatedCandidates=1;		
		this.formatChartData();
    }

	
	loadAllAssociates():void{	  
	  this.associateService.getAllAssociates().subscribe(data => { 
		 this.associateArray=data;		 
		 
			for(var cnt=0;cnt<this.associateArray.length;cnt++){				
				if(this.associateArray[cnt].associateSkills!==null){
					let assocSkills="";
					for(var i=0;i<this.associateArray[cnt].associateSkills.length;i++){				assocSkills+=this.associateArray[cnt].associateSkills[i].skill.skillName+",";						
					}
					this.associateArray[cnt].assocSkills=assocSkills;				
				}				
			}		 
		   
	  });	  
	}	
	deleteAssociate(associate:Associate): void {
		console.log("Deleting Associate:"+associate._id);	  
		this.associateArray = this.associateArray.filter(h => h !== associate);
		this.associateService.deleteAssociate(associate).subscribe();
    }
	
	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

  options: {
    pieceLabel: {
      render: 'value',
      precision: 0
    },
    legend: { display: false, labels: { fontColor: '#000' }, position: 'right' },

    layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
    responsive: true    

  }
  private formatChartData()
  {
	var value = [100, 200, 40, 30,25,75,89];
	var label = ["CSS3","HTML","Java","Spring","Struts","Javascript","Spring MVC"];;
	this.chartModel = new Chart();
    this.chartModel.barChartData = [{ data: value, label: ''}];
    this.chartModel.barChartLabels = label;
    this.chartModel.barChartType = "bar";
    this.chartModel.chartColors =
     [{backgroundColor: ["#F84351", "#D54a54", "#3ebf9b", "#4d86dc", "#f3af37","#de4bc5","#5e6bc5","#A84351"]}]
    this.chartModel.options =  {
      legend: { display: false, labels: { fontColor: '#000' }, position: 'right' },
      title: { display: true, text: "" },
      layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
      responsive: true    ,
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false
          },
          barThickness: 80
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            display: false
          }
        }]
      },
      hover: {
        //mode: false,
        animationDuration: 0
      },
      animation: {
        onComplete: function () {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.textAlign = 'bottom';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              ctx.fillStyle = "black";
              ctx.font = 'bold 12px Arial';
              var data = dataset.data[index];
              if (data > 0) {
                ctx.fillText(data, bar._model.x, bar._model.y + 15);
              }
            });
          });
        }
      }  
    }
    this.customChartModelArray =[];
    this.customChartModelArray.push(this.chartModel)    ;
  }



	
}
