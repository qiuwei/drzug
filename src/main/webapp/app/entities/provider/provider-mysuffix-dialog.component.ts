import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProviderMysuffix } from './provider-mysuffix.model';
import { ProviderMysuffixPopupService } from './provider-mysuffix-popup.service';
import { ProviderMysuffixService } from './provider-mysuffix.service';
import { ProductMysuffix, ProductMysuffixService } from '../product';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-provider-mysuffix-dialog',
    templateUrl: './provider-mysuffix-dialog.component.html'
})
export class ProviderMysuffixDialogComponent implements OnInit {

    provider: ProviderMysuffix;
    isSaving: boolean;

    products: ProductMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private providerService: ProviderMysuffixService,
        private productService: ProductMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.provider.id !== undefined) {
            this.subscribeToSaveResponse(
                this.providerService.update(this.provider));
        } else {
            this.subscribeToSaveResponse(
                this.providerService.create(this.provider));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProviderMysuffix>) {
        result.subscribe((res: ProviderMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProviderMysuffix) {
        this.eventManager.broadcast({ name: 'providerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductMysuffix) {
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
    selector: 'jhi-provider-mysuffix-popup',
    template: ''
})
export class ProviderMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerPopupService: ProviderMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.providerPopupService
                    .open(ProviderMysuffixDialogComponent as Component, params['id']);
            } else {
                this.providerPopupService
                    .open(ProviderMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
