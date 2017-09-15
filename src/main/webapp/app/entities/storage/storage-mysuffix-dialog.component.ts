import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StorageMysuffix } from './storage-mysuffix.model';
import { StorageMysuffixPopupService } from './storage-mysuffix-popup.service';
import { StorageMysuffixService } from './storage-mysuffix.service';

@Component({
    selector: 'jhi-storage-mysuffix-dialog',
    templateUrl: './storage-mysuffix-dialog.component.html'
})
export class StorageMysuffixDialogComponent implements OnInit {

    storage: StorageMysuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private storageService: StorageMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.storage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storageService.update(this.storage));
        } else {
            this.subscribeToSaveResponse(
                this.storageService.create(this.storage));
        }
    }

    private subscribeToSaveResponse(result: Observable<StorageMysuffix>) {
        result.subscribe((res: StorageMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StorageMysuffix) {
        this.eventManager.broadcast({ name: 'storageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-storage-mysuffix-popup',
    template: ''
})
export class StorageMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storagePopupService: StorageMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storagePopupService
                    .open(StorageMysuffixDialogComponent as Component, params['id']);
            } else {
                this.storagePopupService
                    .open(StorageMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
