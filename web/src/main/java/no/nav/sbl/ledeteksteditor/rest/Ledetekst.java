package no.nav.sbl.ledeteksteditor.rest;


import java.util.HashMap;

public class Ledetekst {

    private String navn;
    private HashMap<String, String> innhold;


    public Ledetekst( String navn, HashMap<String, String> innhold) {
        this.navn = navn;
        this.innhold = innhold;
    }

    public String hentNavn() {
        return navn;
    }

    public HashMap<String, String> hentInnhold(){
        return innhold;
    }
}
