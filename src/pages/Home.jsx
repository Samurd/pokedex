import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { setName } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [InputTrainer, setInputTrainer] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goPokedex = () => {
    dispatch(setName(InputTrainer))
    navigate("/pokedex")
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      goPokedex()
    }
  }

  return (
    <main className="home">
        <h2 className="welcome-home">Hola Entrenador!</h2>
        <p className="p-home">Dame tu nombre para empezar</p>
        <div className="form-home">
            <input type="text" placeholder="Name" onKeyDown={handleKeyDown} onChange={(e) => setInputTrainer(e.target.value)}/>
            <button type="submit" onClick={() => goPokedex()}>Enviar</button>
        </div>
    </main>
  )
}
