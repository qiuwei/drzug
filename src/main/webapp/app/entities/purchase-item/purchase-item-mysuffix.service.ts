import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { PurchaseItemMysuffix } from './purchase-item-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PurchaseItemMysuffixService {

    private resourceUrl = 'api/purchases/1/purchase-items';

    constructor(private http: Http) { }

    create(purchaseItem: PurchaseItemMysuffix): Observable<PurchaseItemMysuffix> {
        const copy = this.convert(purchaseItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(purchaseItem: PurchaseItemMysuffix): Observable<PurchaseItemMysuffix> {
        const copy = this.convert(purchaseItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<PurchaseItemMysuffix> {
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

    private convert(purchaseItem: PurchaseItemMysuffix): PurchaseItemMysuffix {
        const copy: PurchaseItemMysuffix = Object.assign({}, purchaseItem);
        return copy;
    }
}
