import { PurchaseDetail } from "./purchaseDetail.interface";

export interface PurchaseCreate {
    idProveedor: number;
    totalCompra: number;
    fecha:       Date;
    detallesCompra: PurchaseDetail[];
}
