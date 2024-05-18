export interface ICustomer {
  id: number;
  name: string;
  city: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  postal_code: string;
  country?: string;
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
