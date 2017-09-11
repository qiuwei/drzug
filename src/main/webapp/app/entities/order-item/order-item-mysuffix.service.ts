import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { OrderItemMysuffix } from './order-item-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrderItemMysuffixService {

    private resourceUrl = 'api/orders/1/order-items';

    constructor(private http: Http) { }

    create(orderItem: OrderItemMysuffix): Observable<OrderItemMysuffix> {
        const copy = this.convert(orderItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(orderItem: OrderItemMysuffix): Observable<OrderItemMysuffix> {
        const copy = this.convert(orderItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<OrderItemMysuffix> {
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

    private convert(orderItem: OrderItemMysuffix): OrderItemMysuffix {
        const copy: OrderItemMysuffix = Object.assign({}, orderItem);
        return copy;
    }
}
