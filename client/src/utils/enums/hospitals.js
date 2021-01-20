export const hospitals = [
    {
        id: "1",
        name: "Ichilov",
        hebName: "איכילוב"
    },
    {
        id: "2",
        name: "Shiba (Tel-Hashomer)",
        hebName: "שיבא (תל-השומר)"
    },
    {
        id: "3",
        name: "Beilinson",
        hebName: "בלינסון"
    },
    {
        id: "4",
        name: "Hadasa",
        hebName: "הדסה"
    },
    {
        id: "5",
        name: "Rambam",
        hebName: `רמב"ם`
    },
    {
        id: "6",
        name: "Soroka",
        hebName: "סורוקה"
    }
];

export const hospitalsENUM = {
    ICHILOV: "1",
    SHIBA: "2",
    BEILINSON: "3",
    HADASA: "4",
    RAMBAM: "5",
    SOROKA: "6"
}

export const getHospitalLangName = (hospitalId) => {
    const languageSelected = localStorage.getItem("i18nextLng");
    const hospital = hospitals.find(item => item.id == hospitalId);

    return languageSelected == "en" ? hospital.name : hospital.hebName;
}