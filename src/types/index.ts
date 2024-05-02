import { z } from "zod"
import { CryptoCurrencyReesponseSchema, CryptoPriceSchema, CurrencySchema, PairSchema } from "../schemas/currency-schema"

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency  = z.infer<typeof CryptoCurrencyReesponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>