import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProductMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/product/product-mysuffix-detail.component';
import { ProductMysuffixService } from '../../../../../../main/webapp/app/entities/product/product-mysuffix.service';
import { ProductMysuffix } from '../../../../../../main/webapp/app/entities/product/product-mysuffix.model';

describe('Component Tests', () => {

    describe('ProductMysuffix Management Detail Component', () => {
        let comp: ProductMysuffixDetailComponent;
        let fixture: ComponentFixture<ProductMysuffixDetailComponent>;
        let service: ProductMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [ProductMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProductMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(ProductMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProductMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.product).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
