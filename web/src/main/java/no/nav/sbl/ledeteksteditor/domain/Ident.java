package no.nav.sbl.ledeteksteditor.domain;

public class Ident {
    public String navn;
    public String epost;

    @Override
    public String toString() {
        return "Ident{" +
                "navn='" + navn + '\'' +
                ", epost='" + epost + '\'' +
                '}';
    }
}
