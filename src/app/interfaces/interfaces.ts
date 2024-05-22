export interface ICustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  country: string;
  postal_code: string;
  address: string;
  city: string;
  state: string;
  commodity: string;
}

export interface IAddressBR {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface ICommodity {
  id: number;
  name: string;
}

export interface ICommodityFunction {
  handleCommodityChange: (commodity: ICommodity) => void;
}

export interface IPaginatedCustomerResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: ICustomer[];
}
