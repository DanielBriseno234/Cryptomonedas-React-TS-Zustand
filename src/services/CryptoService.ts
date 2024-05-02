import axios from "axios"
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/currency-schema"
import { Pair } from "../types"

export async function getCryptos () {
    const urlApi = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data : {Data}} = await axios.get(urlApi)
    const results = CryptoCurrenciesResponseSchema.safeParse(Data)
    if ( results.success ) {
        return results.data
    }
}

export async function fetchCurrentCryptoData(pair : Pair){
    const urlApi = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`
    const { data : { DISPLAY} } = await axios.get(urlApi)
    const results = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptoCurrency][pair.currency])
    if(results.success){
        return results.data
    }
}