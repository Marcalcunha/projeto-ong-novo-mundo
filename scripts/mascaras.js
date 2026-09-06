document.addEventListener("DOMContentLoaded", () => {
    const cpf = document.querySelector("#cpf");
    const telefone = document.querySelector("#telefone");
    const cep = document.querySelector("#cep");

    function onlyDigits(value) {
        return value.replace(/\D/g, "");
    }

    cpf.addEventListener("input", () => {
        let v = onlyDigits(cpf.value).slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpf.value = v;
    });

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

    cep.addEventListener("input", () => {
        let v = onlyDigits(cep.value).slice(0, 8);
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
        cep.value = v;
    });
});
