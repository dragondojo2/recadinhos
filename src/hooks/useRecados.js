import { useEffect, useState } from "react";

import { database } from "../services/firebase";

export function useRecados() {
  const [recados, setRecados] = useState("");

  useEffect(() => {
    const recadosRef = database.ref("recados");

    recadosRef.on("value", (recados) => {
      const recadosObject = recados.val();
      const firebaseRecados = recadosObject ?? {};

      const parsedRecados = Object.entries(firebaseRecados).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
          };
        }
      );
      setRecados(parsedRecados);
    });

    return () => {
      recadosRef.off("value");
    };
  }, []);

  return { recados };
}
