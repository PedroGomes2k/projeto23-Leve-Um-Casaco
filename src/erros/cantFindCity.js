import Swal from "sweetalert2";

const baseOptions = {
  title: "Erro!",
  confirmButtonText: "Ok",
};

export function cantFindCity() {
  return Swal.fire({
    ...baseOptions,
    text: "Cidade não encontrada. Por favor tente outra cidade!",
  });
}

export function cantLoadWeather() {
  return Swal.fire({
    ...baseOptions,
    text: "Não foi possível carregar a previsão do tempo. Tente novamente em instantes.",
  });
}

export function showRequestError(error) {
  if (error?.response?.status === 404) return cantFindCity();

  console.error(error);
  return cantLoadWeather();
}
