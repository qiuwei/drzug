import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { StorageMysuffix } from './storage-mysuffix.model';
import { StorageMysuffixPopupService } from './storage-mysuffix-popup.service';
import { StorageMysuffixService } from './storage-mysuffix.service';

@Component({
    selector: 'jhi-storage-mysuffix-dialog',
    templateUrl: './storage-mysuffix-dialog.component.html'
})
export class StorageMysuffixDialogComponent implements OnInit {

    storage: StorageMysuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private storageService: StorageMysuffixService,
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
        if (this.storage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storageService.update(this.storage), false);
        } else {
            this.subscribeToSaveResponse(
                this.storageService.create(this.storage), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<StorageMysuffix>, isCreated: boolean) {
        result.subscribe((res: StorageMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: StorageMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.storage.created'
            : 'drzugApp.storage.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'storageListModification', content: 'OK'});
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
    selector: 'jhi-storage-mysuffix-popup',
    template: ''
})
export class StorageMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storagePopupService: StorageMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.storagePopupService
                    .open(StorageMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.storagePopupService
                    .open(StorageMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
