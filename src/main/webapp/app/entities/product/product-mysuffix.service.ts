import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProductMysuffix } from './product-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProductMysuffixService {

    private resourceUrl = 'api/products';

    constructor(private http: Http) { }

    create(product: ProductMysuffix): Observable<ProductMysuffix> {
        const copy = this.convert(product);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(product: ProductMysuffix): Observable<ProductMysuffix> {
        const copy = this.convert(product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ProductMysuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(product: ProductMysuffix): ProductMysuffix {
        const copy: ProductMysuffix = Object.assign({}, product);
        return copy;
    }
}
