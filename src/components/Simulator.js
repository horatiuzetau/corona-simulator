import React, { Component } from 'react'
import Person from './persoane/Person';
import Interval from './auxiliar/Interval'
import Day from './Day';

const initState = {
    // Ziua curenta
    ziua: 0,
    // Actiune de schimbare a zilei
    interval: null, 
    zile: [],
    persoaneContagioase: [],
    persoaneMolipsite: [],
    maximZile: 30,
}

class Simulator extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
        // Viteza cu care trec zilele
        this.viteza = 2000; //ms
    }

    componentDidMount() {
        let person = new Person(
            0, // ziua infectarii
            new Interval(50, 60) // interval varsta
        )
        // prima persoane
        this.setState({ persoaneContagioase: [person]  });
        // this.toggle();
    }


    // Functie ce opreste timpul in loc, sau il porneste din nou
    toggle = () => {
        if(this.state.interval){ // Daca deja merge timpul
            // Il oprim
            clearInterval(this.state.interval)
            // Actualizam state
            this.setState({ interval: null});
        }else{ // Daca timpul sta pe loc
            // Cream o actiune ce se va repeta la viteza din clasa
            this.setState({ 
                interval: setInterval(this.treceZiua, this.viteza)
            });
        }
    }

    treceZiua = () => {

        const {maximZile, persoaneContagioase, ziua, zile, persoaneMolipsite} = this.state

        let list = []
        console.log("Pers contagioase", persoaneContagioase.length)
        for(let pc of persoaneContagioase){
            // lista cu persoane infectate
            list = [...list, ...(pc.generarePersoaneInfectate(ziua))]
        }
        console.log("Pers infectate", list.length)

        // Actualizam ziua; trecem la ziua urmatoare
        this.setState({
            persoaneMolipsite: [...persoaneMolipsite, ...persoaneContagioase], 
            persoaneContagioase: list, 
            zile: [...zile, new Day(
                persoaneContagioase,
                ziua,
                list    
            )],
            ziua: this.state.ziua + 1
        })
    }

    numarContagiatiDupaSex = (sex = 'M') => {
        return this.state.persoaneMolipsite.filter(o => o.sex === sex).length
    }

    numarContagiati = () => {
        return this.state.persoaneMolipsite.length
    }



    render() { 

        const {ziua, zile, persoaneMolipsite} = this.state
        let output = zile.map((o, i) => 
        <div key={i}>
            <h1>Ziua: {o.ziua}</h1>
            Pers contagioase: {o.persoaneContagioase.length}
            <br/>
            {o.categoriiDeVarstaContagiosi().map((o, i) => <span key={i} style={{margin: "0 5px"}}>{o}</span>)}
            <hr/>
            Pers molipsite: {o.persoaneMolipsite.length}
            <br/>
            {o.categoriiDeVarstaMolipsiti().map((o, i) => <span key={i} style={{margin: "0 5px"}}>{o}</span>)}
            <br/><br/>
        </div>)
        return (  
            <>
                {/* {ziua}
                <hr/>
                {this.numarContagiati()}
                <hr/> */}
                

                <button onClick={this.toggle}>Pauza</button>
                {output}
            </>
        );
    }
}
 
export default Simulator;