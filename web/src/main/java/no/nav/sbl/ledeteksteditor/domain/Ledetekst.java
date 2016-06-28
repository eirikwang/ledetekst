package no.nav.sbl.ledeteksteditor.domain;
import java.util.HashMap;
import java.util.Map;

public class Ledetekst {

    private String nokkel;
    private Map<String, String> innhold;


    public Ledetekst(String nokkel, Map<String, String> innhold) {
        this.nokkel = nokkel;
        this.innhold = innhold;
    }

    public String hentNokkel() {
        return nokkel;
    }

    public Map<String, String> hentInnhold(){
        return innhold;
    }

    public Map<String, Object> toMap() {
        HashMap<String, Object> tekstMap = new HashMap<>();
        tekstMap.put("nokkel", nokkel);
        tekstMap.put("spraak", innhold);
        return tekstMap;
    }

    @Override
    public String toString() {
        return "Ledetekst{" +
                "nokkel='" + nokkel + '\'' +
                ", innhold=" + innhold +
                '}';
    }
}
