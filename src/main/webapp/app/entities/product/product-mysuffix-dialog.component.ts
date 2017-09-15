import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

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
    authorities: any[];
    isSaving: boolean;

    sourcetaxes: TaxMysuffix[];

    providers: ProviderMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private productService: ProductMysuffixService,
        private taxService: TaxMysuffixService,
        private providerService: ProviderMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
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

    setFileData(event, product, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                product[field] = base64Data;
                product[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product), false);
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductMysuffix>, isCreated: boolean) {
        result.subscribe((res: ProductMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ProductMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.product.created'
            : 'drzugApp.product.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
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

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.productPopupService
                    .open(ProductMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.productPopupService
                    .open(ProductMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
