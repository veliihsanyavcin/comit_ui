import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../_services';
import {ProductService} from "./product.service";
import { DomSanitizer } from '@angular/platform-browser';


@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private productService: ProductService,
        // public _d: DomSanitizer
    ) {
    }
    // fileChange(e) {
    //     const file = e.srcElement.files[0];
    //     this.imgsrc = window.URL.createObjectURL(file);
    // }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            // id: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: [0, Validators.required],
        });

        if (!this.isAddMode) {
            const product = this.productService.find(this.id);
            this.form.setValue( {
                // id: product.id,
                name: product.name,
                description: product.description,
                price: product.price
            });
            this.form.updateValueAndValidity();
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.productService.addProduct(this.form.value);
        } else {
            this.productService.updateProduct(this.form.value);
        }
        this.router.navigate(['/products']);
    }
}
