import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

interface Transaction {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    createdAt: string
}

// Herda os itens da interface de Transaction
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction:  (transaction:  TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData // forma de resolver erro do typescript nessa parte de contexto, para ver como ficar sem a correção só remove o "as TransactionContextData"
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get("transactions")
        .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}