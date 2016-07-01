package no.nav.sbl.ledeteksteditor.domain;

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

    public Ledetekst(String nokkel, Map<String, String> spraak, String kommentar) {
        this.nokkel = nokkel;
        this.spraak = spraak;
        this.kommentar = kommentar;
    }

    @Override
    public String toString() {
        return "Ledetekst{" +
                "nokkel='" + nokkel + '\'' +
                ", spraak=" + spraak +
                '}';
    }
}
