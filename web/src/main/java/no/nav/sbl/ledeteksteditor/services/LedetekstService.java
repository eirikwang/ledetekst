package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;

import java.io.File;
import java.util.List;

public interface LedetekstService {
    List<Ledetekst> hentAlleLedeteksterFor(String stashurl, File fileDir);

    List<File> hentAlleLedetekstFilerFor(String stashurl, File fileDir);

    List<Ledetekst> mapTilLedetekst(List<File> filer);

    Ledetekst hentLedeteksteFor(String stashurl, File fileDir, String ledetekstnokkel);
}
