import { useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import MessageError from "./MessageError";

export default function CriptoSearchForm() {
  
    const [error, setError] = useState('')
    const cryptocurrencies = useCryptoStore( state => state.cryptocurrencies )
    const fetchData = useCryptoStore( state => state.fetchData )
    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptoCurrency: ''
    })

    const handleChange = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
        setPair({
            ...pair,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if( Object.values(pair).includes('') ){
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        //Consultar la api
        fetchData(pair)
    }

   return (
    <form
        className="form"
        onSubmit={handleSubmit}
    >
        { error && <MessageError>{error}</MessageError> }
        <div className="field">
            <label htmlFor="currency">Moneda:</label>
            <select 
                name="currency" 
                id="currency"
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                { currencies.map( currency => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                ) ) }
            </select>
        </div>
        <div className="field">
            <label htmlFor="cryptoCurrency">Criptomoneda:</label>
            <select 
                name="cryptoCurrency" 
                id="cryptoCurrency"
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                { cryptocurrencies.map( crypto => (
                    <option 
                        key={crypto.CoinInfo.FullName}
                        value={crypto.CoinInfo.Name}
                    >{crypto.CoinInfo.FullName}</option>
                ) ) }
            </select>
        </div>

        <input type="submit" value="Cotizar" />
    </form>
  )
}
