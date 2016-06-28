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

    @Override
    public String toString() {
        return "Ledetekst{" +
                "navn='" + navn + '\'' +
                ", innhold=" + innhold +
                '}';
    }

    public Map<String, String> hentInnhold(){
        return innhold;
    }
}
