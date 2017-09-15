/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OrderMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/order/order-mysuffix-detail.component';
import { OrderMysuffixService } from '../../../../../../main/webapp/app/entities/order/order-mysuffix.service';
import { OrderMysuffix } from '../../../../../../main/webapp/app/entities/order/order-mysuffix.model';

describe('Component Tests', () => {

    describe('OrderMysuffix Management Detail Component', () => {
        let comp: OrderMysuffixDetailComponent;
        let fixture: ComponentFixture<OrderMysuffixDetailComponent>;
        let service: OrderMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [OrderMysuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OrderMysuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(OrderMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderMysuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OrderMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.order).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
