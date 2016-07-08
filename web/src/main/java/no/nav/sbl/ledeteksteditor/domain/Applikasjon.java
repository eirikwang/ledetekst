package no.nav.sbl.ledeteksteditor.domain;

public class Applikasjon {
    public String id;
    public String navn;
    public String url;
    public String defaultBranch;

    public Applikasjon(String id, String navn, String url) {
        this(id, navn, url, "master");
    }

    public Applikasjon(String id, String navn, String url, String defaultBranch) {
        this.id = id;
        this.navn = navn;
        this.url = url;
        this.defaultBranch = defaultBranch;
    }

    public String getId() {
        return id;
    }
}
