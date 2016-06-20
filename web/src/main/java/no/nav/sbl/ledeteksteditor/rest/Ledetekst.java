package no.nav.sbl.ledeteksteditor.rest;


import java.util.Map;

class Ledetekst {

    private String navn;
    private Map<String, String> innhold;


    Ledetekst( String navn, Map<String, String> innhold) {
        this.navn = navn;
        this.innhold = innhold;
    }

    public String hentNavn() {
        return navn;
    }

    Map<String, String> hentInnhold(){
        return innhold;
    }
}
