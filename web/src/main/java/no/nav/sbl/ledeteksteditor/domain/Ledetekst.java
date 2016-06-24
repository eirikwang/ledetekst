package no.nav.sbl.ledeteksteditor.domain;
import java.util.Map;

public class Ledetekst {

    private String navn;
    private Map<String, String> innhold;


    public Ledetekst(String navn, Map<String, String> innhold) {
        this.navn = navn;
        this.innhold = innhold;
    }

    public String hentNavn() {
        return navn;
    }

    public Map<String, String> hentInnhold(){
        return innhold;
    }
}
