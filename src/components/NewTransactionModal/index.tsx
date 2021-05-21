import Modal from "react-modal"
import { Container, TransactionTypeContainer, RadioBox } from "./styles"

import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import closeImg from "../../assets/close.svg"
import { FormEvent, useState } from "react"
import { api } from "../../services/api"

interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    // Dados do form
    // tipo de pagamento
    const [type, setType] = useState('deposit')
    
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState('')

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        const data = {
            title,
            category,
            value,
            type
        }

        api.post("/transactions", data)
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
                 value={value}
                 onChange={event => setValue(Number(event.target.value))} />

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