export interface Produtos {
    id: number
    img: string
    title: string
    price: number
    slug: string | undefined
    type: string
    ofertas: boolean
    lançamentos: boolean
    genero: string,
    estoque: boolean
}