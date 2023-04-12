interface ProductModalProps {
  open: boolean;
}

export function ProductModal({ open }: ProductModalProps) {
  return open ? (
    <div role='dialog' aria-labelledby='modal-title' aria-modal='true'>
      <header>
        <h2 id='modal-title'>Cadastrar produto</h2>
        <button>X</button>
      </header>

      <form>
        <label htmlFor='code'>Código:</label>
        <input type='text' id='code' name='code' required />

        <label htmlFor='description'>Descrição:</label>
        <input type='text' id='description' name='description' required />

        <label htmlFor='price'>Preço:</label>
        <input type='number' id='price' name='price' required />

        <button type='submit'>Cadastrar</button>
      </form>
    </div>
  ) : null;
}
