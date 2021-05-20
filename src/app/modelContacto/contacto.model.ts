export interface ContactoRequest{
    nombre:string;
    correo:string;
    mensaje:string;
}

export interface ContactoResponse{
    token:string;
}