export function cantFindCity() {
  return Swal.fire({
    title: "Erro!",
    text: "Cidade não encontrada. Por favor tente outra cidade !",
    confirmButtonText: "Ok",
    customClass: {
      container: "custom-swal-container",
      popup: "custom-swal-popup",
      content: "custom-swal-content",
    },
  });
}
