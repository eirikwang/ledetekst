package no.nav.sbl.ledeteksteditor.domain;

import java.util.Map;

public class Ledetekst extends Commitable{

    public String nokkel;
    public Map<String, String> spraak;

    public Ledetekst() {
    }

    public Ledetekst(String nokkel, Map<String, String> spraak) {
        this.nokkel = nokkel;
        this.spraak = spraak;
    }

    @Override
    public String toString() {
        return "Ledetekst{" +
                "nokkel='" + nokkel + '\'' +
                ", spraak=" + spraak +
                '}';
    }
}
