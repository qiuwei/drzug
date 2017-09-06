import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProviderMysuffix } from './provider-mysuffix.model';
import { ProviderMysuffixService } from './provider-mysuffix.service';
@Injectable()
export class ProviderMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private providerService: ProviderMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.providerService.find(id).subscribe((provider) => {
                this.providerModalRef(component, provider);
            });
        } else {
            return this.providerModalRef(component, new ProviderMysuffix());
        }
    }

    providerModalRef(component: Component, provider: ProviderMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.provider = provider;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
