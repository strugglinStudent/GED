import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document } from '../../../shared/models/document';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrl: './document-dialog.component.scss',
})
export class DocumentDialogComponent {
  document: Document;
  documentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.document = data.document;
    this.initializeForm();
  }
  private initializeForm() {
    this.documentForm = this.fb.group({
      title: [''],
      date: [''],
      orderNumber: [this.document?.content || ''],
      storeName: [this.document?.content || ''],
      address: [this.document?.content || ''],
      tax_identification_number: [this.document?.content || ''],
      billed_to_name: [''],
      billed_to_address: [''],
      delivery_company: [''],
      delivery_method: [''],
      delivery_fee: [''],
      delivery_currency: [''],
      client_type: [''],
      sale_type: [''],
      items: '',
      subtotal_ht_amount: [''],
      subtotal_ht_currency: [''],
      tax_rate: [this.document?.content || ''],
      tax_amount: [this.document?.content || ''],
      tax_currency: [this.document?.content || ''],
      total_ttc_amount: [this.document?.content || ''],
      total_ttc_payment_method: [this.document?.content || ''],
      total_ttc_currency: [this.document?.content || ''],
      contact_info: [this.document?.content || ''],
      siret: [this.document?.content || ''],
      naf: [this.document?.content || ''],
      tva: [this.document?.content || ''],
    });
  }

  private createItemGroup(item: any): FormGroup {
    return this.fb.group({
      description: [item?.description || ''],
      quantity: [item?.quantity || ''],
      unit_price_ht: [item?.unit_price_ht || ''],
      unit_price_ttc: [item?.unit_price_ttc || ''],
      total_discount: [item?.total_discount || ''],
      item_variation: [item?.item_variation || ''],
      price: [item.currency || ''],
    });
  }

  onSave() {
    if (this.documentForm.valid) {
      // Perform save operation
      const updatedDocument = {
        ...this.document,
        content: this.documentForm.value,
      };
      this.dialogRef.close(updatedDocument);
    }
  }

  protected readonly Array = Array;
}
