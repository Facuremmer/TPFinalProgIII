import { SaleDetail } from "src/app/saleDetail/interfaces/saleDetail.interface";

export interface SaleCreate{
    idCliente:     number;
    sucursalVenta: string;
    fecha:         Date;
    totalVenta:    number;
    detallesVenta: SaleDetail[];
}
