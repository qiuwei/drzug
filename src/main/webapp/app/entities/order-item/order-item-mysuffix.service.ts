import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import template from 'url-template';
import { SERVER_API_URL } from '../../app.constants';

import { OrderItemMysuffix } from './order-item-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrderItemMysuffixService {

    private resourceTemplate = template.parse(SERVER_API_URL + 'api/orders/{orderId}/order-items/{id}');

    constructor(private http: Http) { }

    create(orderId: number, orderItem: OrderItemMysuffix): Observable<OrderItemMysuffix> {
        const copy = this.convert(orderItem);
        return this.http.post(this.resourceTemplate.expand({orderId: orderId}), copy).map((res: Response) => {
            return res.json();
        });
    }

    update(orderId: number, orderItem: OrderItemMysuffix): Observable<OrderItemMysuffix> {
        const copy = this.convert(orderItem);
        return this.http.put(this.resourceTemplate.expand({orderId: orderId}), copy).map((res: Response) => {
            return res.json();
        });
    }

    find(orderId: number, id: number): Observable<OrderItemMysuffix> {
        return this.http.get(this.resourceTemplate.expand({orderId: orderId, id: id})).map((res: Response) => {
            return res.json();
        });
    }

    query(orderId: number, req?: any,): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceTemplate.expand({orderId: orderId}), options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(orderId: number, id: number): Observable<Response> {
        return this.http.delete(this.resourceTemplate.expand({orderId: orderId, id: id}));
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
