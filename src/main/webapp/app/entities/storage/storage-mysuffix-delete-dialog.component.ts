import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { StorageMysuffix } from './storage-mysuffix.model';
import { StorageMysuffixPopupService } from './storage-mysuffix-popup.service';
import { StorageMysuffixService } from './storage-mysuffix.service';

@Component({
    selector: 'jhi-storage-mysuffix-delete-dialog',
    templateUrl: './storage-mysuffix-delete-dialog.component.html'
})
export class StorageMysuffixDeleteDialogComponent {

    storage: StorageMysuffix;

    constructor(
        private storageService: StorageMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.storageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storageListModification',
                content: 'Deleted an storage'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.storage.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-storage-mysuffix-delete-popup',
    template: ''
})
export class StorageMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storagePopupService: StorageMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.storagePopupService
                .open(StorageMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
