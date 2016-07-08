package no.nav.sbl.ledeteksteditor.domain;

public class Applikasjon {
    public String id;
    public String navn;
    public String url;

    public Applikasjon(String id, String navn, String url) {
        this.id = id;
        this.navn = navn;
        this.url = url;
    }

    public String getId() {
        return id;
    }
}
