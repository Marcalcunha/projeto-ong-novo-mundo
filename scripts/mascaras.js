document.addEventListener("DOMContentLoaded", () => {
    const cpf = document.querySelector("#cpf");
    const telefone = document.querySelector("#telefone");
    const cep = document.querySelector("#cep");

    function onlyDigits(value) {
        return value.replace(/\D/g, "");
    }

    function validarCPF() {
        const valor = onlyDigits(cpf.value);

        if (valor.length === 0) {
            cpf.setCustomValidity("");
            return;
        }

        if (valor.length !== 11) {
            cpf.setCustomValidity("Informe um CPF com 11 dígitos.");
            return;
        }

        if (/^(\d)\1{10}$/.test(valor)) {
            cpf.setCustomValidity("Informe um CPF válido.");
            return;
        }

        let soma = 0;

        // Primeiro dígito
        for (let i = 0; i < 9; i++) {
            soma += Number(valor.charAt(i)) * (10 - i);
        }

        let resto = (soma * 10) % 11;

        if (resto === 10) {
            resto = 0;
        }

        if (resto !== Number(valor.charAt(9))) {
            cpf.setCustomValidity("Informe um CPF válido.");
            return;
        }

        // Segundo dígito
        soma = 0;

        for (let i = 0; i < 10; i++) {
            soma += Number(valor.charAt(i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10) {
            resto = 0;
        }

        if (resto !== Number(valor.charAt(10))) {
            cpf.setCustomValidity("Informe um CPF válido.");
            return;
        }

        cpf.setCustomValidity("");
    }

    // Máscara e validação do CPF
    cpf.addEventListener("input", () => {
        let v = onlyDigits(cpf.value).slice(0, 11);

        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        cpf.value = v;

        validarCPF();
    });

    // Máscara do telefone
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

    // Máscara do CEP
    cep.addEventListener("input", () => {
        let v = onlyDigits(cep.value).slice(0, 8);

        v = v.replace(/(\d{5})(\d)/, "$1-$2");

        cep.value = v;
    });
});
