import { HttpErrorResponse } from '@angular/common/http';
import { off } from 'process';

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number;
}

export interface IUser extends IEntity {
    dni: string,
    username: string,
    password: string,
    name: string,
    surname: string,
    last_name: string,
    birth_date: Date,
    phone_number: string,
    email: string,
    address: string,
    city: string,
    postal_code: number,
    role: Boolean,
    carts?: number,
    purchases?: number
}

export interface IUserPage extends IPage<IUser> {
}

export interface IProduct extends IEntity {
   name: string,
   description: string,
   price: number,
   stock: number,
   image?: string,
   category: ICategory,
   carts?: number,
   purchaseDetails?: number
}

export interface IProductPage extends IPage<IProduct> {
}

export interface ICart extends IEntity {
    user: IUser,
    product: IProduct,
    amount: number
}

export interface ICartPage extends IPage<ICart> {
}

export interface ICategory extends IEntity {
    name: string,
    products?: number
}

export interface ICategoryPage extends IPage<ICategory> {
}

export interface IPurchase extends IEntity {
    date_purchase: Date,
    num_bill: number,
    date_bill: Date,
    user: IUser,
    purchase_details?: number
}

export interface IPurchasePage extends IPage<IPurchase> {
}

export interface IPurchaseDetail extends IEntity {
    amount: number,
    price: number,
    product: IProduct,
    purchase: IPurchase
}

export interface IPurchaseDetailPage extends IPage<IPurchaseDetail> {
}

export interface IPrelogin extends IEntity {
    token: string,
    captchaImage: string
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string,
    iss: string,
    iat: number,
    exp: number,
    name: string;
}