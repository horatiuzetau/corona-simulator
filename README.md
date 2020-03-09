# Explicatie

Clasa Person are:
* ziua infectarii
* varsta (generata random intr-un interval)
* sex (Generat random intr-un interval)
* categoria de varsta, coresponednta cu varsta
* contagios - sansa de 50% de a fi sau nu contagios

Persoana poate genera la randul ei prin funtia generarePersoaneInfectate o lista de persoane avan diferite categorii de varsta ce au intrat in contact cu acea persoana. 

Lista de contagiati din urmatoarea zi va fi list de contagiosi din ziua curenta. Fiecare contagiat va genera la randul lui un numar random de persoane pentru fiecare categorie.

Sambata si duminica, sansa scade la 0.6 din sansa actuala, deoarece activitatea este mai redusa. La 14 zile, activitatea este oarecum "resetata". Fac asta pentru ca nu am putut sa simulez persoanele care se cunosc intre ele si deja s-au vazut.

Programul se deschide cu npm install si apoi npm start, avand tot setupul pentru React instalat. 
Se poate folosi si fara, dar daca ar fi implementat intr-un html. SecondPlan ete centrul de comanda. 
ex: 
* let sp = new SecondPlan()
* sp.ruleaza(maxZile) // ruleaza simulatorul pe un numar de zile ! RECOMAND 4-5 zile pentru ca se msica greu cand prinde multe instante
* sp.arataZile() //raport pe zile

Programul se misca putin cam incet. Nu stiu de ce; se creaza multe instante de persoana. Prima data am incercat in React dar se misca mult prea greu, asa ca am facut pur JavaScript. Simulator este componenta initiala.