package no.nav.sbl.ledeteksteditor.domain;

public class Ident {
    public String navn;
    public String epost;

    public Ident(String navn, String epost) {
        this.navn = navn;
        this.epost = epost;
    }

    @Override
    public String toString() {
        return "Ident{" +
                "navn='" + navn + '\'' +
                ", epost='" + epost + '\'' +
                '}';
    }
}
