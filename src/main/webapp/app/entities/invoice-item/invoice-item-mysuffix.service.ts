import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { InvoiceItemMysuffix } from './invoice-item-mysuffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InvoiceItemMysuffixService {

    private resourceUrl = 'api/invoice-items';

    constructor(private http: Http) { }

    create(invoiceItem: InvoiceItemMysuffix): Observable<InvoiceItemMysuffix> {
        const copy = this.convert(invoiceItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(invoiceItem: InvoiceItemMysuffix): Observable<InvoiceItemMysuffix> {
        const copy = this.convert(invoiceItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<InvoiceItemMysuffix> {
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

    private convert(invoiceItem: InvoiceItemMysuffix): InvoiceItemMysuffix {
        const copy: InvoiceItemMysuffix = Object.assign({}, invoiceItem);
        return copy;
    }
}