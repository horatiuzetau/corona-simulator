


export default class Day {
    
    
    constructor(persoaneContagioase, ziua, persoaneMolipsite){
        this.persoaneContagioase = persoaneContagioase
        this.persoaneMolipsite = persoaneMolipsite
        this.ziua = ziua
    }


    categoriiDeVarstaContagiosi = (categorie) => {
        return this.persoaneContagioase.filter(o => o.categorieDeVarsta === categorie).length
    }

    categoriiDeVarstaMolipsiti = (categorie) => {
        return this.persoaneMolipsite.filter(o => o.categorieDeVarsta === categorie).length
    }

    numarMolipsitiDupaSex = sex => {
        return this.persoaneMolipsite.filter(o => o.sex === sex).length
    }


}