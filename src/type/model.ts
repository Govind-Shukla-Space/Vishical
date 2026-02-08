export interface Payload {
    email: string;
    password: string;
}
export interface UpdatePasswordPayload {
    email: string;
    oldPassword: string;
    newPassword: string;
}
export interface Response {
    message: string;
}

export interface AuthPayload {
    username: string;
    password: string;
    email: string;
    phone: string;
}
export interface AuthResponse {
    message: string;
}

export interface ShopSignUpPayload {
    shopName: string;
    email: string;
    password: string;
    ownerName: string;
    address: string;
    phone: string;
}
export interface ShopSignUpResponse {
    message: string;
}
export interface AdminSignUpPayload {
    email: string;
    password: string;
}
export interface ProductRequest{
    name: string;
    description: string;
    price: number;
}
