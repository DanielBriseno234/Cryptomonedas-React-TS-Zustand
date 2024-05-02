import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoData, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[],
    result : CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair : Pair) => void
}

export const useCryptoStore = create<CryptoStore>()(devtools( (set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set( () => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set( () => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoData(pair)
        
        set( () => ({
            loading: false,
            result
        }))
    }
})))