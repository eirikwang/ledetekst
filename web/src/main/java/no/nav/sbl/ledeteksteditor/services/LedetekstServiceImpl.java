package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.FileUtils;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LedetekstServiceImpl implements LedetekstService {

    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>() {{
        put("sbl-veiledningarbeidssoker", "http://stash.devillo.no/scm/sbl/veiledningarbeidssoker.git");
    }};

    @Override
    public List<Ledetekst> hentAlleTeksterFor(String stashurl, File fileDir) {
        List<File> filer = hentAlleLedeteksterFor(stashurl, fileDir);
        return mapTilLedetekst(filer);
    }

    @Override
    public List<File> hentAlleLedeteksterFor(String stashurl, File fileDir) {
        Repository repo = GitWrapper.getRepo(stashurl, fileDir);
        List<File> filer = GitWrapper.listFiles(repo);
        return filer.stream().filter(FileUtils.erLedetekstFil()).collect(Collectors.toList());
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {
            if(!FileUtils.matcherFilMonster(file)) continue;
            String nokkel = FileUtils.hentNokkel(file);
            String locale = FileUtils.hentLocale(file);
            String innholdFil = GitWrapper.getContentFromFile(file);
            innhold.computeIfAbsent(nokkel, (ignore) -> new HashMap<>()).put(locale, innholdFil);
        }
        return innhold.entrySet().stream().map(entry -> new Ledetekst(entry.getKey(), entry.getValue())).collect(Collectors.toList());
    }
}
