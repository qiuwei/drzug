import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { CustomerMysuffix } from './customer-mysuffix.model';
import { CustomerMysuffixPopupService } from './customer-mysuffix-popup.service';
import { CustomerMysuffixService } from './customer-mysuffix.service';

@Component({
    selector: 'jhi-customer-mysuffix-dialog',
    templateUrl: './customer-mysuffix-dialog.component.html'
})
export class CustomerMysuffixDialogComponent implements OnInit {

    customer: CustomerMysuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private customerService: CustomerMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer), false);
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<CustomerMysuffix>, isCreated: boolean) {
        result.subscribe((res: CustomerMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CustomerMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.customer.created'
            : 'drzugApp.customer.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'customerListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-customer-mysuffix-popup',
    template: ''
})
export class CustomerMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.customerPopupService
                    .open(CustomerMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.customerPopupService
                    .open(CustomerMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
