import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { PacketItemMysuffix } from './packet-item-mysuffix.model';
import { PacketItemMysuffixService } from './packet-item-mysuffix.service';

@Component({
    selector: 'jhi-packet-item-mysuffix-detail',
    templateUrl: './packet-item-mysuffix-detail.component.html'
})
export class PacketItemMysuffixDetailComponent implements OnInit, OnDestroy {

    packetItem: PacketItemMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private packetItemService: PacketItemMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPacketItems();
    }

    load(id) {
        this.packetItemService.find(id).subscribe((packetItem) => {
            this.packetItem = packetItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPacketItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'packetItemListModification',
            (response) => this.load(this.packetItem.id)
        );
    }
}
