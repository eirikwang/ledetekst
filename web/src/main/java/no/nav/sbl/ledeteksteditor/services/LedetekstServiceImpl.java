package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class LedetekstServiceImpl implements LedetekstService {

    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>() {{
        put("sbl-veiledningarbeidssoker", "http://stash.devillo.no/scm/sbl/veiledningarbeidssoker.git");
    }};
    private static final String FILE_PATH = "tekster" + File.separator + "src" + File.separator + "main" + File.separator + "tekster";
    private final static Predicate<File> erLedetekstFil = (File p) -> p.getPath().contains(FILE_PATH);
    private static final Pattern FILE_PATTERN = Pattern.compile("(.*?)(_([a-zA-Z]{2}_?[a-zA-Z]{0,2}))?\\.([a-z]*)$");

    @Override
    public List<Ledetekst> hentAlleLedeteksterFor(String stashurl, File fileDir) {
        List<File> filer = hentAlleLedetekstFilerFor(stashurl, fileDir);
        return mapTilLedetekst(filer);
    }

    @Override
    public List<File> hentAlleLedetekstFilerFor(String stashurl, File fileDir) {
        Repository repo = GitWrapper.getRepo(stashurl, fileDir);
        List<File> filer = GitWrapper.listFiles(repo);
        return filer.stream().filter(erLedetekstFil).collect(Collectors.toList());
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {
            String filsti = file.getPath();
            Matcher matcher = FILE_PATTERN.matcher(file.getPath());

            if (matcher.find()) {
                String nokkel = matcher.group(1).substring(matcher.group(1).lastIndexOf("\\") + 1);
                String locale = matcher.group(3);
                String innholdFil = GitWrapper.getContentFromFile(file);
                innhold.computeIfAbsent(nokkel, (ignore) -> new HashMap<>()).put(locale, innholdFil);
            }
        }
        return innhold.entrySet().stream().map(entry -> new Ledetekst(entry.getKey(), entry.getValue())).collect(Collectors.toList());
    }

    @Override
    public Ledetekst hentLedeteksteFor(String stashurl, File fileDir, String ledetekstnokkel) {
        List<Ledetekst> ledetekster = hentAlleLedeteksterFor(stashurl, fileDir);
        Ledetekst ledetekst = null;
        for (Ledetekst l : ledetekster) {
            if(l.hentNokkel().equals(ledetekstnokkel)){
                ledetekst = l;
                break;
            }
        }
        if(ledetekst == null){
            throw new IkkeFunnetException("Fant ikke ledetekst");
        }
        return ledetekst;
    }
}
