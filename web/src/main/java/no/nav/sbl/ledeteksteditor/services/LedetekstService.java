package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.GitWrapperException;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface LedetekstService {
    List<Ledetekst> hentAlleTeksterFor(String stashurl, File fileDir) throws GitAPIException, IOException, GitWrapperException;

    List<File> hentAlleLedeteksterFor(String stashurl, File fileDir) throws GitAPIException, IOException, GitWrapperException;

    List<Ledetekst> mapTilLedetekst(List<File> filer) throws IOException;
}
