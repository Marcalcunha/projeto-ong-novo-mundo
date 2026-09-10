document.addEventListener("DOMContentLoaded", () => {
    const cpf = document.querySelector("#cpf");
    const telefone = document.querySelector("#telefone");
    const cep = document.querySelector("#cep");

    function onlyDigits(value) {
        return value.replace(/\D/g, "");
    }

    // ================================
    // VALIDAÇÃO DO CPF
    // ================================

    function cpfValido(valor) {
        const numero = onlyDigits(valor);

        if (numero.length !== 11) {
            return false;
        }

        // Impede números repetidos
        if (/^(\d)\1{10}$/.test(numero)) {
            return false;
        }

        let soma = 0;

        // Primeiro dígito
        for (let i = 0; i < 9; i++) {
            soma += Number(numero[i]) * (10 - i);
        }

        let resto = (soma * 10) % 11;

        if (resto === 10) {
            resto = 0;
        }

        if (resto !== Number(numero[9])) {
            return false;
        }

        soma = 0;

        // Segundo dígito
        for (let i = 0; i < 10; i++) {
            soma += Number(numero[i]) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10) {
            resto = 0;
        }

        if (resto !== Number(numero[10])) {
            return false;
        }

        return true;
    }

    // ================================
    // MÁSCARA DO CPF
    // ================================

    cpf.addEventListener("input", () => {
        let v = onlyDigits(cpf.value).slice(0, 11);

        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        cpf.value = v;
    });

    // ================================
    // MÁSCARA DO TELEFONE
    // ================================

    telefone.addEventListener("input", () => {
        let v = onlyDigits(telefone.value).slice(0, 11);

        if (v.length <= 10) {
            v = v.replace(/(\d{2})(\d)/, "($1) $2");
            v = v.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            v = v.replace(/(\d{2})(\d)/, "($1) $2");
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        }

        telefone.value = v;
    });

    // ================================
    // MÁSCARA DO CEP
    // ================================

    cep.addEventListener("input", () => {
        let v = onlyDigits(cep.value).slice(0, 8);

        v = v.replace(/(\d{5})(\d)/, "$1-$2");

        cep.value = v;
    });

    // ================================
    // VALIDAÇÃO ANTES DO ENVIO
    // ================================

    const form = document.querySelector("#formCadastro");

    form.addEventListener("submit", (event) => {
        if (!cpfValido(cpf.value)) {
            event.preventDefault();

            cpf.setCustomValidity("Informe um CPF válido.");
            cpf.reportValidity();

            return;
        }

        cpf.setCustomValidity("");
    });
});
