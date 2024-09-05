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
      title: [this.document?.content.title || ''],
      date: [this.document?.content.date || ''],
      orderNumber: [this.document?.content.orderNumber || ''],
      storeName: [this.document?.content.storeName || ''],
      address: [this.document?.content.address || ''],
      tax_identification_number: [this.document?.content.tax_identification_number || ''],
      billed_to_name: [this.document?.content.billed_to?.name || ''],
      billed_to_address: [this.document?.content.billed_to?.address || ''],
      delivery_company: [this.document?.content.delivery?.company || ''],
      delivery_method: [this.document?.content.delivery?.method || ''],
      delivery_fee: [this.document?.content.delivery?.delivery_fee || ''],
      delivery_currency: [this.document?.content.delivery?.currency || ''],
      client_type: [this.document?.content.client_type || ''],
      sale_type: [this.document?.content.sale_type || ''],
      items: this.fb.array(
        this.data.document?.content.items?.map((item) => this.createItemGroup(item)) || [],
      ),
      subtotal_ht_amount: [this.document?.content.subtotal_ht.amount || ''],
      subtotal_ht_currency: [this.document?.content.subtotal_ht.currency || ''],
      tax_rate: [this.document?.content.tax?.rate || ''],
      tax_amount: [this.document?.content.tax?.amount || ''],
      tax_currency: [this.document?.content.tax?.currency || ''],
      total_ttc_amount: [this.document?.content.total_ttc?.amount || ''],
      total_ttc_payment_method: [this.document?.content.total_ttc?.payment_method || ''],
      total_ttc_currency: [this.document?.content.total_ttc?.currency || ''],
      contact_info: [this.document?.content.contact_info || ''],
      siret: [this.document?.content.siret || ''],
      naf: [this.document?.content.naf || ''],
      tva: [this.document?.content.tva || ''],
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
