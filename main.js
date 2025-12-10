document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.getElementById("navBar");
  const burger = document.getElementById("burger");    // checkbox
  const btnMenu = document.getElementById("btnMenu");  // container do botão

  if (!navBar || !burger || !btnMenu) {
    console.error("Elemento navBar, burger ou btnMenu não encontrado.");
    return;
  }

  // Sincroniza a abertura do menu com o estado do checkbox
  const syncMenu = (open) => {
    if (open) {
      navBar.classList.add("active");
      btnMenu.setAttribute("aria-expanded", "true");
    } else {
      navBar.classList.remove("active");
      btnMenu.setAttribute("aria-expanded", "false");
    }
  };

  // Quando o checkbox mudar (clicou no label ou no input)
  burger.addEventListener("change", (e) => {
    syncMenu(e.target.checked);
  });

  // Clique fora -> fecha o menu e desmarca o checkbox
  document.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest("#navBar");
    const clickedOnBtn = e.target.closest("#btnMenu") || e.target.closest("label[for='burger']");
    if (!clickedInsideNav && !clickedOnBtn) {
      if (burger.checked) {
        burger.checked = false;   // desmarca visualmente
        syncMenu(false);          // remove classe active
      }
    }
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.checked) {
      burger.checked = false;
      syncMenu(false);
    }
  });

  // (opcional) - se o menu for aberto via CSS por outro meio, sincronize no load
  syncMenu(burger.checked);
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
    
      let bxt = document.getElementById('btnConfirmar')
      bxt.innerText = 'carregando...'
    
    //   setTimeout(() => {
    //     window.location.href = url;  // Redirecionando para o WhatsApp
    // }, 10000);  // Tempo de espera para o "carregando..." aparecer
};
// LOADING 
