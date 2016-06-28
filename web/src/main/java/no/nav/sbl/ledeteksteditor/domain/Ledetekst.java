package no.nav.sbl.ledeteksteditor.domain;
import java.util.HashMap;
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

    public Map<String, Object> toMap() {
        HashMap<String, Object> tekstMap = new HashMap<>();
        tekstMap.put("nokkel", this.hentNavn());
        tekstMap.put("spraak", this.hentInnhold());
        return tekstMap;
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
