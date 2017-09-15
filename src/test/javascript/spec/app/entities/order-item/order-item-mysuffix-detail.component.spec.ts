/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OrderItemMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/order-item/order-item-mysuffix-detail.component';
import { OrderItemMysuffixService } from '../../../../../../main/webapp/app/entities/order-item/order-item-mysuffix.service';
import { OrderItemMysuffix } from '../../../../../../main/webapp/app/entities/order-item/order-item-mysuffix.model';

describe('Component Tests', () => {

    describe('OrderItemMysuffix Management Detail Component', () => {
        let comp: OrderItemMysuffixDetailComponent;
        let fixture: ComponentFixture<OrderItemMysuffixDetailComponent>;
        let service: OrderItemMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [OrderItemMysuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OrderItemMysuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(OrderItemMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderItemMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemMysuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OrderItemMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.orderItem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
