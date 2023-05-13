export interface ProductCreate {
    idProducto:     number;
    idTipoProducto: number;
    stockActual:    number;
    precio?: number;
}