import Interval from "../auxiliar/Interval"

const sansa = val =>{
    return Math.random() < val
}

export default class Person {

    constructor(ziuaInfectarii, intervalVarsta){
        // Ziua in care a fost infectata persoana
        this.ziuaInfectarii    = ziuaInfectarii
        this.varsta            = generareVarsta(intervalVarsta.deLa, intervalVarsta.panaLa)
        this.sex               = generareSex()
        this.categorieDeVarsta = categorieDeVarsta(this.varsta) // in functie de varsta        
        this.contagios         = esteContagios(0.5)
    }
    


    // Genereaza o lista de persoane in functie de intervale;
    // interval = (nrMinim, nrMaxim) cu care ar fi putut sa se intalneasca
    generarePersoaneInterval = (ziuaInfectarii, intervalCopilMic, intervalPrescolar, intervalScolarMic, intervalPubertate, intervalAdolescenta, intervalTanar, intervalAdult, intervalMatur, intervalPresenescenta, intervalVarstnic, intervalBatran) => {
        // sansa de a contacta virusul 
        let s = sansa(1)

        // daca estesambata sau duminica, sansele de a iesi din casa sunt mai mici
        let sambataSauDuminica = ziuaInfectarii % 7 === 5 || ziuaInfectarii % 7 === 6
        if(sambataSauDuminica)
            s = sansa(0.6)

        // sa zicem ca la a 14-a zi, sansa scade pentru a putea reconstitui trecerea
        // catre alt oras, sa zicem
        let resetareGeneratie = ziuaInfectarii % 14 === 0 && ziuaInfectarii !== 0
        if(resetareGeneratie)
            s = sansa(0.15)
        // Numar random ce exprima cate persoane din fiecare categorie vor fi generate
        let numarContagieriRandom = [
            {
                numar : s ? numarRandom(0.2, intervalCopilMic.deLa, intervalCopilMic.panaLa) : 0,
                categorie: 'COPIL MIC'
            },
            {
                numar : s ? numarRandom(0.4, intervalPrescolar.deLa, intervalPrescolar.panaLa) : 0,
                categorie: 'PRESCOLAR'
            },
            {
                numar : s ? numarRandom(0.4, intervalScolarMic.deLa, intervalScolarMic.panaLa) : 0,
                categorie: 'SCOLAR MIC'
            },
            {
                numar : s ? numarRandom(0.4, intervalPubertate.deLa, intervalPubertate.panaLa) : 0,
                categorie: 'PUBERTATE'
            },
            {
                numar : s ? numarRandom(0.7, intervalAdolescenta.deLa, intervalAdolescenta.panaLa) : 0,
                categorie: 'ADOLESCENTA'
            },
            {
                numar : s ? numarRandom(0.7, intervalTanar.deLa, intervalTanar.panaLa) : 0,
                categorie: 'TANAR'
            },
            {
                numar : s ? numarRandom(0.7, intervalAdult.deLa, intervalAdult.panaLa) : 0,
                categorie: 'ADULT'
            },
            {
                numar : s ? numarRandom(0.7, intervalMatur.deLa, intervalMatur.panaLa) : 0,
                categorie: 'MATUR'
            },
            {
                numar : s ? numarRandom(0.7, intervalPresenescenta.deLa, intervalPresenescenta.panaLa) : 0,
                categorie: 'PRESENESCENTA'
            },
            {
                numar : s ? numarRandom(0.7, intervalVarstnic.deLa, intervalVarstnic.panaLa) : 0,
                categorie: 'VARSTNIC'
            },
            {
                numar : s ? numarRandom(0.7, intervalBatran.deLa, intervalBatran.panaLa) : 0,
                categorie: 'BATRAN'
            }
        ]

        let res = []
        console.log(" ")
        for(let obj of numarContagieriRandom){
            console.log(obj.numar, obj.categorie)
            
            // cream numarul de persoane pentru fiecare categorie
            let k = obj.numar
            while(k > 0){
                res.push(
                    new Person(
                        ziuaInfectarii,
                        intervalCategorie(obj.categorie)
                    )
                )
                
                k--
            }

        }


        return res
    }

    // Genereaza persoanele infectate in functie de categoria de varsta
    generarePersoaneInfectate = (ziuaInfectarii) =>{
        // console.log(this.categorieDeVarsta)
        // console.log(this.varsta)

        // In functie de categoria de varsta, se genereaza un nr diferit 
        // de persoane pentru fiecare categorie
        switch(this.categorieDeVarsta){
            case 'COPIL MIC':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 0), // copil mic
                    new Interval(0, 0), // prescolar
                    new Interval(0, 0), // scolar mic
                    new Interval(0, 1), // pubertatea
                    new Interval(0, 0), // adolescenta
                    new Interval(0, 2), // tanar
                    new Interval(0, 1), // adult
                    new Interval(0, 0), // matur
                    new Interval(0, 1), // presenescenta
                    new Interval(0, 0), // varstnic   
                    new Interval(0, 0), // batran
                )
            case 'PRESCOLAR':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 0), // copil mic
                    new Interval(0, 2), // prescolar
                    new Interval(0, 0), // scolar mic
                    new Interval(0, 1), // pubertatea
                    new Interval(0, 1), // adolescenta
                    new Interval(0, 1), // tanar
                    new Interval(0, 3), // adult
                    new Interval(0, 0), // matur
                    new Interval(0, 2), // presenescenta
                    new Interval(0, 0), // varstnic   
                    new Interval(0, 0), // batran                   
                )
            case 'SCOLAR MIC':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 0), // copil mic
                    new Interval(0, 2), // prescolar
                    new Interval(0, 1), // scolar mic
                    new Interval(0, 1), // pubertatea
                    new Interval(0, 2), // adolescenta
                    new Interval(0, 2), // tanar
                    new Interval(0, 2), // adult
                    new Interval(0, 3), // matur
                    new Interval(0, 3), // presenescenta
                    new Interval(0, 1), // varstnic   
                    new Interval(0, 0), // batran
                )
            case 'PUBERTATE':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 1), // copil mic
                    new Interval(0, 0), // prescolar
                    new Interval(0, 2), // scolar mic
                    new Interval(0, 2), // pubertatea
                    new Interval(0, 2), // adolescenta
                    new Interval(0, 2), // tanar
                    new Interval(0, 1), // adult
                    new Interval(0, 2), // matur
                    new Interval(0, 1), // presenescenta
                    new Interval(0, 1), // varstnic   
                    new Interval(0, 1), // batran
                )
            case 'ADOLESCENTA':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 0), // copil mic
                    new Interval(0, 0), // prescolar
                    new Interval(0, 2), // scolar mic
                    new Interval(0, 1), // pubertatea
                    new Interval(0, 4), // adolescenta
                    new Interval(0, 1), // tanar
                    new Interval(0, 1), // adult
                    new Interval(0, 2), // matur
                    new Interval(0, 1), // presenescenta
                    new Interval(0, 1), // varstnic   
                    new Interval(0, 1), // batran
                )
            case 'TANAR':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 1), // copil mic
                    new Interval(0, 1), // prescolar
                    new Interval(0, 1), // scolar mic
                    new Interval(0, 0), // pubertatea
                    new Interval(0, 2), // adolescenta
                    new Interval(0, 4), // tanar
                    new Interval(1, 8), // adult
                    new Interval(0, 5), // matur
                    new Interval(0, 1), // presenescenta
                    new Interval(0, 0), // varstnic   
                    new Interval(0, 0), // batran
                )
            case 'ADULT':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 1), // copil mic
                    new Interval(0, 5), // prescolar
                    new Interval(0, 0), // scolar mic
                    new Interval(0, 0), // pubertatea
                    new Interval(0, 0), // adolescenta
                    new Interval(1, 6), // tanar
                    new Interval(1, 7), // adult
                    new Interval(1, 5), // matur
                    new Interval(0, 2), // presenescenta
                    new Interval(0, 3), // varstnic   
                    new Interval(0, 1), // batran
                )
            case 'MATUR':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 1), // copil mic
                    new Interval(0, 2), // prescolar
                    new Interval(0, 3), // scolar mic
                    new Interval(0, 3), // pubertatea
                    new Interval(0, 3), // adolescenta
                    new Interval(0, 6), // tanar
                    new Interval(0, 12), // adult
                    new Interval(0, 7), // matur
                    new Interval(0, 10), // presenescenta
                    new Interval(0, 2), // varstnic   
                    new Interval(0, 1), // batran
                )
            case 'PRESENESCENTA':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 3), // copil mic
                    new Interval(0, 1), // prescolar
                    new Interval(0, 1), // scolar mic
                    new Interval(0, 2), // pubertatea
                    new Interval(0, 2), // adolescenta
                    new Interval(0, 3), // tanar
                    new Interval(0, 7), // adult
                    new Interval(0, 7), // matur
                    new Interval(0, 5), // presenescenta
                    new Interval(0, 5), // varstnic   
                    new Interval(0, 3), // batran
                )
            case 'VARSTNIC':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 0), // copil mic
                    new Interval(0, 2), // prescolar
                    new Interval(0, 0), // scolar mic
                    new Interval(0, 1), // pubertatea
                    new Interval(0, 2), // adolescenta
                    new Interval(0, 2), // tanar
                    new Interval(0, 4), // adult
                    new Interval(0, 4), // matur
                    new Interval(1, 5), // presenescenta
                    new Interval(0, 4), // varstnic   
                    new Interval(0, 4), // batran
                )
            case 'BATRAN':
                return this.generarePersoaneInterval(
                    ziuaInfectarii,
                    new Interval(0, 0), // copil mic
                    new Interval(0, 2), // prescolar
                    new Interval(0, 0), // scolar mic
                    new Interval(0, 1), // pubertatea
                    new Interval(0, 2), // adolescenta
                    new Interval(0, 2), // tanar
                    new Interval(0, 4), // adult
                    new Interval(0, 4), // matur
                    new Interval(1, 5), // presenescenta
                    new Interval(0, 4), // varstnic   
                    new Interval(0, 4), // batran
                )
        }

    }

 




}

const esteContagios = (val) => {
    return Math.random() < val
}


// Returneaza categoria de varsta in functie de varsta
const categorieDeVarsta = (varsta) => {
    
    // am incercat cu switch dar nu a mers functia in case
    if(varsta >= 0 && varsta < 3)
        return 'COPIL MIC'
    else if(intre(varsta, 3, 7))
        return 'PRESCOLAR'
    else if(intre(varsta, 7, 11))
        return 'SCOLAR MIC'
    else if(intre(varsta, 11, 15))
        return 'PUBERTATE'
    else if(intre(varsta, 15, 18))
        return 'ADOLESCENTA'
    else if(intre(varsta, 18, 25))
        return 'TANAR'
    else if(intre(varsta, 25, 35))
        return 'ADULT'
    else if(intre(varsta, 35, 50))
        return 'MATUR'
    else if(intre(varsta, 50, 64))
        return 'PRESENESCENTA'
    else if(intre(varsta, 64, 75))
        return 'VARSTNIC'
    else if(intre(varsta, 75, 85))
        return 'BATRAN'
    else if(varsta >= 85)
        return 'LONGEVIV'
    else
        return 'FARA CATEGORIE / POATE MORT'
}

const intervalCategorie = (categorieDeVarsta) => {
        
    switch(categorieDeVarsta){
        case 'COPIL MIC': 
            return new Interval(0, 3)
        case 'PRESCOLAR':
            return new Interval(3, 7)
        case 'SCOLAR MIC':
            return new Interval(7, 11)
        case 'PUBERTATE':
            return new Interval(11, 15)
        case 'ADOLESCENTA': 
            return new Interval(15, 18)
        case 'TANAR':
            return new Interval(18, 25)
        case 'ADULT':
            return new Interval(25, 35)
        case 'MATUR':
            return new Interval(35, 50)
        case 'PRESENESCENTA':
            return new Interval(50, 64)
        case 'VARSTNIC':
            return new Interval(64, 75)
        case 'BATRAN':
            return new Interval(75, 85)
        case 'LONGEVIV':
            return new Interval(85, 140)
        default:
            return 'FARA CATEGORIE / POATE MORT'
    }
}


// Genereaza varsta random
const generareVarsta = (deLa, panaLa) => {
    return numarRandom(1, deLa, panaLa)
}

// Genereaza sexul random
const generareSex = () => {
    return Math.random() < 0.5 ? 'M' : 'F'
}

// FUNCTII AUXILIARE

// Genereaza numar random intre [min, max)
const numarRandom = (sansa, min, max) => {
    // am pus sansa de 0.2 pentru ca intr-un sir [0, 0.01, ..., 0.99, 1]
    // sansa de a pica 0 este tare mica.
    // am vrut sa adaug [0, 0, 0, 0, 0, min,...,max] dar nu am reusit
    // asta pentru a obtine o medie in toate zilele unei luni
    // acum este sansa de 0.5 de a genera un numar
    return Math.random() < sansa ?  Math.floor(Math.random() * (max - min)) + min : 0
}

// functie ce stabileste daca val se afla in intervalul [a, b)
const intre = (val, a, b) => {
    return (val >= a && val < b)
}
