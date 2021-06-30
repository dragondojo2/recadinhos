import { database } from "../services/firebase";
import { useState } from "react";
import { Recados } from "../components/Recados/index";
import { useRecados } from "../hooks/useRecados";
import toast, { Toaster } from "react-hot-toast";

import "../styles/Home.scss";

export function Home() {
  const [newRecado, setNewRecado] = useState("");
  const [newUser, setNewUser] = useState("");
  const { recados } = useRecados();

  function notifySuccess() {
    toast.success("Recadinho enviado");
  }

  function notifyError() {
    toast.error("Escreva algo antes!");
  }

  async function handleSendRecado(event) {
    event.preventDefault();
    console.log(recados);
    // notifySuccess();

    if (newRecado.trim() === "") {
      notifyError();
      return;
    }

    notifySuccess();

    const recado = {
      content: newRecado,
      author: newUser,
    };

    await database.ref("recados").push(recado);

    setNewRecado("");
    setNewUser("");
  }

  function handleRecadosList(recadosParam) {
    if (recados !== "") {
      const numbers = [1, 2, 3, 4, 5];
      const listItems = numbers.map((number) => <li>{number}</li>);
      let typeofN = typeof numbers;
      let typeofR = typeof recadosParam;
      console.log(`Numbers: ${typeofN}`);
      console.log(`Recados: ${typeofR}`);
      for (let i = 0; i < recadosParam.length; i++) {
        const key = recadosParam[i].id;
        const author = recadosParam[i].author;
        const content = recadosParam[i].content;
        return <Recados key={key} content={content} author={author}></Recados>;
      }
      // recadosParam.map((recado) => {
      //   return (
      //     <Recados
      //       key={recado.id}
      //       content={recado.content}
      //       author={recado.author}
      //     ></Recados>
      //   );
      // });
    } else {
      return <h1>error</h1>;
    }
  }

  // async function handleLikeRecado() {
  //   if (likeId) {
  //     await database.ref(`recados/${recadoId}/likes/${likeId}`).remove();
  //   } else {
  //     await database.ref(`recados/${recadoId}/likes`).push({
  //       //
  //     });
  //   }
  // }

  return (
    <div id="page-home">
      <header>
        <div className="contentHeader">
          <div>
            <h3>Recadinhos Logo</h3>
          </div>
          <div>
            <h3>Sobre</h3>
          </div>
        </div>
      </header>

      <main>
        <div className="title">
          <h1>Deixe seu recadinho</h1>
          {recados.length > 0 && <span>{recados.length} recados</span>}
        </div>

        <form>
          <textarea
            placeholder="Escreva seu recadinho"
            onChange={(e) => setNewRecado(e.target.value)}
            value={newRecado}
          ></textarea>
          <div className="form-footer">
            <input
              type="text"
              placeholder="&#xf007; Digite seu nome ou envie como anonimo"
              onChange={(e) => setNewUser(e.target.value)}
              value={newUser}
            ></input>
            <button type="submit" onClick={(e) => handleSendRecado(e)}>
              Enviar recado
            </button>
            <Toaster toastOptions={{ duration: 3500 }}></Toaster>
          </div>
        </form>
        <div className="recados-list">
          {/* {recados.map((recado) => {
            return (
              <Recados
                key={recado.id}
                content={recado.content}
                author={recado.author}
              ></Recados>
            );
          })} */}
          {handleRecadosList(recados)}
        </div>
      </main>
    </div>
  );
}
