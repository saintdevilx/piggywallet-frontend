import { map } from 'rxjs/operators';
export class BaseModel{
    constructor(input:any){ 
        Object.assign(this, input);
        return this;
    }
    init(input:any){ 
        Object.assign(this, input);
        return this;
    }
}

export class PaginatedResult<T> extends BaseModel{
    has_next:boolean;
    next_page_number:number;
    results:T[];

}