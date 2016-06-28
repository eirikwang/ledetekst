package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;

import java.io.File;
import java.util.List;

public interface LedetekstService {
    List<Ledetekst> hentAlleTeksterFor(String stashurl, File fileDir);

    List<File> hentAlleLedeteksterFor(String stashurl, File fileDir);

    List<Ledetekst> mapTilLedetekst(List<File> filer);
}
