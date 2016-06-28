package no.nav.sbl.ledeteksteditor.domain;

import java.util.HashMap;

public class Payload {
    public Ident ident;
    public Object data;

    public Ident getIdent() {
        return ident;
    }

    @Override
    public String toString() {
        return "Payload{" +
                "ident=" + ident +
                ", data=" + data +
                '}';
    }

    public Object getData() {
        return data;
    }
}
