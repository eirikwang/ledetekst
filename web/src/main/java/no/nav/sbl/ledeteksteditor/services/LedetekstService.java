package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Applikasjon;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;

import java.io.File;
import java.util.List;

public interface LedetekstService {
    List<Ledetekst> hentAlleLedeteksterFor(Applikasjon applikasjon, File fileDir);

    List<File> hentAlleLedetekstFilerFor(Applikasjon applikasjon, File fileDir);

    List<Ledetekst> mapTilLedetekst(List<File> filer);

    Ledetekst hentLedeteksteFor(Applikasjon applikasjon, File fileDir, String ledetekstnokkel);

    Ledetekst oppdaterLedeteksteFor(Applikasjon applikasjon, File fileDir, Ledetekst ledetekst, Ident ident);
}
