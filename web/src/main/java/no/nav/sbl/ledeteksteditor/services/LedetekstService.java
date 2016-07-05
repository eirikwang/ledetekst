package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Commitable;
import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;

import java.io.File;
import java.util.List;

public interface LedetekstService {
    List<Ledetekst> hentAlleLedeteksterFor(String remoteUrl, File fileDir);

    List<File> hentAlleLedetekstFilerFor(String remoteUrl, File fileDir);

    List<Ledetekst> mapTilLedetekst(List<File> filer);

    Ledetekst hentLedeteksteFor(String remoteUrl, File fileDir, String ledetekstnokkel);

    Ledetekst oppdaterLedeteksteFor(String remoteUrl, File fileDir, Commitable<Ledetekst> ledetekst, Ident ident);
}
