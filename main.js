document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.getElementById("navBar");
  const btnMenu = document.getElementById("btnMenu");

  // checagens iniciais (ajuda a diagnosticar problemas)
  if (!btnMenu) {
    console.error("btnMenu não encontrado. Verifique se existe id='btnMenu' no HTML.");
  }
  if (!navBar) {
    console.error("navBar não encontrado. Verifique se existe id='navBar' no HTML.");
  }
  if (!btnMenu || !navBar) return; // sai se faltar algo essencial

  // Torna o clique em qualquer parte do botão (incluindo o SVG interno)
  // mais confiável usando delegation/closest.
  document.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest("#btnMenu");
    const clickedNav = e.target.closest("#navBar");

    if (clickedBtn) {
      // clique no botão (ou em algum filho - ex: svg/path)
      e.stopPropagation(); // evita que o clique suba e feche imediatamente
      navBar.classList.toggle("active");
      console.log("menu toggled. active =", navBar.classList.contains("active"));
      return;
    }

    // clique fora: se o menu estiver aberto e o clique NÃO for dentro do navBar,
    // fecha o menu
    if (navBar.classList.contains("active") && !clickedNav) {
      navBar.classList.remove("active");
      console.log("menu fechado por clique fora");
    }
  });S

  // opcional: tecla ESC fecha o menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navBar.classList.contains("active")) {
      navBar.classList.remove("active");
      console.log("menu fechado com ESC");
    }
  });
});

// PARTE DO AGENDAMENTO
document.getElementById("btnConfirmar").onclick = () => {

    const checkboxes = document.querySelectorAll(".servicos input:checked");
    const servicosSelecionados = [...checkboxes].map(cb => cb.value);

    const dia = document.getElementById("inputDia").value;
    const horario = document.getElementById("inputHorario").value;

    if (servicosSelecionados.length === 0 || !dia || !horario) {
        alert("Preencha todos os campos.");
        return;
    }

    // --- CORREÇÃO DO FORMATO DA DATA ---
    const partes = dia.split("-");            // [ano, mes, dia]
    const diaFormatado = `${partes[2]}/${partes[1]}/${partes[0]}`; // dd/mm/aaaa
    // ------------------------------------

    const mensagem = `Olá Vânia, gostaria de agendar um horário.
Dia: ${diaFormatado}
Horário: ${horario}
Serviços: ${servicosSelecionados.join(", ")}`;

    const numero = "5575981316315";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = url;
};
