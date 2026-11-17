import Swal from "sweetalert2";

export function cantFindCity(changeColor) {
  return Swal.fire({
    title: "Erro!",
    text: "Cidade não encontrada. Por favor tente outra cidade!",
    confirmButtonText: "Ok",
    background: changeColor === "dark" ? "#1e293b" : "#ffffff",
    color: changeColor === "dark" ? "#f1f5f9" : "#000000",
    confirmButtonColor: changeColor === "dark" ? "#4f46e5" : "#4d4494",
  });
}

export function cantLoadWeather(changeColor) {
  return Swal.fire({
    title: "Erro!",
    text: "Não foi possível carregar a previsão do tempo. Tente novamente em instantes.",
    confirmButtonText: "Ok",
    background: changeColor === "dark" ? "#1e293b" : "#ffffff",
    color: changeColor === "dark" ? "#f1f5f9" : "#000000",
    confirmButtonColor: changeColor === "dark" ? "#4f46e5" : "#4d4494",
  });
}
