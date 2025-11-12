import { useState } from "react";
import PropTypes from "prop-types";
import "./Editable.css";

export default function Editable({ name, placeholder, btnName, onSubmit }) {
  const [mostrarInput, setMostrarInput] = useState(false);
  const [valorInput, setValorInput] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    if (!valorInput.trim()) {
      alert("Por favor, digite um título para a tarefa!");
      return;
    }
    onSubmit(valorInput.trim());
    setValorInput("");
    setMostrarInput(false);
  };

  return (
    <div className="editable">
      {mostrarInput ? (
        <form onSubmit={enviar}>
          <input
            type="text"
            placeholder={placeholder}
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
            autoFocus
          />
          <div className="editable-controls">
            <button type="submit">{btnName}</button>
            <button 
              type="button" 
              onClick={() => {
                setMostrarInput(false);
                setValorInput("");
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button 
          className="editable-trigger" 
          onClick={() => setMostrarInput(true)}
        >
          {name}
        </button>
      )}
    </div>
  );
}

Editable.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Editable.defaultProps = {
  placeholder: "Digite aqui...",
};