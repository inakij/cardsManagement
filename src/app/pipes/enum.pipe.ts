import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {  
    transform(data) : any {
    
    let keys = Object.keys(data).map( enumMember =>{      
        return { key : enumMember, value : data[enumMember]}
    });
    
    return keys;
  }
}
