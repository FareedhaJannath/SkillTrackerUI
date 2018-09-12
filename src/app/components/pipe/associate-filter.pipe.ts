import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateFilter'
})
export class AssociateFilterPipe implements PipeTransform {

transform(items:any, nameSearch: string,associateIdSearch:string, emailSearch: string, mobileSearch: string,skillSearch:string){
    if (items && items.length){
        
        return items.filter(item =>{

            if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
                return false;
            }
            if (associateIdSearch && item.associateId.toString().indexOf(associateIdSearch) === -1){
              return false;
            }
            if (emailSearch && item.email.toLowerCase().indexOf(emailSearch.toLowerCase()) === -1){
                return false;
            }
            if (mobileSearch && item.mobile.indexOf(mobileSearch) === -1){
                return false;
            }
			if (skillSearch && item.assocSkills.toLowerCase().indexOf(skillSearch) === -1){
                return false;
            }
           
            return true;
       })
    }
    else{
        return items;
    }
}


/*
transform(items: any, filter: any, isAnd: bool): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isAnd) {
        return items.filter(item =>
            filterKeys.reduce((memo, keyName) =>
                (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            console.log(keyName);
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });
      }
    } else {
      return items;
    }
  }*/
  
  /*transform(items: any[], searchText: string): any {
		if(!items) return [];
		if(!searchText) return items;	
		searchText = searchText.toLowerCase();        	
		return items.filter( it => {
			console.log(it.associateName);
			return it.associateName.toLowerCase().includes(searchText);
		});
    }*/
}
