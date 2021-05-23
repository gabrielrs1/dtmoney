import Modal from "react-modal"
import { FormEvent, useState, useContext } from "react"
import { api } from "../../services/api"
import { TransactionsContext } from "../../TransactionsContext"

import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import closeImg from "../../assets/close.svg"

import { Container, TransactionTypeContainer, RadioBox } from "./styles"

interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionsContext)
    
    // Dados do form
    // tipo de pagamento
    const [type, setType] = useState('deposit')
    
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        await createTransaction({
            title,
            type,
            category,
            amount
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose()
    }
    
    return (
        <Modal 
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         className="react-modal-content"
         overlayClassName="react-modal-overlay"
        >   
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                 type="text"
                 placeholder="Título"
                 value={title}
                 onChange={event => setTitle(event.target.value)} />
                <input 
                 type="number"
                 placeholder="Valor"
                 value={amount}
                 onChange={event => setAmount(Number(event.target.value))} />

                <TransactionTypeContainer>
                    <RadioBox
                     type="button" 
                     onClick={() => { setType('deposit')}}
                     isActive={type == 'deposit'}
                     activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                     type="button"
                     onClick={() => { setType('withdraw')}}
                     isActive={type == 'withdraw'}
                     activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saídas</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                 type="text"
                 placeholder="Categoria"
                 value={category}
                 onChange={event => setCategory(event.target.value)} />
                
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )   
}