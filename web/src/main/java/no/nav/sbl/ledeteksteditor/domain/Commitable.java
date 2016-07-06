package no.nav.sbl.ledeteksteditor.domain;

import java.util.Optional;

public class Commitable<T> {
    public Optional<String> kommentar = Optional.empty();
    public T payload;

    public Commitable() {
    }

    public Commitable(Optional<String> kommentar, T payload) {
        this.kommentar = kommentar;
        this.payload = payload;
    }
}
