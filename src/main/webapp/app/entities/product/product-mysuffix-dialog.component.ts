import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ProductMysuffix } from './product-mysuffix.model';
import { ProductMysuffixPopupService } from './product-mysuffix-popup.service';
import { ProductMysuffixService } from './product-mysuffix.service';
import { TaxMysuffix, TaxMysuffixService } from '../tax';
import { ProviderMysuffix, ProviderMysuffixService } from '../provider';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-product-mysuffix-dialog',
    templateUrl: './product-mysuffix-dialog.component.html'
})
export class ProductMysuffixDialogComponent implements OnInit {

    product: ProductMysuffix;
    isSaving: boolean;

    sourcetaxes: TaxMysuffix[];

    providers: ProviderMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private productService: ProductMysuffixService,
        private taxService: TaxMysuffixService,
        private providerService: ProviderMysuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.taxService
            .query({filter: 'product-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.product.sourceTaxId) {
                    this.sourcetaxes = res.json;
                } else {
                    this.taxService
                        .find(this.product.sourceTaxId)
                        .subscribe((subRes: TaxMysuffix) => {
                            this.sourcetaxes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.providerService.query()
            .subscribe((res: ResponseWrapper) => { this.providers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.product, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductMysuffix>) {
        result.subscribe((res: ProductMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductMysuffix) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackTaxById(index: number, item: TaxMysuffix) {
        return item.id;
    }

    trackProviderById(index: number, item: ProviderMysuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-product-mysuffix-popup',
    template: ''
})
export class ProductMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductMysuffixDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
