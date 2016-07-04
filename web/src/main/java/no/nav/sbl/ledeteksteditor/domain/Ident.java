package no.nav.sbl.ledeteksteditor.domain;

import no.nav.sbl.ledeteksteditor.utils.exception.UautentisertException;

public class Ident {
    public String navn;
    public String epost;

    public Ident(String navn, String epost) {
        if( navn == null || epost == null){
            throw new UautentisertException("Navn eller epost mangler fra request header");
        }
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
