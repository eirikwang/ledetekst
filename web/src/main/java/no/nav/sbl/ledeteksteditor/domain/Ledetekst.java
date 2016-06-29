package no.nav.sbl.ledeteksteditor.domain;
import java.util.HashMap;
import java.util.Map;

public class Ledetekst {

    public String nokkel;
    public Map<String, String> spraak;
    public String kommentar;

    public Ledetekst() {
    }

    public Ledetekst(String nokkel, Map<String, String> spraak) {
        this.nokkel = nokkel;
        this.spraak = spraak;
    }

    public Map<String, Object> tilMap() {
        HashMap<String, Object> tekstMap = new HashMap<>();
        tekstMap.put("nokkel", nokkel);
        tekstMap.put("spraak", spraak);
        return tekstMap;
    }

    @Override
    public String toString() {
        return "Ledetekst{" +
                "nokkel='" + nokkel + '\'' +
                ", spraak=" + spraak +
                '}';
    }
}
