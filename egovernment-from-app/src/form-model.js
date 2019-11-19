var formModel = {
    juridica: {
        personalInfoFields: [
            {
                title: "Identificator persoana juridica",
                validation: function (input) {
                    if (input.length != 10) {
                        return "Identificatorul trebuie sa fie format din 10 caractere";
                    }
                    return "";
                },
                hasError: false,
                errorDetail: "",
                placeholder: "Identificator",
                value: ""
            },
            {
                title:
                    "Denumire persoana juridica (institutie, asociatie, societate comerciala etc)",
                validation: function (input) {
                    if (input.length < 3) {
                        return "Numele trebuie sa contina cel putin trei caractere";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Denumire",
                value: ""
            },
            {
                title: "Adresa oficiala",
                validation: function (input) {
                    if (input.length < 3) {
                        return "Adresa trebuie sa contina cel putin trei caractere";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Adresa",
                value: ""
            },
            {
                title: "Adresa email oficiala",
                validation: function (input) {
                    if (!input.includes("@")) {
                        return "Adresa email invalida";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Adresa email",
                value: ""
            },
            {
                title: "Numar de telefon oficial",
                validation: function (input) {
                    if (!input) {
                        return "Numar de telefon invalid";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Numar de telefon",
                value: ""
            }
        ],
        subscriptionInfo: {
            subscriptionModels: [
                {
                    value: "0",
                    title: "Perioada abonament",
                    description: "\
                    <h6 class='subtitle is-6'>Preturile standard pentru abonamente persoana juridica:</h6>\
                    <ul>\
                        <li>Saptamanal: 20 RON + TVA</li>\
                        <li>Lunar: 40 RON + TVA</li>\
                        <li>6 Luni: 80 RON + TVA</li>\
                        <li>Anual: 150 RON + TVA</li>\
                    </ul>\
                    ",
                    hasError: false,
                    options: [
                        {
                            value: "20",
                            text: "1 saptamana"
                        },
                        {
                            value: "40",
                            text: "1 luna"
                        },
                        {
                            value: "80",
                            text: "6 luni"
                        },
                        {
                            value: "150",
                            text: "1 an"
                        }
                    ]
                },
                {
                    value: "0",
                    title: "Numar autovehicule",
                    description: "",
                    hasError: false,
                    options: [
                        {
                            value: "1",
                            text: "1 vehicul"
                        },
                        {
                            value: "2",
                            text: "2 autovehicule"
                        },
                        {
                            value: "3",
                            text: "3 autovehicule"
                        },
                        {
                            value: "4",
                            text: "4 autovehicule"
                        },
                        {
                            value: "5",
                            text: "5 autovehicule"
                        },
                        {
                            value: "6",
                            text: "6 autovehicule"
                        }
                    ]
                }
            ]
        }
    },
    fizica: {
        personalInfoFields: [
            {
                title: "Nume si prenume",
                validation: function (input) {
                    if (input.length < 3) {
                        return "Numele trebuie sa contina minim 3 caractere";
                    }

                    if (input.split(" ").length < 2) {
                        return "Numele trebuie sa fie format din nume si prenume";
                    }
                    return "";
                },
                hasError: false,
                errorDetail: "",
                placeholder: "Nume",
                value: ""
            },
            {
                title:
                    "Cod numeric personal",
                validation: function (input) {
                    if (input.length != 13) {
                        return "Codul numeric personal este format din 13 cifre";
                    }

                    if(isNaN(input)) {
                        return "Codul numeric personal este format doar din cifre";
                    }

                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "CNP",
                value: ""
            },
            {
                title: "Adresa domiciliu",
                validation: function (input) {
                    if (input.length < 3) {
                        return "Domiciliul trebuie sa contina minim 3 caractere";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Adresa domiciliu",
                value: ""
            },
            {
                title: "Adresa email",
                validation: function (input) {
                    if (!input.includes("@")) {
                        return "Adresa email invalida";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Adresa email",
                value: ""
            },
            {
                title: "Numar de telefon",
                validation: function (input) {
                    if (!input) {
                        return "Numar de telefon invalid";
                    }

                    if(isNaN(input)) {
                        return "Numarul introdus contine caractere invalide";
                    }
                    return "";
                },

                hasError: false,
                errorDetail: "",
                placeholder: "Numar de telefon",
                value: ""
            }
        ],
        subscriptionInfo: {
            subscriptionModels: [
                {
                    value: "0",
                    title: "Perioada abonament",
                    description: "\
                    <h6 class='subtitle is-6'>Preturile standard pentru abonamente persoana fizica:</h6>\
                    <ul>\
                        <li>Saptamanal: 15 RON + TVA</li>\
                        <li>Lunar: 30 RON + TVA</li>\
                        <li>6 Luni: 60 RON + TVA</li>\
                        <li>Anual: 100 RON + TVA</li>\
                    </ul>\
                    ",
                    hasError: false,
                    options: [
                        {
                            value: "15",
                            text: "1 saptamana"
                        },
                        {
                            value: "30",
                            text: "1 luna"
                        },
                        {
                            value: "60",
                            text: "6 luni"
                        },
                        {
                            value: "100",
                            text: "1 an"
                        }
                    ]
                },
                {
                    value: "0",
                    title: "Tip abonament",
                    description: "\
                    <h6 class='subtitle is-6'>Pentru persoane fizice se aplica urmatoarele reduceri</h6>\
                    <ul>\
                        <li>Abonament student: 50%</li>\
                        <li>Abonament angajat UPB: 25%</li>\
                        <li>Personal administrativ: GRATIS</li>\
                    </ul>\
                    ",
                    hasError: false,
                    options: [
                        {
                            value: "2",
                            text: "Student"
                        },
                        {
                            value: "4",
                            text: "Angajat UPB"
                        },
                        {
                            value: "1",
                            text: "Personal administrativ"
                        }
                    ]
                }
            ]
        }
    }
}

export default formModel