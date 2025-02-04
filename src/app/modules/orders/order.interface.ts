export type TCustomerDetails = {
  name: string
  email: string
  address: string
  contactNo: string
}
export type TProduct = {
  name: string
  id: string
  quantity: number
  price: number
}

export type TOrder = {
  customer: TCustomerDetails
  products: TProduct[]
  totalPrice: number
  status: 'pending' | 'processing' | 'delivered' | 'cancelled'
}
