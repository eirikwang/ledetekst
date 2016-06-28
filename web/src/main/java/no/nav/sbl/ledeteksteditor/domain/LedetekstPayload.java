package no.nav.sbl.ledeteksteditor.domain;

public class LedetekstPayload extends Payload {
    public Ledetekst data;

    @Override
    public Ledetekst getData() {
        return data;
    }

    @Override
    public String toString() {
        return "LedetekstPayload{" +
                "data=" + data +
                '}';
    }
}
