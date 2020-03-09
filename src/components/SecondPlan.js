import Interval from "./auxiliar/Interval"
import Person from "./persoane/Person"
import Day from "./Day"


export default class Simulator {

    constructor(){
        this.ziua = 0
        this.zile = []
        this.persoaneContagioase = [new Person(
            0, // ziua infectarii
            new Interval(50, 60) // interval varsta
        )]
        this.persoaneMolipsite = []
        this.maximZile = 30
        this.viteza = 2000
    }

    treceZiua = () => {

        let list = []
        console.log("Ziua " + this.ziua)
        console.log("Pers contagioase", this.persoaneContagioase.length)
        // Parcurgem persoanele contagioase sigeneram persoanele molipsite de acestea
        for(let pc of this.persoaneContagioase){
            // lista cu persoane infectate
            // let aux = pc.generarePersoaneInfectate(this.ziua)
            // console.log(aux)
            list = [...list, ...pc.generarePersoaneInfectate(this.ziua)]
        }
        console.log("Pers infectate", list.length)

        // actualizam persoanele molipsite
        // this.persoaneMolipsite = [...this.persoaneMolipsite, ...list]
        this.persoaneContagioase = list.filter(o => o.contagios === true)
        this.zile = [...this.zile, new Day(
            this.persoaneContagioase,
            this.ziua,
            list    
        )]

        this.ziua++
    }

    // trece prin zile pana la maximul posibil
    ruleaza = ziuaMaxima => {
        while(this.ziua < ziuaMaxima){
            // setTimeout(() => this.treceZiua(), this.ziua * 1000);
            this.treceZiua()
        }
    }

    // Arata raportul
    arataZile = () => {
        console.log("RAPORT")
        for(let z of this.zile){
            console.log("Ziua " + z.ziua)
            console.log("Femei molipsite: " + z.numarMolipsitiDupaSex('F'))
            console.log("Barbati molipsiti: " + z.numarMolipsitiDupaSex('M'))
            console.log("Adolescenti molipsiti: " + z.categoriiDeVarstaMolipsiti('ADOLESCENTA'))
            console.log("Adolescnti contagiosi molipsiti: " + z.categoriiDeVarstaContagiosi('ADOLESCENTA'))
            
        }
    }   



}