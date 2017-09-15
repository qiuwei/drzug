import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PurchaseItemMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/purchase-item/purchase-item-mysuffix-detail.component';
import { PurchaseItemMysuffixService } from '../../../../../../main/webapp/app/entities/purchase-item/purchase-item-mysuffix.service';
import { PurchaseItemMysuffix } from '../../../../../../main/webapp/app/entities/purchase-item/purchase-item-mysuffix.model';

describe('Component Tests', () => {

    describe('PurchaseItemMysuffix Management Detail Component', () => {
        let comp: PurchaseItemMysuffixDetailComponent;
        let fixture: ComponentFixture<PurchaseItemMysuffixDetailComponent>;
        let service: PurchaseItemMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [PurchaseItemMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PurchaseItemMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(PurchaseItemMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PurchaseItemMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PurchaseItemMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.purchaseItem).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
