package no.nav.sbl.ledeteksteditor.services;

import no.nav.sbl.ledeteksteditor.domain.Ident;
import no.nav.sbl.ledeteksteditor.domain.Ledetekst;
import no.nav.sbl.ledeteksteditor.utils.GitWrapper;
import no.nav.sbl.ledeteksteditor.utils.exception.IkkeFunnetException;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class LedetekstServiceImpl implements LedetekstService {

    public static final Map<String, String> REPOSITORIES = new HashMap<String, String>() {{
        put("sbl-veiledningarbeidssoker", "");//"http://stash.devillo.no/scm/sbl/veiledningarbeidssoker.git");
        put("test-repo-clone", "../test-repo");
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
    public List<File> hentAlleLedetekstFilerFor(String stashurl, File fileDir, String ledetekstnokkel) {
        List<File> filer = hentAlleLedetekstFilerFor(stashurl, fileDir);
        List<File> ledetekstFiler = new ArrayList<File>();
        Pattern ledtekstPattern = Pattern.compile(ledetekstnokkel);
        for( File ledetekstFil : ledetekstFiler){
            Matcher matcher = ledtekstPattern.matcher(ledetekstFil.getName());
            if(matcher.find()){
                filer.add(ledetekstFil);
            }
        }
        return ledetekstFiler;
    }

    @Override
    public List<Ledetekst> mapTilLedetekst(List<File> filer) {
        Map<String, Map<String, String>> innhold = new HashMap<>();

        for (File file : filer) {
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
            if(l.nokkel.equals(ledetekstnokkel)){
                ledetekst = l;
                break;
            }
        }
        if(ledetekst == null){
            throw new IkkeFunnetException("Fant ikke ledetekst");
        }
        return ledetekst;
    }

    @Override
    public Ledetekst oppdaterLedeteksteFor(String stashurl, File fileDir, Ledetekst ledetekst, Ident ident) {
        List<File> filer = hentAlleLedetekstFilerFor(stashurl, fileDir);
        for( Map.Entry<String, String> spraak : ledetekst.spraak.entrySet()){
            oppdaterLedetekstFor(filer, ledetekst.nokkel, spraak);
        }
        Repository repo = GitWrapper.getRepo(stashurl, fileDir);
        GitWrapper.commitChanges(repo, ident, ledetekst.kommentar);
        return hentLedeteksteFor(stashurl, fileDir, ledetekst.nokkel);
    }

    private void oppdaterLedetekstFor(List<File> filer, String ledetekstnokkel, Map.Entry<String, String> spraak){
        File ledetekstfil = null;
        for(File fil : filer){
            if(fil.getName().contains(ledetekstnokkel + "_" + spraak.getKey())){
                ledetekstfil = fil;
                break;
            }
        }
        if(ledetekstfil == null){
            throw new IkkeFunnetException("Fant ikke fil: " + ledetekstnokkel + "_" + spraak.getKey());
        }
        GitWrapper.writeContentToFile(ledetekstfil, spraak.getValue());
    }
}
