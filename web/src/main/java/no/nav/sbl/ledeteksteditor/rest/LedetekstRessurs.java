package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class LedetekstRessurs {
    private LedetekstService ledetekstService = new LedetekstService();

    public List<Ledetekst> hentAlleTeksterFor(String stashurl, File fileDir) throws GitAPIException, IOException {
        List<File> filer = ledetekstService.hentAlleLedeteksterFor(stashurl, fileDir);
        return ledetekstService.mapTilLedetekst(filer);
    }
}
