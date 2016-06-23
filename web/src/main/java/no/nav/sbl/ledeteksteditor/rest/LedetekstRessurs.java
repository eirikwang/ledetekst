package no.nav.sbl.ledeteksteditor.rest;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.services.LedetekstService;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class LedetekstRessurs {
    private LedetekstService ledetekstService = new LedetekstService();

    private List<Ledetekst> hentAlleTeksterFor(String stashurl, File fileDir) throws GitAPIException, IOException {
        List<File> filer = ledetekstService.hentAlleLedeteksterFor(stashurl, fileDir);
        return ledetekstService.mapTilLedetekst(filer);
    }

    public static void main(String[] args) throws GitAPIException, IOException {
        String stashurl = "ssh://git@stash.devillo.no:7999/sbl/veiledningarbeidssoker.git";
        File fileDir = new File("../repo/veiledningarbeidssoker/");

        LedetekstRessurs ledetekstRessurs = new LedetekstRessurs();

        List<Ledetekst> ledetekster = ledetekstRessurs.hentAlleTeksterFor(stashurl, fileDir);

        for (Ledetekst ledetekst : ledetekster) {
            System.out.print(ledetekst.hentNavn() + " ");
            System.out.println(ledetekst.hentInnhold());
        }
    }
}
